const get = require('lodash/get');
const set = require('lodash/set');

class Entity {
  constructor(props = {}, context = { }) {
    this.parent = props.parent;
    this._cachedValueByValueKey = {};
    this.customProps = props.customProps || {};
    this._context = context;
  }

  // TODO: #112 get rid of this
  get self() {
    return this;
  }

  get entityClassKey() {
    return this.constructor.name;
  }

  get context() {
    return { ...(this.parent?.context ?? {}), ...this._context };
  }

  setCustomProp(name, value) {
    if (this.customProps[name] !== undefined) {
      throw new Error(`Trying to set ${name} custom prop on ${this.slo} but it has already been set.
      Use replaceCustomProp if this is what you want to do, or setOrReplaceCustomProp if you are a cowboy and don't care.`);
    }
    this.setOrReplaceCustomProp(name, value);
  }

  replaceCustomProp(name, value) {
    if (this.customProps[name] === undefined) {
      throw new Error(`Trying to replace ${name} custom prop on ${this.slo} but it has never been set.
      Use setCustomProp if this is what you want to do, or setOrReplaceCustomProp if you are a cowboy and don't care.`);
    }
    this.setOrReplaceCustomProp(name, value);
  }

  setOrReplaceCustomProp(name, value) {
    this.customProps[name] = value;
  }

  replaceContext(newContext = {}) {
    this._context = newContext;
  }

  addToContext(newContext) {
    this._context = { ...this._context, ...newContext };
  }

  get shortLoggingOutput() {
    return `${this.entityClassKey}: ${this.label || ''}`;
  }

  /** Short Logging Output */
  get slo() {
    return this.shortLoggingOutput;
  }

  get mediumLoggingOutput() {
    return this.shortLoggingOutput;
  }

  /** Medium Logging Output */
  get mlo() {
    return this.mediumLoggingOutput;
  }

  get longLoggingOutput() {
    return this.mediumLoggingOutput;
  }

  /** Long Logging Output */
  get llo() {
    return this.longLoggingOutput;
  }

  /** This should not change is the "business value" of the entity does not change
   * In other words, this should not contain internal ids or other things that can
   * change randomly or incrementaly  */
  get businessLoggingOutput() {
    return this.llo;
  }

  get blo() {
    return this.businessLoggingOutput;
  }

  _nullifyCachedValue(key) {
    set(this._cachedValueByValueKey, key, null);
  }

  _getAndSetCachedValue(key, computeValueFn) {
    let value = get(this._cachedValueByValueKey, key);
    if (!value) {
      value = computeValueFn();
      this._setCachedValue(key, value);
    }
    return value;
  }

  _getCachedValue(key) {
    return get(this._cachedValueByValueKey, key);
  }

  _setCachedValue(key, value) {
    set(this._cachedValueByValueKey, key, value);
  }

  _nullifyAllCachedValues() {
    this._cachedValueByValueKey = {};
  }
}

module.exports = Entity;
