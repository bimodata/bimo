/* Linked Classes */
const Vscincloir = require('./Vscincloir');

/* Serialization utilities dependencies */
const childClasses = [Vscincloir];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Class definition */
/** @extends {Collection<Vscincloir>} */
class VscincloirsCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'Vscincloir',
      ItemConstructor: Vscincloir,
      items: props.items,
      idPropName: `bimoId`,
      labelPropName: `vscincloirIntKey`,
      parent: props.parent,
    });
  }
}

/* Serialization utilities */
VscincloirsCollection.allChildClasses = getAllChildClasses(childClasses);
VscincloirsCollection.prototype.serializeModel = serializeThis;
VscincloirsCollection.parseModel = parseThis;

module.exports = VscincloirsCollection;
