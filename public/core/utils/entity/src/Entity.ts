import { get } from "lodash";
import { set } from "lodash";

export interface CustomProps {
  [key: string]: any;
}

export interface Context {
  [key: string]: any;
}

export interface EntityProps {
  parent?: Entity;
  customProps?: CustomProps;
  label?: string;
}

export class Entity {
  parent: Entity;
  customProps: CustomProps;
  label: string;
  private _context: Context;
  private _cachedValueByValueKey: { [key: string]: any };

  constructor(props: EntityProps = {}, context: Context = {}) {
    this.parent = props.parent;
    this.customProps = props.customProps || {};
    this.label = props.label;
    this._cachedValueByValueKey = {};
    this._context = context;
  }

  // TODO: #112 get rid of this
  get self() {
    return this;
  }

  get entityClassKey() {
    return this.constructor.name;
  }

  get context(): Object {
    return { ...(this.parent?.context ?? {}), ...this._context };
  }

  setCustomProp(name: string, value: any) {
    if (this.customProps[name] !== undefined) {
      throw new Error(`Trying to set ${name} custom prop on ${this.slo} but it has already been set.
      Use replaceCustomProp if this is what you want to do, or setOrReplaceCustomProp if you are a cowboy and don't care.`);
    }
    this.setOrReplaceCustomProp(name, value);
  }

  replaceCustomProp(name: string, value: any) {
    if (this.customProps[name] === undefined) {
      throw new Error(`Trying to replace ${name} custom prop on ${this.slo} but it has never been set.
      Use setCustomProp if this is what you want to do, or setOrReplaceCustomProp if you are a cowboy and don't care.`);
    }
    this.setOrReplaceCustomProp(name, value);
  }

  setOrReplaceCustomProp(name: string, value: any) {
    this.customProps[name] = value;
  }

  replaceContext(newContext = {}) {
    this._context = newContext;
  }

  addToContext(newContext: object) {
    this._context = { ...this._context, ...newContext };
  }

  get shortLoggingOutput() {
    return `${this.entityClassKey}: ${this.label || ""}`;
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

  _nullifyCachedValue(key: string) {
    set(this._cachedValueByValueKey, key, null);
  }

  _getAndSetCachedValue(key: string, computeValueFn: () => any) {
    let value = get(this._cachedValueByValueKey, key);
    if (!value) {
      value = computeValueFn();
      this._setCachedValue(key, value);
    }
    return value;
  }

  _getCachedValue(key: string) {
    return get(this._cachedValueByValueKey, key);
  }

  _setCachedValue(key: string, value: any) {
    set(this._cachedValueByValueKey, key, value);
  }

  _nullifyAllCachedValues() {
    this._cachedValueByValueKey = {};
  }
}
