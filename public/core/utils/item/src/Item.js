const { cloneDeepWith } = require('lodash');
const Entity = require('@bimo/core-utils-entity');
const shallowAssign = require('@bimo/core-utils-shallow-assign');
const { Collection } = require('@bimo/core-utils-collection');

/** @template ParentConstructor */
class Item extends Entity {
  constructor(props = {}, context = {}) {
    super(props, context);
    this._rawOigProps = shallowAssign({}, props);
  }

  /**
   * @returns {ParentConstructor}
   */
  clone() {
    const clone = cloneDeepWith(this, (value, key) => {
      if (key === '_cachedValueByValueKey') return {};
      if (key === 'parent') return null;
      if (key === 'temp') return null;
      return undefined;
    });
    createParentLinksOnChildren(clone, null);
    return clone;
  }
}

module.exports = Item;

function createParentLinksOnChildren(object, parent) {
  if (object instanceof Collection) {
    // eslint-disable-next-line no-param-reassign
    object.parent = parent;
    object.items.forEach((item) => createParentLinksOnChildren(item, object));
    return;
  }
  if (object instanceof Item) {
    // eslint-disable-next-line no-param-reassign
    object.parent = parent;
    Object.entries(object).forEach(([key, value]) => {
      if (key !== 'parent') createParentLinksOnChildren(value, object);
    });
  }
}
