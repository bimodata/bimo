const Item = require('..');

const TestCollection1 = require('./TestCollection1');

/** @extends {Item<TestClass2>} */
class TestClass2 extends Item {
  /**
   *
   * @param {TestClass2} props
   */
  constructor(props) {
    super(props);
    this.someOtherProp = props.someOtherProp;
    this.collection = new TestCollection1({ parent: this });
  }
}

module.exports = TestClass2;
