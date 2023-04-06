import { expect } from "chai";
import TestClass1 from "./TestClass1";
import TestClass2 from "./TestClass2";

describe(`Item`, () => {
  describe(`Item.clone`, () => {
    context(`when called on an instance of a class that extends item`, () => {
      let test1: TestClass1;
      beforeEach(() => {
        test1 = new TestClass1({
          someProp: "test1",
          someObjectProp: { toto: "titi" },
          someArrayProp: [1, 2, 3],
        });
      });
      it(`returns a new instance of the class that extends item `, () => {
        expect(test1.clone()).to.be.instanceOf(TestClass1);
      });
      it(`returns a new instance different that the source object `, () => {
        expect(test1.clone()).to.not.equal(test1);
      });
      it(`object props are different instances than on the source object but with equivalent content`, () => {
        const copy = test1.clone();
        expect(copy.someObjectProp).to.not.equal(test1.someObjectProp);
        expect(copy.someObjectProp).to.eql(test1.someObjectProp);
      });
      it(`array props are different instances than on the source object `, () => {
        const copy = test1.clone();
        expect(copy.someArrayProp).to.not.equal(test1.someArrayProp);
        expect(copy.someArrayProp).to.eql(test1.someArrayProp);
      });
      it(`the cache of the new object is reset (but not of the source)`, () => {
        expect(test1.cachedComputedProp).to.equal("test1 - undefined");
        expect((test1 as any)._cachedValueByValueKey).to.not.eql({});
        const copy = test1.clone();
        expect((test1 as any)._cachedValueByValueKey).to.not.eql({});
        expect((copy as any)._cachedValueByValueKey).to.eql({});
      });
      it(`any key named "temp" is not cloned`);
    });
    context(
      `when called on an instance of a class that has a prop that extends collection`,
      () => {
        let test2: TestClass2;
        beforeEach(() => {
          test2 = new TestClass2({ someOtherProp: "test2" });
          const item1 = test2.collection.createNewItem({ someProp: "item1" });
          const item2 = test2.collection.createNewItem({ someProp: "item2" });
          const item3 = test2.collection.createNewItem({ someProp: "item3" });
          expect(item1.parent).to.equal(item2.parent);
          expect(item1.parent).to.equal(test2.collection);
          expect(item3.parent?.parent).to.equal(test2);
        });
        it(`returns a new instance of the class that extends item `, () => {
          expect(test2.clone()).to.be.instanceOf(TestClass2);
        });
        it(`recreates the parent links on the clone`, () => {
          const clone = test2.clone();
          const [item1, item2, item3] = clone.collection.items;
          expect(item1.parent).to.equal(item2.parent);
          expect(item1.parent).to.equal(clone.collection);
          expect(item3.parent?.parent).to.equal(clone);
        });
      }
    );
  });
});
