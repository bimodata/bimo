import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { TrainPath as BimoTrainPath } from "../base-types/rawIndex";
export { TrainPath as BimoTrainPath } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoTrainPathVariantsCollection } from "./TrainPathVariantsCollection";

export interface TrainPathProps extends ExtendedItemProps {
  trnpIdentifier: string;
  trnpRoute?: string;
  trnpIsInService?: string;
  trainPathVariants?: BimoTrainPathVariantsCollection;
}

export function TrainPathClassFactory({
  TrainPathVariantsCollection,
}: EntityConstructorByEntityClassKey): typeof BimoTrainPath {
  const childClasses: (typeof Entity)[] = [TrainPathVariantsCollection];

  class TrainPath extends Item<TrainPath> {
    trnpIdentifier: string;
    trnpRoute?: string;
    trnpIsInService?: string;
    trainPathVariants: BimoTrainPathVariantsCollection;
    constructor(props: TrainPathProps) {
      super(props);
      this.trnpIdentifier = gavpfp("trnpIdentifier", props, `string`);
      this.trnpRoute = gavpfp("trnpRoute", props, `string`);
      this.trnpIsInService = gavpfp("trnpIsInService", props, `string`);
      this.trainPathVariants = gavpfp(
        "trainPathVariants",
        props,
        TrainPathVariantsCollection,
        new TrainPathVariantsCollection(),
        { altPropName: "train_path_variant", parent: this }
      );
    }

    get shortLoggingOutput() {
      return `${this.trnpIdentifier}-(${this.trnpRoute}|${this.trnpIsInService})`;
    }
  }

  TrainPath.allChildClasses = getAllChildClasses(childClasses);

  return TrainPath;
}

export default TrainPathClassFactory;
