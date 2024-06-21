import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { CirculationPeriodsCollection } from "./CirculationPeriodsCollection";
import { CirculationPlanVehicleScheduleInfosCollection } from "./CirculationPlanVehicleScheduleInfosCollection";
export interface CirculationPlanProps extends ExtendedItemProps {
  bimoId?: string;
  cirpName?: string;
  cirpScenario?: string;
  cirpBooking?: string;
  cirpDescription?: string;
  cirpSchedulingUnit?: string;
  cirpServiceCtxId?: string;
  cirpCvtverId?: string;
  cirpProdPhase?: string;
  cirpOwner?: string;
  cirpPublicAccess?: string;
  cirpPrevCirpName?: string;
  cirpPrevCirpScenario?: string;
  cirpPrevCirpBooking?: string;
  cirpNextCirpName?: string;
  cirpNextCirpScenario?: string;
  cirpNextCirpBooking?: string;

  circulationPeriods?: CirculationPeriodsCollection;
  circulationPlanVehicleScheduleInfos?:CirculationPlanVehicleScheduleInfosCollection;
}
export declare class CirculationPlan extends Item<CirculationPlan> {
  bimoId?: string;
  cirpName?: string;
  cirpScenario?: string;
  cirpBooking?: string;
  cirpDescription?: string;
  cirpSchedulingUnit?: string;
  cirpServiceCtxId?: string;
  cirpCvtverId?: string;
  cirpProdPhase?: string;
  cirpOwner?: string;
  cirpPublicAccess?: string;
  cirpPrevCirpName?: string;
  cirpPrevCirpScenario?: string;
  cirpPrevCirpBooking?: string;
  cirpNextCirpName?: string;
  cirpNextCirpScenario?: string;
  cirpNextCirpBooking?: string;

  circulationPeriods?: CirculationPeriodsCollection;
  circulationPlanVehicleScheduleInfos?:CirculationPlanVehicleScheduleInfosCollection;
  constructor(props: CirculationPlanProps);
  get shortLoggingOutput(): string;
}
