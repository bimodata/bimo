import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { CirculationPlan as BimoCirculationPlan } from "../base-types/rawIndex";
export { CirculationPlan as BimoCirculationPlan } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { BimoCirculationPeriodsCollection } from "./CirculationPeriodsCollection";
import { BimoCirculationPlanVehicleScheduleInfosCollection } from "./CirculationPlanVehicleScheduleInfosCollection";

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
  circulationPeriods?: BimoCirculationPeriodsCollection;
  circulationPlanVehicleScheduleInfos?:BimoCirculationPlanVehicleScheduleInfosCollection;
}
export function CirculationPlanClassFactory({
  CirculationPeriodsCollection,
  CirculationPlanVehicleScheduleInfosCollection,
}: EntityConstructorByEntityClassKey): typeof BimoCirculationPlan {
  const childClasses: (typeof Entity)[] = [CirculationPeriodsCollection, CirculationPlanVehicleScheduleInfosCollection];

  class CirculationPlan extends Item<CirculationPlan> {
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

    circulationPeriods?: BimoCirculationPeriodsCollection;
    circulationPlanVehicleScheduleInfos?:BimoCirculationPlanVehicleScheduleInfosCollection;

    constructor(props: CirculationPlanProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props);
      this.cirpName = gavpfp("cirpName", props, `string`);
      this.cirpScenario = gavpfp("cirpScenario", props, `string`);
      this.cirpBooking = gavpfp("cirpBooking", props, `string`);
      this.cirpDescription = gavpfp("cirpDescription", props, `string`);
      this.cirpSchedulingUnit = gavpfp("cirpSchedulingUnit", props, `string`);
      this.cirpServiceCtxId = gavpfp("cirpServiceCtxId", props, `string`);
      this.cirpCvtverId = gavpfp("cirpCvtverId", props, `string`);
      this.cirpProdPhase = gavpfp("cirpProdPhase", props, `string`);
      this.cirpOwner = gavpfp("cirpOwner", props, `string`);
      this.cirpPublicAccess = gavpfp("cirpPublicAccess", props, `string`);
      this.cirpPrevCirpName = gavpfp("cirpPrevCirpName", props, `string`);
      this.cirpPrevCirpScenario = gavpfp("cirpPrevCirpScenario", props, `string`);
      this.cirpPrevCirpBooking = gavpfp("cirpPrevCirpBooking", props, `string`);
      this.cirpNextCirpName = gavpfp("cirpNextCirpName", props, `string`);
      this.cirpNextCirpScenario = gavpfp("cirpNextCirpScenario", props, `string`);
      this.cirpNextCirpBooking = gavpfp("cirpNextCirpBooking", props, `string`);
      this.circulationPeriods = gavpfp(
        "circulationPeriods",
        props,
        CirculationPeriodsCollection,
        new CirculationPeriodsCollection(),
        { altPropName: "circulation_period", parent: this }
      );
      this.circulationPlanVehicleScheduleInfos = gavpfp(
        "circulationPlanVehicleScheduleInfos",
        props,
        CirculationPlanVehicleScheduleInfosCollection,
        new CirculationPlanVehicleScheduleInfosCollection(),
        { altPropName: "circulation_plan_vehicle_schedule_info", parent: this }
      );
    }

    get shortLoggingOutput() {
      return `${this.cirpName} - ${this.cirpScenario}`;
    }
  }

  CirculationPlan.hastusKeywords = ["circulation_plan"];
  CirculationPlan.hastusObject = "circulation_plan";

  CirculationPlan.allChildClasses = getAllChildClasses(childClasses);

  return CirculationPlan;
}

export default CirculationPlanClassFactory;
