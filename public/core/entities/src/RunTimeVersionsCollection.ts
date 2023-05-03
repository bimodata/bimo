/* eslint-disable no-self-assign */
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { RunTimeVersion, RunTimeVersionProps } from "./RunTimeVersion";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [RunTimeVersion];

export interface RunTimeVersionsCollectionProps
  extends ExtendedCollectionProps<RunTimeVersion, RunTimeVersionProps> {}

export class RunTimeVersionsCollection extends Collection<
  RunTimeVersion,
  RunTimeVersionProps
> {
  constructor(props: RunTimeVersionsCollectionProps = {}) {
    super({
      itemName: "RunTimeVersion",
      ItemConstructor: RunTimeVersion,
      idPropName: "bimoId",
      labelPropName: `rtvDescription`,
      associationType: `aggregation`,
      ...props,
    });
  }

  /**
   * @param oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
   */
  static createFromOirStyleData(oirStyleData: any) {
    const rawRunTimeVersions = oirStyleData.runtime_version;

    if (!rawRunTimeVersions) {
      throw new Error(`Bad oirStyleData: could not find "runtime_version" key`);
    }
    const newRunTimeVersionsCollection = new RunTimeVersionsCollection({
      items: rawRunTimeVersions,
    });

    return newRunTimeVersionsCollection;
  }

  generateOirStyleData() {
    return {
      runtime_version: this.map((runTimeVersion) => ({
        ...runTimeVersion,
        runtime: runTimeVersion.runTimes,
        loadtime: runTimeVersion.loadTimes,
      })),
    };
  }
}

RunTimeVersionsCollection.allChildClasses = getAllChildClasses(childClasses);

/* I/O info */
RunTimeVersionsCollection.defaultExportedDataDataName = `output_rtver`;
RunTimeVersionsCollection.defaultImportDataDataName = `input_rtver`;

export default RunTimeVersionsCollection;
