import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { PassengerLoadTrip as BimoPassengerLoadTrip } from "../base-types/rawIndex";
export { PassengerLoadTrip as BimoPassengerLoadTrip } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface PassengerLoadTripProps extends ExtendedItemProps {
  bimoId?: string;
  pldtTrip?: string;
  pldtTotalLoad?: string;
  pldtStartTime?: string;
  pldtRoute?: string;
  pldtPlace?: string;
  pldtVersion?: string;
  pldtFirstClassLoad?: string;
  pldtEndTime?: string;
  pldtDirection?: string;
}

export function PassengerLoadTripClassFactory(
  entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey
): typeof BimoPassengerLoadTrip {
  class PassengerLoadTrip extends Item<PassengerLoadTrip> {
    bimoId?: string;
    pldtTrip?: string;
    pldtTotalLoad?: string;
    pldtStartTime?: string;
    pldtRoute?: string;
    pldtPlace?: string;
    pldtVersion?: string;
    pldtFirstClassLoad?: string;
    pldtEndTime?: string;
    pldtDirection?: string;
    constructor(props: PassengerLoadTripProps) {
      super(props);

      this.bimoId = gavpfp("bimoId", props);
      this.pldtTrip = gavpfp("pldtTrip", props, "string");
      this.pldtTotalLoad = gavpfp("pldtTotalLoad", props, "string");
      this.pldtStartTime = gavpfp("pldtStartTime", props, "string");
      this.pldtRoute = gavpfp("pldtRoute", props, "string");
      this.pldtPlace = gavpfp("pldtPlace", props, "string");
      this.pldtVersion = gavpfp("pldtVersion", props, "string");
      this.pldtFirstClassLoad = gavpfp("pldtFirstClassLoad", props, "string");
      this.pldtEndTime = gavpfp("pldtEndTime", props, "string");
      this.pldtDirection = gavpfp("pldtDirection", props, "string");
    }

    get shortLoggingOutput() {
      return `${this.pldtTrip} - ${this.pldtPlace} -  ${this.pldtTotalLoad}`;
    }
  }

  PassengerLoadTrip.hastusKeywords = ["passenger_load_trip"];
  PassengerLoadTrip.hastusObject = "passenger_load_trip";

  /* Serialization utilities */
  PassengerLoadTrip.allChildClasses = getAllChildClasses(childClasses);

  return PassengerLoadTrip;
}

export default PassengerLoadTripClassFactory;
