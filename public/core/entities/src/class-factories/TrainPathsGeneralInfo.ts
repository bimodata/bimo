import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPathsGeneralInfo as BimoTrainPathsGeneralInfo } from "../base-types/rawIndex";
export { TrainPathsGeneralInfo as BimoTrainPathsGeneralInfo } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

const childClasses: (typeof Entity)[] = [];

export interface TrainPathsGeneralInfoProps extends ExtendedItemProps {
  trnpgeninfoSource?: string;
  trnpgeninfoImportType?: string;
  trnpgeninfoAdministrativeYear?: string;
}

export function TrainPathsGeneralInfoClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoTrainPathsGeneralInfo {
  class TrainPathsGeneralInfo extends Item<TrainPathsGeneralInfo> {
    trnpgeninfoSource?: string;
    trnpgeninfoImportType?: string;
    trnpgeninfoAdministrativeYear?: string;
    constructor(props: TrainPathsGeneralInfoProps = {}) {
      super(props);
      this.trnpgeninfoSource = gavpfp("trnpgeninfoSource", props, `string`);
      this.trnpgeninfoImportType = gavpfp("trnpgeninfoImportType", props, `string`);
      this.trnpgeninfoAdministrativeYear = gavpfp(
        "trnpgeninfoAdministrativeYear",
        props,
        `string`
      );
    }
  }

  TrainPathsGeneralInfo.allChildClasses = getAllChildClasses(childClasses);

  return TrainPathsGeneralInfo;
}

export default TrainPathsGeneralInfoClassFactory;
