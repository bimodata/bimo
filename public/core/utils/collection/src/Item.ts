import { cloneDeepWith } from "lodash";
import { Entity, EntityProps } from "@bimo/core-utils-entity";
import { Collection } from "./Collection";
import { shallowAssign } from "@bimo/core-utils-shallow-assign";
import { BimoContext } from "@bimo/core-global-types";

export interface RawOirProps {
  [key: string]: string;
}

export interface ExtendedItemProps extends EntityProps {
  [propName: string]: any;
}

export class Item<ItemType> extends Entity {
  _rawOirProps: RawOirProps;
  static updateNextIdFunction?: (knownId?: string) => void;
  static incrementIdFunction: () => void;
  static nextIdValue: string;
  static hastusKeywords?: string[];
  static hastusObject?: string;

  constructor(props: ExtendedItemProps = {}, context: BimoContext = {}) {
    super(props, context);
    this._rawOirProps = Item.getRawOirProps(props);
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

  static getRawOirProps(props: EntityProps) {
    const shallowProps = shallowAssign({}, props);
    return Object.fromEntries(
      Object.entries(shallowProps).map(([key, value]) => [
        key,
        value ? value.toString() : "",
      ])
    );
  }
}

function createParentLinksOnChildren<ItemType extends ExtendedItem<ItemType>>(
  object: any,
  parent: any
) {
  if (object instanceof Collection) {
    object.parent = parent;
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
