import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { RunTimeVersionsCollection as BimoRunTimeVersionsCollection } from "../base-types/rawIndex";
export { RunTimeVersionsCollection as BimoRunTimeVersionsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
/* eslint-disable no-self-assign */
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoRunTimeVersion, RunTimeVersionProps } from "./RunTimeVersion";
export function RunTimeVersionsCollectionClassFactory({
  RunTimeVersion,
}: EntityConstructorByEntityClassKey): typeof BimoRunTimeVersionsCollection{
  
  const childClasses: (typeof Entity)[] = [RunTimeVersion];
  
  export interface RunTimeVersionsCollectionProps
  extends ExtendedCollectionProps<BimoRunTimeVersion, RunTimeVersionProps> {}
  
 class RunTimeVersionsCollection extends Collection<
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
  
  return RunTimeVersionsCollection
}

export default RunTimeVersionsCollectionClassFactory