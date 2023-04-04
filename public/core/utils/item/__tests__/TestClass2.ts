import TestCollection1 from "./TestCollection1";
import Item from "..";

export interface TestClass2Props {
  someOtherProp?: any;
  collection?: TestCollection1;
}
export default class TestClass2 extends Item<TestClass2> {
  someOtherProp: any;
  collection: TestCollection1;
  constructor(props: TestClass2Props) {
    super(props);
    this.someOtherProp = props.someOtherProp;
    this.collection = new TestCollection1({ parent: this });
  }
}
