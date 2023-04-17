const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const DataFile = require('./DataFile');

const childClasses = [DataFile];

/** @extends {Collection<DataFile>} */
class DataFilesCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'DataFile',
      ItemConstructor: DataFile,
      idPropName: 'path',
      businessIdPropName: 'path',
      labelPropName: 'fileName',
      associationType: 'aggregation',
      ...props,
    });
  }
}

DataFilesCollection.allChildClasses = getAllChildClasses(childClasses);
DataFilesCollection.prototype.serializeModel = serializeThis;
DataFilesCollection.parseModel = parseThis;

module.exports = DataFilesCollection;
