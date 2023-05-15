import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { TrainPath, TrainPathProps } from "./TrainPath";
import { TrainPathsGeneralInfo } from "./TrainPathsGeneralInfo";
export interface TrainPathsCollectionProps
  extends ExtendedCollectionProps<TrainPath, TrainPathProps> {
  trainPathsGeneralInfo?: TrainPathsGeneralInfo;
}
export declare class TrainPathsCollection extends Collection<TrainPath, TrainPathProps> {
  trainPathsGeneralInfo: TrainPathsGeneralInfo;
  constructor(props?: TrainPathsCollectionProps);
  /**
   * @param {Object} oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
   */
  static createFromOirStyleData(oirStyleData: any): TrainPathsCollection;
  generateOirStyleData(): {
    general_information: TrainPathsGeneralInfo[];
    train_path: any[];
  };
}
