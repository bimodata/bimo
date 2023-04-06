import { Item, ExtendedItem } from "../index";

export interface TestClass1Props {
  someProp?: any;
  someProp2?: any;
  someObjectProp?: any;
  someArrayProp?: any;
}

export default class TestClass1 extends Item<TestClass1> {
  someProp?: any;
  someProp2?: any;
  someObjectProp?: any;
  someArrayProp?: any;
  constructor(props: TestClass1Props) {
    super(props);
    this.someProp = props.someProp;
    this.someProp2 = props.someProp2;
    this.someObjectProp = props.someObjectProp ?? {};
    this.someArrayProp = props.someArrayProp ?? [];
  }

  get cachedComputedProp() {
    return this._getAndSetCachedValue(
      "cachedComputedProp",
      () => `${this.someProp} - ${this.someProp2}`
    );
  }
}
