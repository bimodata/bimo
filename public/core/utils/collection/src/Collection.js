const _ = require('lodash');
const partition = require('@bimo/core-utils-partition');
const { emptyPolicy, Policy } = require('@bimo-core/policy');
const asyncForEach = require('@bimo/core-utils-async-for-each');
const Entity = require('@bimo/core-utils-entity');
const uniqueIdPolicy = require('./uniqueIdPolicy');

/* Class definition */
/** @template ItemType */
class Collection extends Entity {
  /**
   * @param {Object} props
   * @param {string} props.itemName
   * @param {*} props.ItemConstructor
   * @param {Object[]=} props.items
   * @param {object=} props.parent
   * @param {string=} props.idPropName
   * @param {string=} props.businessIdPropName
   * @param {string=} props.labelPropName
   * @param {'composition'|'aggregation'} [props.associationType=composition]
   * @param {Policy=} props.policy
   *
   */
  constructor(props) {
    const {
      itemName, ItemConstructor, items = [], idPropName, businessIdPropName, labelPropName,
      associationType = 'composition', policy = null, label,
    } = props;
    super(props);
    this.policy = policy || (associationType === 'composition' ? uniqueIdPolicy : emptyPolicy);
    this.itemName = itemName;
    this.idPropName = idPropName;
    this.businessIdPropName = businessIdPropName;
    this.labelPropName = labelPropName;
    this.ItemConstructor = ItemConstructor;
    this.associationType = associationType;
    this.updateNextIdFunction = this.ItemConstructor.updateNextIdFunction ?? ((knownId) => {
      const knownIdAsInt = knownId ? parseInt(knownId, 10) : 0;
      const nextIdAsInt = parseInt(this.ItemConstructor.nextIdValue, 10);
      this.ItemConstructor.nextIdValue = (Math.max(knownIdAsInt + 1, nextIdAsInt)).toString();
    });
    this.incrementIdFunction = this.ItemConstructor.incrementIdFunction ?? (() => {
      const nextIdAsInt = parseInt(this.ItemConstructor.nextIdValue, 10);
      this.ItemConstructor.nextIdValue = (nextIdAsInt + 1).toString();
    });
    this.label = label;

    // See #29 for some gotchas about the lines below.
    /** @type {ItemType[]} */
    this.items = [];
    this._cachedValueByValueKey = { itemById: null, itemByBusinessId: null };
    items.forEach((rawItem) => {
      const newItem = (rawItem instanceof this.ItemConstructor ? rawItem : new this.ItemConstructor(rawItem));
      this.ensureId(newItem);
      this.add(newItem);
    });
  }

  /**
   * @param {'add'|'remove'|'default'} [eventKey='default']
   * @param {ItemType} [item]
   */
  validate(eventKey = 'default', item) {
    return this.policy.evaluate(eventKey, { collection: this, item });
  }

  get longLoggingOutput() {
    return this.items.map((item) => item.mediumLoggingOutput).join('\n');
  }

  get businessLoggingOutput() {
    return this.items.map((item) => item.businessLoggingOutput).join('\n');
  }

  get nextIdValue() {
    if (!this.ItemConstructor.nextIdValue) {
      this.ItemConstructor.nextIdValue = '1';
    }
    return this.ItemConstructor.nextIdValue;
  }

  get _itemById() {
    if (!this.idPropName) return null;
    if (!this._cachedValueByValueKey.itemById) {
      this._cachedValueByValueKey.itemById = {};
      this.items.forEach((item) => {
        this._cachedValueByValueKey.itemById[item[this.idPropName]] = item;
      });
    }
    return this._cachedValueByValueKey.itemById;
  }

  get _itemByBusinessId() {
    if (!this.businessIdPropName) return null;
    if (!this._cachedValueByValueKey.itemByBusinessId) {
      this._cachedValueByValueKey.itemByBusinessId = {};
      this.items.forEach((item) => {
        this._cachedValueByValueKey.itemByBusinessId[item[this.businessIdPropName]] = item;
      });
    }
    return this._cachedValueByValueKey.itemByBusinessId;
  }

  get length() {
    return this.items.length;
  }

  get shortLoggingOutput() {
    return `${this.length} ${this.itemName}(s)`;
  }

  /**
   * @callback ReduceCb
   * @param {any} previousValue
   * @param {ItemType} currentValue
   * @param {Number} currentIndex
   * @param {ItemType[]} array
   */

  /**
   *
   * @param {ReduceCb} callback
   * @param {*} initialValue
   */
  reduce(callback, initialValue) {
    return this.items.reduce(callback, initialValue);
  }

  /**
   * @callback ArrayMethodsCallback
   * @param {ItemType} value
   * @param {number} index
   * @param {ItemType[]} array
   */

  /** @param {ArrayMethodsCallback} callback */
  forEach(callback) {
    this.items.forEach(callback);
  }

