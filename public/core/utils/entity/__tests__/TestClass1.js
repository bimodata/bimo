const Entity = require('..');

class TestClass1 extends Entity {
  constructor(props) {
    super(props);
    this.someProp = props.someProp;
  }
}

module.exports = TestClass1;
