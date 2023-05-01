import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

const childClasses = [];

export interface TrainPathsGeneralInfoProps extends ExtendedItemProps {
  trnpgeninfoSource?: string;
  trnpgeninfoImportType?: string;
  trnpgeninfoAdministrativeYear?: string;
}

export class TrainPathsGeneralInfo extends Item<TrainPathsGeneralInfo> {
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

export default TrainPathsGeneralInfo;
