const { expect } = require('chai');

const Entity = require('..');

describe('Entity.context', () => {
  it(`on a blank entity, it is an empty object`, () => {
    const entity = new Entity();
    expect(entity.context).to.eql({});
  });

  it(`on an entity that has a parent, it is the a fusion of the parent's context and the entitie's context`, () => {
    const grandParent = new Entity({}, { year: '2005' });
    const parent = new Entity({ parent: grandParent }, { weather: 'sunny' });
    const child = new Entity({ parent }, { time: 'morning' });
    expect(grandParent.context).to.eql({ year: '2005' });
    expect(parent.context).to.eql({
      year: '2005',
      weather: 'sunny',
    });
    expect(child.context).to.eql({
      year: '2005',
      weather: 'sunny',
      time: 'morning',
    });
  });
  it(`When the child and parent's contexts have a common prop, it returns the child's value`, () => {
    const grandParent = new Entity({}, { year: '2005', weather: 'sunny', time: 'morning' });
    const parent = new Entity({ parent: grandParent }, { year: '2006', weather: undefined });
    const child = new Entity({ parent }, { weather: 'cloudy', time: 'pm' });

    expect(grandParent.context).to.eql({
      year: '2005',
      weather: 'sunny',
      time: 'morning',
    });
    expect(parent.context).to.eql({
      year: '2006',
      weather: undefined,
      time: 'morning',
    });
    expect(child.context).to.eql({
      year: '2006',
      weather: 'cloudy',
      time: 'pm',
    });
  });
});
