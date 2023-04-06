import _ from "lodash";
import partition from "@bimo/core-utils-partition";
import asyncForEach from "@bimo/core-utils-async-for-each";
import { Entity, EntityProps } from "@bimo/core-utils-entity";
import { Item, ExtendedItem } from "./Item";
import { Policy } from "./Policy";
import { emptyPolicyFactory } from "./emptyPolicyFactory";
import { uniqueIdPolicyFactory } from "./uniqueIdPolicyFactory";
import { PolicyRuleEvent } from "./PolicyRule";

export type CollectionAssociationType = "composition" | "aggregation";

export interface CollectionProps<ItemType extends ExtendedItem<ItemType>>
  extends EntityProps {
  itemName: string;
  ItemConstructor: any;
  items?: (Item<ItemType> | EntityProps)[];
  idPropName?: string;
  businessIdPropName?: string;
  labelPropName?: string;
  associationType?: CollectionAssociationType;
  policy?: Policy<ItemType>;
}

interface ReduceCb<ItemType extends ExtendedItem<ItemType>> {
  (
    previousValue: any,
    currentValue: ItemType,
    currentIndex: number,
    array: ItemType[]
  ): any;
}

interface ArrayMethodsCallback<ItemType extends ExtendedItem<ItemType>> {
  (value: ItemType, index: number, array: ItemType[]): any;
}

interface AsyncArrayMethodsCallback<ItemType extends ExtendedItem<ItemType>> {
  (value: ItemType, index: number, array: ItemType[]): Promise<any>;
}

interface AddItemOptions {
  atIndex?: number; //- index at which to add the item
  ensureId?: boolean; //- add id to the item before adding it if missing.
}

export class Collection<ItemType extends ExtendedItem<ItemType>> extends Entity {
  itemName: string;
  ItemConstructor: typeof Item;
  items: ItemType[];
  idPropName?: string;
  businessIdPropName?: string;
  labelPropName?: string;
  associationType: CollectionAssociationType;
  policy: Policy<ItemType>;
  updateNextIdFunction: (knownId?: string) => void;
  incrementIdFunction: () => void;

  constructor(props: CollectionProps<ItemType>) {
    super(props);
    const {
      itemName,
      ItemConstructor,
      items = [],
      idPropName,
      businessIdPropName,
      labelPropName,
      associationType = "composition",
      policy = null,
    } = props;

    this.policy =
      policy ||
      (associationType === "composition"
        ? uniqueIdPolicyFactory<ItemType>()
        : emptyPolicyFactory<ItemType>());

    this.itemName = itemName;
    this.idPropName = idPropName;
    this.businessIdPropName = businessIdPropName;
    this.labelPropName = labelPropName;
    this.ItemConstructor = ItemConstructor;
    this.associationType = associationType;

    this.updateNextIdFunction =
      this.ItemConstructor.updateNextIdFunction ??
      ((knownId) => {
        const knownIdAsInt = knownId ? parseInt(knownId, 10) : 0;
        const nextIdAsInt = parseInt(this.ItemConstructor.nextIdValue, 10);
        this.ItemConstructor.nextIdValue = Math.max(
          knownIdAsInt + 1,
          nextIdAsInt
        ).toString();
      });

    this.incrementIdFunction =
      this.ItemConstructor.incrementIdFunction ??
      (() => {
        const nextIdAsInt = parseInt(this.ItemConstructor.nextIdValue, 10);
        this.ItemConstructor.nextIdValue = (nextIdAsInt + 1).toString();
      });

    // See https://github.com/gaelhameon/ookpik-private/issues/29 for some gotchas about the lines below.
    this.items = [];
    this._setCachedValue("itemById", null);
    this._setCachedValue("itemByBusinessId", null);

    items.forEach((rawItem) => {
      const newItem =
        rawItem instanceof this.ItemConstructor<ItemType>
          ? rawItem
          : new this.ItemConstructor<ItemType>(rawItem);
      this.ensureId(newItem);
      this.add(newItem as ItemType);
    });
  }

  validate(eventKey: PolicyRuleEvent = "default", item?: ItemType) {
    return this.policy.evaluate(eventKey, { collection: this, item });
  }

  get longLoggingOutput() {
    return this.items.map((item) => item.mediumLoggingOutput).join("\n");
  }

  get businessLoggingOutput() {
    return this.items.map((item) => item.businessLoggingOutput).join("\n");
  }

