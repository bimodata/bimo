const { expect } = require('chai');

const getEntityClassKey = require('..');

describe('getEntityClassKey', () => {
  it(`Exposes a getCollectionClassKeyFromItem function`, () => {
    expect(getEntityClassKey.getCollectionClassKeyFromItem).to.be.a('function');
  });
  it(`Exposes a getItemClassKeyFromItem function`, () => {
    expect(getEntityClassKey.getItemClassKeyFromItem).to.be.a('function');
  });
  it(`Exposes a getCollectionClassKeyFromCollection function`, () => {
    expect(getEntityClassKey.getCollectionClassKeyFromCollection).to.be.a('function');
  });
  it(`Exposes a getItemClassKeyFromCollection function`, () => {
    expect(getEntityClassKey.getItemClassKeyFromCollection).to.be.a('function');
  });
  it(`Exposes a getEntityClassKeyFromEntity function`, () => {
    expect(getEntityClassKey.getEntityClassKeyFromEntity).to.be.a('function');
  });
});
