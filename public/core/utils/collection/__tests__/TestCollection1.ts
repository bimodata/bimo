import { Collection } from "../index";
import TestClass1 from "./TestClass1";

export default class TestCollection1 extends Collection<TestClass1> {
  constructor(props = {}) {
    super({
      itemName: "TestClass1",
      ItemConstructor: TestClass1,
      ...props,
    });
  }

  get mediumLoggingOutput() {
    return this.map((item) => `${item.someProp}-toto-titi`).join(" / ");
  }
}