  get nextIdValue() {
    if (!this.ItemConstructor.nextIdValue) {
      this.ItemConstructor.nextIdValue = "1";
    }
    return this.ItemConstructor.nextIdValue;
  }

  get _itemById() {
    if (!this.idPropName) return null;
    return this._getAndSetCachedValue("itemById", () => {
      const itemById: { [id: string]: ItemType } = {};
      this.items.forEach((item) => {
        itemById[item[this.idPropName as string]] = item;
      });
      return itemById;
    });
  }

  get _itemByBusinessId() {
    if (!this.businessIdPropName) return null;
    return this._getAndSetCachedValue("itemByBusinessId", () => {
      const itemByBusinessId: { [id: string]: ItemType } = {};
      this.items.forEach((item) => {
        itemByBusinessId[item[this.businessIdPropName as string]] = item;
      });
      return itemByBusinessId;
    });
  }

  get length() {
    return this.items.length;
  }

  get shortLoggingOutput() {
    return `${this.length} ${this.itemName}(s)`;
  }

  reduce(callback: ReduceCb<ItemType>, initialValue: any) {
    return this.items.reduce(callback, initialValue);
  }

  forEach(callback: ArrayMethodsCallback<ItemType>) {
    this.items.forEach(callback);
  }

  async asyncForEach(callback: AsyncArrayMethodsCallback<ItemType>) {
    return asyncForEach(this.items, callback);
  }

  map(callback: ArrayMethodsCallback<ItemType>) {
    return this.items.map(callback);
  }

  flatMap(callback: ArrayMethodsCallback<ItemType>) {
    return this.items.flatMap(callback);
  }

  find(callback: ArrayMethodsCallback<ItemType>) {
    return this.items.find(callback);
  }

  findIndex(callback: ArrayMethodsCallback<ItemType>) {
    return this.items.findIndex(callback);
  }

  some(callback: ArrayMethodsCallback<ItemType>) {
    return this.items.some(callback);
  }

  indexOf(item: ItemType, fromIndex: number = 0) {
    return this.items.indexOf(item, fromIndex);
  }

  /**
   * Filters the collection to keep only items for which the callback returns true
   * MUTATES the collection
   * @param {ArrayMethodsCallback} callback Callback function to apply to each item - returns true if item should be kept
   * @returns {ItemType[]} Array of items that were REMOVED
   */
  filter(callback: ArrayMethodsCallback<ItemType>): ItemType[] {
    this.invalidateItemById();
    this.invalidateItemByBusinessId();
    this._nullifyCachedValue("groupedItemsByPropByPropPath");

    const [keptItems, removedItems] = partition(this.items, callback);
    if (this.associationType === "composition") {
      removedItems.forEach((removedItem: ItemType) => {
        // eslint-disable-next-line no-param-reassign
        removedItem.parent = undefined;
      });
    }
    this.validate();
    this.items = keptItems;
    return removedItems;
  }

  /**
   * Picks items from the collection if the callback returns true when applied to them. Same as filter but does't
   * mutate the collection
   * @param {ArrayMethodsCallback} callback Callback function to apply to each item - returns true if item should be picked
   * @returns {ItemType[]} Array of items that were picked from the collection
   */
  pick(callback: ArrayMethodsCallback<ItemType>): ItemType[] {
    const pickedItems = _.filter(this.items, callback);
    return pickedItems as ItemType[];
  }

  every(callback: ArrayMethodsCallback<ItemType>) {
    return this.items.every(callback);
  }

  sort(compareFn: (a: ItemType, b: ItemType) => number) {
    return this.items.sort(compareFn);
  }

  getByPropName(propName: string, value: any): ItemType | undefined {
    if (propName === this.idPropName) {
      return this.getById(value);
    }
    if (propName === this.businessIdPropName) {
      return this.getByBusinessId(value);
    }
    return this.items.find((item) => item[propName] === value);
  }

  /**
   * If idOrItem is a string, returns the first item in collection that has a value of id in the "idPropName" field.
   * If idOrItem is an object, returns the first item in collection that has the same value as the item in the "idPropName" field
   * @param {string|Object} idOrItem - id to look for, or an object that has a key "idPropName"
   * @returns {ItemType} item from the collection that matches the id
   */
  getById(idOrItem: string | { [key: string]: any }): ItemType | undefined {
    if (!this.idPropName || !this._itemById)
      throw new Error(
        `Trying to get by id on a collection of ${this.itemName}, which doesn't have an idPropName`
      );
    const id = typeof idOrItem === "object" ? idOrItem[this.idPropName] : idOrItem;
    return id && this._itemById[id];
  }

