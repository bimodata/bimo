import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface TrainPathsGeneralInfoProps extends ExtendedItemProps {
    trnpgeninfoSource?: string;
    trnpgeninfoImportType?: string;
    trnpgeninfoAdministrativeYear?: string;
}
export declare class TrainPathsGeneralInfo extends Item<TrainPathsGeneralInfo> {
    trnpgeninfoSource?: string;
    trnpgeninfoImportType?: string;
    trnpgeninfoAdministrativeYear?: string;
    constructor(props?: TrainPathsGeneralInfoProps);
}
export default TrainPathsGeneralInfo;
