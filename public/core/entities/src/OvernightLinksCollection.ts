/* Linked Classes */
const OvernightLink = require('./OvernightLink');

/* Serialization utilities dependencies */
const childClasses = [OvernightLink];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Class definition */
/** @extends {Collection<OvernightLink>} */
class OvernightLinksCollection extends Collection {
  constructor(props = {}) {
    super({ itemName: 'OvernightLink', ItemConstructor: OvernightLink, items: props.items, parent: props.parent });
  }
}

/* Serialization utilities */
OvernightLinksCollection.allChildClasses = getAllChildClasses(childClasses);
OvernightLinksCollection.prototype.serializeModel = serializeThis;
OvernightLinksCollection.parseModel = parseThis;

module.exports = OvernightLinksCollection;
