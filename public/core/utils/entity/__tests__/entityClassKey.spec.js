const { expect } = require('chai');

const Entity = require('..');
const TestClass1 = require('./TestClass1');

describe('Entity.entityClassKey', () => {
  it(`on simple entity, its value is 'Entity'`, () => {
    const entity = new Entity();
    expect(entity.entityClassKey).to.equal('Entity');
  });
  it(`on an entity that extends Entity, its value is the name of the Class from which the instance was created`, () => {
    const test1 = new TestClass1({ someProp: 'test1' });
    expect(test1.entityClassKey).to.equal('TestClass1');
  });
});