  /**
   * @callback AsyncArrayMethodsCallback
   * @param {ItemType} value
   * @param {number} index
   * @param {ItemType[]} array
   * @async
   */

  /** @param {AsyncArrayMethodsCallback} callback */
  async asyncForEach(callback) {
    return asyncForEach(this.items, callback);
  }

  /** @param {ArrayMethodsCallback} callback */
  map(callback) {
    return this.items.map(callback);
  }

  /** @param {ArrayMethodsCallback} callback */
  flatMap(callback) {
    return this.items.flatMap(callback);
  }

  /** @param {ArrayMethodsCallback} callback */
  find(callback) {
    return this.items.find(callback);
  }

  /** @param {ArrayMethodsCallback} callback */
  findIndex(callback) {
    return this.items.findIndex(callback);
  }

  /** @param {ArrayMethodsCallback} callback */
  some(callback) {
    return this.items.some(callback);
  }

  /**
   * @param {ItemType} item
   * @param {number} [fromIndex=0]
   */
  indexOf(item, fromIndex = 0) {
    return this.items.indexOf(item, fromIndex);
  }

  /**
   * Filters the collection to keep only items for which the callback returns true
   * MUTATES the collection
   * @param {ArrayMethodsCallback} callback Callback function to apply to each item - returns true if item should be kept
   * @returns {ItemType[]} Array of items that were REMOVED
   */
  filter(callback) {
    this.invalidateItemById();
    this.invalidateItemByBusinessId();
    this._nullifyCachedValue('groupedItemsByPropByPropPath');

    const [keptItems, removedItems] = partition(this.items, callback);
    if (this.associationType === 'composition') {
      removedItems.forEach((removedItem) => {
        // eslint-disable-next-line no-param-reassign
        removedItem.parent = null;
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
  pick(callback) {
    return _.filter(this.items, callback);
  }

  /** @param {ArrayMethodsCallback} callback */
  every(callback) {
    return this.items.every(callback);
  }

  /**
   * @callback CompareFn
   * @param {ItemType} itemA
   * @param {ItemType} itemB
   */

  /** @param {CompareFn} compareFn */
  sort(compareFn) {
    return this.items.sort(compareFn);
  }

  getByPropName(propName, value) {
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
  getById(idOrItem) {
    if (!this.idPropName) throw new Error(`Trying to get by id on a collection of ${this.itemName}, which doesn't have an idPropName`);
    const id = (typeof idOrItem === 'object') ? idOrItem[this.idPropName] : idOrItem;
    return id && this._itemById[id];
  }

  /**
   * If idOrItem is a string, returns the first item in collection that has a value of id in the "businessIdPropName" field.
   * If idOrItem is an object, returns the first item in collection that has the same value as the item in the "hatusIdPropName" field
   * @param {string|Object} idOrItem - id to look for, or an object that has a key "hatusIdPropName"
   * @returns {ItemType} item from the collection that matches the id
   */
  getByBusinessId(idOrItem) {
    if (!this.businessIdPropName) {
      throw new Error(`Trying to get by businessId on a collection of ${this.itemName}, which doesn't have an businessIdPropName`);
    }
    const businessId = (typeof idOrItem === 'object') ? idOrItem[this.businessIdPropName] : idOrItem;
    return businessId && this._itemByBusinessId[businessId];
  }

  invalidateItemByBusinessId() {
    if (this._cachedValueByValueKey.itemByBusinessId) {
      this._cachedValueByValueKey.itemByBusinessId = null;
    }
  }

  invalidateItemById() {
    if (this._cachedValueByValueKey.itemById) {
      this._cachedValueByValueKey.itemById = null;
    }
  }

  get first() {
    return this.items[0];
  }

  get last() {
    return this.items[this.items.length - 1];
  }

  /**
   * @param {ItemType|ItemType[]} itemOrItems - the item or items to add
   * @param {object} options
   * @param {number=} options.atIndex - index at which to add the item
   * @param {boolean=} options.ensureId - add id to the item before adding it if missing.
   */
  add(itemOrItems, options = {}) {
    if (Array.isArray(itemOrItems)) {
      this._addMultipleItems(itemOrItems, options);
    }
    else {
      this._addSingleItem(itemOrItems, options);
    }
  }

  /**
   * @param {ItemType} item - the item to add
   * @param {object} options
   * @param {number=} options.atIndex - index at which to add the item
   * @param {boolean=} options.ensureId - add id to the item before adding it if missing.
   */
  _addSingleItem(item, options = {}) {
    const { atIndex, ensureId } = options;
    if (ensureId) this.ensureId(item);
    this.validate('add', item);
    if (this.associationType === `composition`) {
      // eslint-disable-next-line no-param-reassign
      item.parent = this;
    }
    if (this.idPropName) {
      this._itemById[item[this.idPropName]] = item;
    }
    if (this.businessIdPropName) {
      this._itemByBusinessId[item[this.businessIdPropName]] = item;
    }

    const groupedItemsByPropByPropPath = this._getCachedValue('groupedItemsByPropByPropPath');
    if (groupedItemsByPropByPropPath) {
      groupedItemsByPropByPropPath.forEach((groupedItemsByPropValue, propPath) => {
        const value = _.get(item, propPath);
        let groupedItems = groupedItemsByPropValue.get(value);
        if (!groupedItems) {
          groupedItems = [];
          groupedItemsByPropValue.set(value, groupedItems);
        }
        groupedItems.push(item);
      });
    }

    if (atIndex === undefined) {
      this.items.push(item);
    }
    else {
      this.items.splice(atIndex, 0, item);
    }
  }

  /**
   * @param {ItemType[]} items - the item to add
   * @param {object} options
   * @param {number=} options.atIndex - index at which to add the item
   * @param {boolean=} options.ensureId - add id to the item before adding it if missing.
   */
  _addMultipleItems(items, options = {}) {
    items.forEach((item) => this._addSingleItem(item, options));
  }

  /**
   * adds the next id on the item if possible and required, or makes sure that the next id
   * on the constructor is going to be bigger than the one provided
   * @param {any} itemOrItemProps
   * @returns {boolean|null} true if an id was already there, false if there was no id and it added one, null if not applicable
   */
  ensureId(itemOrItemProps) {
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

  has(item) {
    return this.items.indexOf(item) >= 0;
  }

  /**
   *
   * @param {ItemType} itemProps
   * @param {*} [options]
   * @returns {ItemType}
   */
  createNewItem(itemProps = {}, options) {
    if (this.ensureId(itemProps)) throw new Error('Error! Got an id when using createNewItem');
    const item = new this.ItemConstructor(itemProps);
    this.add(item, options);
    return item;
  }

  addBeforeExistingItem(item, existingItem) {
    this.add(item, { atIndex: this.items.indexOf(existingItem) });
  }

  remove(item) {
    this.validate('remove', item);
    this.items.splice(this.items.indexOf(item), 1);
    if (this.idPropName) delete this._itemById[item[this.idPropName]];
    if (this.businessIdPropName) delete this._itemByBusinessId[item[this.businessIdPropName]];

    const groupedItemsByPropByPropPath = this._getCachedValue('groupedItemsByPropByPropPath');
    if (groupedItemsByPropByPropPath) {
      groupedItemsByPropByPropPath.forEach((groupedItemsByPropValue, propPath) => {
        const value = _.get(item, propPath);
        const groupedItems = groupedItemsByPropValue.get(value);
        groupedItems.splice(groupedItems.indexOf(item), 1);
      });
    }

    // eslint-disable-next-line no-param-reassign
    if (this.associationType === 'composition') item.parent = null;
  }

  count() {
    return this.items.length;
  }

  /**
     * Groups items of the collection by a given property
     * @param {String} propPath - the path to a property by which items should be grouped
     * @returns {Map<any, ItemType[]>} a map of arrays of items indexed by the given property
     */
  groupByProp(propPath, { refreshCache = true } = {}) {
    const groupedItemsByPropByPropPath = this._getAndSetCachedValue('groupedItemsByPropByPropPath', () => new Map());
    let groupedItemsByProp = groupedItemsByPropByPropPath.get(propPath);
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

  /**
   * @callback CustomKeyCreationFunction
   * @param {ItemType} item
   */

  /**
   * @param {CustomKeyCreationFunction} customKeyCreationFunction
   * @returns {Map<any, ItemType[]>} a map of arrays of items indexed by the custom key
   */
  groupByCustomKey(customKeyCreationFunction) {
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
  keyBy(customKeyCreationFunction, multipleItemsForKeyHandlingFunction = defaultMultipleItemsForKeyHandlingFunction) {
    const itemsByKey = this.groupByCustomKey(customKeyCreationFunction);
    const itemByKey = new Map();
    itemsByKey.forEach((items, key) => {
      const item = (items.length === 1) ? items[0] : multipleItemsForKeyHandlingFunction(items, key);
      itemByKey.set(key, item);
    });
    return itemByKey;
  }

  getOrCreateItemByPropName(propName, value, defaultPropsForNewItem) {
    let item = this.getByPropName(propName, value);
    if (!item) {
      item = this.createNewItem(defaultPropsForNewItem);
    }
    return item;
  }
}

module.exports = Collection;

function defaultMultipleItemsForKeyHandlingFunction(items, key) {
  throw new Error(`${items.length} found for key ${key}\n${_.truncate(
    items.map((it) => it.shortLoggingOutput).join('\n'), { length: 500 },
  )}`);
}
