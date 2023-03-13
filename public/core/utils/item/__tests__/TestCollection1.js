// const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
// eslint-disable-next-line import/no-extraneous-dependencies
const { Collection } = require('@bimo/core-utils-collection');
const TestClass1 = require('./TestClass1');

// const childClasses = [TestClass1];

/* Class definition */
/** @extends {Collection<TestClass1>} */
class TestCollection1 extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'TestClass1',
      ItemConstructor: TestClass1,
      ...props,
    });
  }

  get mediumLoggingOutput() {
    return this.map((item) => `${item.someProp}-toto-titi`).join(' / ');
  }
}

// /* Serialization utilities */
// TestCollection1.allChildClasses = getAllChildClasses(childClasses);
// TestCollection1.prototype.serializeModel = serializeThis;
// TestCollection1.parseModel = parseThis;

module.exports = TestCollection1;
