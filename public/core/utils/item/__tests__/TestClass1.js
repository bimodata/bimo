const Item = require('..');

/** @extends {Item<TestClass1>} */
class TestClass1 extends Item {
  /**
   *
   * @param {TestClass1} props
   */
  constructor(props) {
    super(props);
    this.someProp = props.someProp;
    this.someProp2 = props.someProp2;
    this.someObjectProp = props.someObjectProp ?? {};
    this.someArrayProp = props.someArrayProp ?? [];
  }

  get cachedComputedProp() {
    return this._getAndSetCachedValue('cachedComputedProp', () => `${this.someProp} - ${this.someProp2}`);
  }
}

module.exports = TestClass1;
