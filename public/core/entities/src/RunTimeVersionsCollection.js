/* eslint-disable no-self-assign */
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

/* Linked Classes */
const RunTimeVersion = require('./RunTimeVersion');

const childClasses = [RunTimeVersion];

/* Class definition */

/** @extends {Collection<RunTimeVersion>} */
class RunTimeVersionsCollection extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'RunTimeVersion',
      ItemConstructor: RunTimeVersion,
      idPropName: 'bimoId',
      labelPropName: `rtvDescription`,
      associationType: `aggregation`,
      ...props,
    });

    this.libelle = props.libelle;
  }

  /**
     *
     * @param {Object} oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
     */
  static createFromOirStyleData(oirStyleData) {
    const rawRunTimeVersions = oirStyleData.runtime_version;

    if (!rawRunTimeVersions) {
      throw new Error(`Bad oirStyleData: could not find "runtime_version" key`);
    }
    const newRunTimeVersionsCollection = new RunTimeVersionsCollection({ items: rawRunTimeVersions });

    return newRunTimeVersionsCollection;
  }

  generateOirStyleData() {
    return {
      runtime_version: this.map((runTimeVersion) => (
        {
          ...runTimeVersion,
          runtime: runTimeVersion.runTimes,
          loadtime: runTimeVersion.loadTimes,
        }
      )),
    };
  }
}

/* Serialization utilities */
RunTimeVersionsCollection.allChildClasses = getAllChildClasses(childClasses);
RunTimeVersionsCollection.prototype.serializeModel = serializeThis;
RunTimeVersionsCollection.parseModel = parseThis;

/* I/O info */
RunTimeVersionsCollection.defaultExportedDataDataName = `output_rtver`;
RunTimeVersionsCollection.defaultImportDataDataName = `input_rtver`;

module.exports = RunTimeVersionsCollection;