  /**
   * If idOrItem is a string, returns the first item in collection that has a value of id in the "businessIdPropName" field.
   * If idOrItem is an object, returns the first item in collection that has the same value as the item in the "hatusIdPropName" field
   * @param {string|Object} idOrItem - id to look for, or an object that has a key "hatusIdPropName"
   * @returns {ItemType} item from the collection that matches the id
   */
  getByBusinessId(idOrItem: string | { [key: string]: any }): ItemType | undefined {
    if (!this.businessIdPropName || !this._itemByBusinessId) {
      throw new Error(
        `Trying to get by businessId on a collection of ${this.itemName}, which doesn't have an businessIdPropName`
      );
    }
    const businessId =
      typeof idOrItem === "object" ? idOrItem[this.businessIdPropName] : idOrItem;
    return businessId && this._itemByBusinessId[businessId];
  }

  invalidateItemByBusinessId() {
    this._nullifyCachedValue("itemByBusinessId");
  }

  invalidateItemById() {
    this._nullifyCachedValue("itemById");
  }

  get first() {
    return this.items[0];
  }

  get last() {
    return this.items[this.items.length - 1];
  }

  add(itemOrItems: ItemType | ItemType[], options: AddItemOptions = {}) {
    if (Array.isArray(itemOrItems)) {
      this._addMultipleItems(itemOrItems, options);
    } else {
      this._addSingleItem(itemOrItems, options);
    }
  }

  _addSingleItem(item: ItemType, options: AddItemOptions = {}) {
    const { atIndex, ensureId } = options;
    if (ensureId) this.ensureId(item);
    this.validate("add", item);
    if (this.associationType === `composition`) {
      // eslint-disable-next-line no-param-reassign
      item.parent = this;
    }
    if (this.idPropName && this._itemById) {
      this._itemById[item[this.idPropName]] = item;
    }
    if (this.businessIdPropName && this._itemByBusinessId) {
      this._itemByBusinessId[item[this.businessIdPropName]] = item;
    }

    const groupedItemsByPropByPropPath = this._getCachedValue(
      "groupedItemsByPropByPropPath"
    );
    if (groupedItemsByPropByPropPath) {
      groupedItemsByPropByPropPath.forEach(
        (groupedItemsByPropValue: Map<any, ItemType[]>, propPath: string) => {
          const value = _.get(item, propPath);
          let groupedItems = groupedItemsByPropValue.get(value);
          if (!groupedItems) {
            groupedItems = [];
            groupedItemsByPropValue.set(value, groupedItems);
          }
          groupedItems.push(item);
        }
      );
    }

    if (atIndex === undefined) {
      this.items.push(item);
    } else {
      this.items.splice(atIndex, 0, item);
    }
  }

  _addMultipleItems(items: ItemType[], options: AddItemOptions = {}) {
    items.forEach((item) => this._addSingleItem(item, options));
  }

  /**
   * adds the next id on the item if possible and required, or makes sure that the next id
   * on the constructor is going to be bigger than the one provided
   * @param {any} itemOrItemProps
   * @returns {boolean|null} true if an id was already there, false if there was no id and it added one, null if not applicable
   */
  ensureId(itemOrItemProps: { [propName: string]: any }): boolean | null {
    if (!this.idPropName) return null;
    const currentId = itemOrItemProps[this.idPropName];
    if (currentId) {
      this.updateNextIdFunction(currentId);
      return true;
    }

    // eslint-disable-next-line no-param-reassign
    itemOrItemProps[this.idPropName] = this.nextIdValue;
    this.incrementIdFunction();
    return false;
  }

  has(item: ItemType) {
    return this.items.indexOf(item) >= 0;
  }

  createNewItem(
    itemProps: { [propName: string]: any } = {},
    options?: AddItemOptions
  ): ItemType {
    if (this.ensureId(itemProps))
      throw new Error("Error! Got an id when using createNewItem");
    const item = new this.ItemConstructor(itemProps) as unknown as ItemType;
    this.add(item, options);
    return item;
  }

  addBeforeExistingItem(item: ItemType, existingItem: ItemType) {
    this.add(item, { atIndex: this.items.indexOf(existingItem) });
  }

