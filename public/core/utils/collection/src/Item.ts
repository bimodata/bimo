import { cloneDeepWith } from "lodash";
import { Entity, EntityProps, Context } from "@bimo/core-utils-entity";
import { Collection } from "./Collection";
import { shallowAssign } from "@bimo/core-utils-shallow-assign";

export interface RawOigProps {
  [key: string]: string;
}

export class Item<ItemType> extends Entity {
  private _rawOigProps: RawOigProps;
  static updateNextIdFunction?: (knownId?: string) => void;
  static incrementIdFunction: () => void;
  static nextIdValue: string;

  constructor(props = {}, context = {}) {
    super(props, context);
    this._rawOigProps = Item.getRawOigProps(props);
  }

  clone(): ItemType {
    const clone: ItemType = cloneDeepWith(this, (value, key) => {
      if (key === "_cachedValueByValueKey") return {};
      if (key === "parent") return null;
      if (key === "temp") return null;
      return undefined;
    });
    createParentLinksOnChildren(clone, null);
    return clone;
  }

  static getRawOigProps(props: EntityProps) {
    const shallowProps = shallowAssign({}, props);
    return Object.fromEntries(
      Object.entries(shallowProps).map(([key, value]) => [key, value && value.toString()])
    );
  }
}

function createParentLinksOnChildren<ItemType extends ExtendedItem<ItemType>>(
  object: any,
  parent: any
) {
  if (object instanceof Collection) {
    (object as Collection<ItemType>).parent = parent;
    object.items.forEach((item: any) => createParentLinksOnChildren(item, object));
    return;
  }
  if (object instanceof Item) {
    object.parent = parent;
    Object.entries(object).forEach(([key, value]) => {
      if (key !== "parent") createParentLinksOnChildren(value, object);
    });
  }
}

export interface ExtendedItem<ItemType> extends Item<ItemType> {
  [propName: string]: any;
}
