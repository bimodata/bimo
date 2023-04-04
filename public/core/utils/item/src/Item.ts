import { cloneDeepWith } from "lodash";
import { Entity, EntityProps, Context } from "@bimo/core-utils-entity";
import shallowAssign = require("@bimo/core-utils-shallow-assign");
import { Collection } from "@bimo/core-utils-collection";

export interface RawOigProps {
  [key: string]: string;
}

export class Item<ItemType extends Entity> extends Entity {
  private _rawOigProps: RawOigProps;
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
      Object.entries(shallowProps).map(([key, value]) => [
        key,
        value.toString(),
      ])
    );
  }
}

// TODO: switch types back toEntity once collection has been moved to TS
function createParentLinksOnChildren(object: any, parent: any) {
  if (object instanceof Collection) {
    (object as any).parent = parent;
    object.items.forEach((item: any) =>
      createParentLinksOnChildren(item, object)
    );
    return;
  }
  if (object instanceof Item) {
    object.parent = parent;
    Object.entries(object).forEach(([key, value]) => {
      if (key !== "parent") createParentLinksOnChildren(value, object);
    });
  }
}