  remove(item: ItemType) {
    this.validate("remove", item);
    this.items.splice(this.items.indexOf(item), 1);
    if (this.idPropName && this._itemById) delete this._itemById[item[this.idPropName]];
    if (this.businessIdPropName && this._itemByBusinessId)
      delete this._itemByBusinessId[item[this.businessIdPropName]];

    const groupedItemsByPropByPropPath = this._getCachedValue(
      "groupedItemsByPropByPropPath"
    );
    if (groupedItemsByPropByPropPath) {
      groupedItemsByPropByPropPath.forEach(
        (groupedItemsByPropValue: Map<any, ItemType[]>, propPath: string) => {
          const value = _.get(item, propPath);
          const groupedItems = groupedItemsByPropValue.get(value);
          if (groupedItems) {
            groupedItems.splice(groupedItems.indexOf(item), 1);
          }
        }
      );
    }

    // eslint-disable-next-line no-param-reassign
    if (this.associationType === "composition") item.parent = undefined;
  }

  count() {
    return this.items.length;
  }

  /**
   * Groups items of the collection by a given property
   * @param {String} propPath - the path to a property by which items should be grouped
   * @returns {Map<any, ItemType[]>} a map of arrays of items indexed by the given property
   */
  groupByProp(propPath: string, { refreshCache = true } = {}): Map<any, ItemType[]> {
    const groupedItemsByPropByPropPath = this._getAndSetCachedValue(
      "groupedItemsByPropByPropPath",
      () => new Map()
    );
    let groupedItemsByProp: Map<any, ItemType[]> =
      groupedItemsByPropByPropPath.get(propPath);
    if (!groupedItemsByProp || refreshCache) {
      groupedItemsByProp = new Map();
      this.items.forEach((item) => {
        const prop = _.get(item, propPath);
        let groupedItems = groupedItemsByProp.get(prop);
        if (!groupedItems) {
          groupedItems = [];
          groupedItemsByProp.set(prop, groupedItems);
        }
        groupedItems.push(item);
      });
      groupedItemsByPropByPropPath.set(propPath, groupedItemsByProp);
    }
    return groupedItemsByProp;
  }

  groupByCustomKey(
    customKeyCreationFunction: (item: ItemType) => string
  ): Map<any, ItemType[]> {
    const groupedItemsByCustomKey = new Map();
    this.items.forEach((item) => {
      const customKey = customKeyCreationFunction(item);
      let groupedItems = groupedItemsByCustomKey.get(customKey);
      if (!groupedItems) {
        groupedItems = [];
        groupedItemsByCustomKey.set(customKey, groupedItems);
      }
      groupedItems.push(item);
    });
    return groupedItemsByCustomKey;
  }

  /**
   * @callback MultipleItemsForKeyHandlingFunction
   * @param {ItemType[]} items
   * @param {any} key
   */

  /**
   * @param {CustomKeyCreationFunction} customKeyCreationFunction
   * @param {MultipleItemsForKeyHandlingFunction=} multipleItemsByKeyHandlingFunction
   * @returns {Map<any, ItemType>} a map of items indexed by the custom key
   */
  keyBy(
    customKeyCreationFunction: (item: ItemType) => string,
    multipleItemsForKeyHandlingFunction = defaultMultipleItemsForKeyHandlingFunction
  ) {
    const itemsByKey = this.groupByCustomKey(customKeyCreationFunction);
    const itemByKey = new Map();
    itemsByKey.forEach((items, key) => {
      const item =
        items.length === 1 ? items[0] : multipleItemsForKeyHandlingFunction(items, key);
      itemByKey.set(key, item);
    });
    return itemByKey;
  }

  getOrCreateItemByPropName(
    propName: string,
    value: any,
    defaultPropsForNewItem: EntityProps
  ) {
    let item = this.getByPropName(propName, value);
    if (!item) {
      item = this.createNewItem(defaultPropsForNewItem);
    }
    return item;
  }
}

export default Collection;

function defaultMultipleItemsForKeyHandlingFunction<
  ItemType extends ExtendedItem<ItemType>
>(items: ItemType[], key: string) {
  throw new Error(
    `${items.length} found for key ${key}\n${_.truncate(
      items.map((it) => it.shortLoggingOutput).join("\n"),
      { length: 500 }
    )}`
  );
}
