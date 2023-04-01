import { Entity, EntityProps } from "..";

interface TestClass1Props extends EntityProps {
  someProp: string;
}

export class TestClass1 extends Entity {
  someProp: string;
  constructor(props: TestClass1Props) {
    super(props);
    this.someProp = props.someProp;
  }
}

export default TestClass1;
