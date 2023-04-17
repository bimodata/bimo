/* Linked Classes */
const Blkvehuoir = require('./Blkvehuoir');

/* Serialization utilities dependencies */
const childClasses = [Blkvehuoir];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Class definition */
/** @extends {Collection<Blkvehuoir>} */
class BlkvehuoirsCollection extends Collection {
  constructor(props = {}) {
    Object.assign(props, {
      itemName: 'Blkvehuoir',
      ItemConstructor: Blkvehuoir,
      idPropName: `bimoId`,
      labelPropName: `blkvehuoirRank`,
    });
    super(props);
  }
}

/* Serialization utilities */
BlkvehuoirsCollection.allChildClasses = getAllChildClasses(childClasses);
BlkvehuoirsCollection.prototype.serializeModel = serializeThis;
BlkvehuoirsCollection.parseModel = parseThis;

module.exports = BlkvehuoirsCollection;
