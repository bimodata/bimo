import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";

import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { TrainPath, TrainPathProps } from "./TrainPath";
import {
  TrainPathsGeneralInfo,
  TrainPathsGeneralInfoProps,
} from "./TrainPathsGeneralInfo";

const childClasses = [TrainPath, TrainPathsGeneralInfo];

export interface TrainPathsCollectionProps
  extends ExtendedCollectionProps<TrainPath, TrainPathProps> {
  trainPathsGeneralInfo?: TrainPathsGeneralInfo;
}

export class TrainPathsCollection extends Collection<TrainPath, TrainPathProps> {
  trainPathsGeneralInfo: TrainPathsGeneralInfo;
  constructor(props: TrainPathsCollectionProps = {}) {
    super({
      itemName: "TrainPath",
      ItemConstructor: TrainPath,
      associationType: "aggregation",
      businessIdPropName: "trnpIdentifier",
      ...props,
    });

    this.trainPathsGeneralInfo = gavpfp(
      "trainPathsGeneralInfo",
      props,
      TrainPathsGeneralInfo,
      new TrainPathsGeneralInfo(),
      { altPropName: "trnpgeninfo", parent: this }
    );
  }

  /**
   * @param {Object} oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
   */
  static createFromOirStyleData(oirStyleData: any) {
    const rawGeneralInfos = oirStyleData.train_path_general_information;
    const rawTrainPaths = oirStyleData.train_path;

    if (!rawGeneralInfos || !rawTrainPaths) {
      throw new Error(
        `Bad oirStyleData: could not find "train_path_general_information" or "train_path" key`
      );
    }
    if (rawGeneralInfos.length !== 1) {
      throw new Error(
        `Bad oirStyleData: there should be exactly one trainPathGeneralInfo line. Got ${rawGeneralInfos.length}`
      );
    }

    const newTrainPathsCollection = new TrainPathsCollection({
      trainPathsGeneralInfo: rawGeneralInfos[0],
      items: rawTrainPaths,
    });

    return newTrainPathsCollection;
  }

  /* eslint-disable camelcase */
  /* eslint-disable no-param-reassign */
  generateOirStyleData() {
    const train_path = this.map((trainPath) => {
      //@ts-ignore
      trainPath.train_path_variant = trainPath.trainPathVariants.map(
        (trainPathVariant) => {
          //@ts-ignore
          trainPathVariant.train_path_variant_point =
            trainPathVariant.trainPathVariantPoints &&
            trainPathVariant.trainPathVariantPoints.items;
          //@ts-ignore
          trainPathVariant.train_path_variant_date =
            trainPathVariant.trainPathVariantDates &&
            trainPathVariant.trainPathVariantDates.items;
          return trainPathVariant;
        }
      );
      return trainPath;
    });
    const general_information = [this.trainPathsGeneralInfo];
    return { general_information, train_path };
  }
}

TrainPathsCollection.allChildClasses = getAllChildClasses(childClasses);

export default TrainPathsCollection;
