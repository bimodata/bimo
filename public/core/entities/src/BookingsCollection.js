/* eslint-disable no-self-assign */
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Linked Classes */
const Booking = require('./Booking');

const childClasses = [Booking];

/* Class definition */
/** @extends {Collection<Booking>} */
class BookingsCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'Booking',
      ItemConstructor: Booking,
      idPropName: `bimoId`,
      labelPropName: 'bkDescription',
      associationType: `aggregation`,
      ...props,
    });

    this.libelle = props.libelle;
  }

  generateOirStyleData() {
    return { booking: this.items };
  }
}

/* Serialization utilities */
BookingsCollection.allChildClasses = getAllChildClasses(childClasses);
BookingsCollection.prototype.serializeModel = serializeThis;
BookingsCollection.parseModel = parseThis;

/* I/O info */
BookingsCollection.defaultExportedDataDataName = `output_booking`;
BookingsCollection.defaultImportDataDataName = `input_booking`;

module.exports = BookingsCollection;
