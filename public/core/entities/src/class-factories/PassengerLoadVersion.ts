import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { PassengerLoadVersion as BimoPassengerLoadVersion, PassengerLoadTrip as BimoPassengerLoadTrip } from "../base-types/rawIndex";
export { PassengerLoadVersion as BimoPassengerLoadVersion } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { BimoPassengerLoadTripsCollection } from "./PassengerLoadTripsCollection";

export interface PassengerLoadVersionProps extends ExtendedItemProps {
  bimoId?: string;
  pldvIdentifier?: string;
  pldvDescription?: string;
  pldvDataGroup?: string;
  pldvOwner?: string;
  pldvPublicAccess?: string;
  pldvUserStamp?: string;
  passengerLoadTrips: BimoPassengerLoadTripsCollection;
}
export function PassengerLoadVersionClassFactory({
  PassengerLoadTripsCollection,
}: EntityConstructorByEntityClassKey): typeof BimoPassengerLoadVersion {
  const childClasses: (typeof Entity)[] = [PassengerLoadTripsCollection];

  class PassengerLoadVersion extends Item<PassengerLoadVersion> {
    bimoId?: string;
    pldvIdentifier?: string;
    pldvDescription?: string;
    pldvDataGroup?: string;
    pldvOwner?: string;
    pldvPublicAccess?: string;
    pldvUserStamp?: string;
    passengerLoadTrips: BimoPassengerLoadTripsCollection;
    constructor(props: PassengerLoadVersionProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props);
      this.pldvIdentifier = gavpfp(
        "pldvIdentifier",
        props,
        "string"
      );
      this.pldvDescription = gavpfp(
        "pldvDescription",
        props,
        "string"
      );
      this.pldvDataGroup = gavpfp("pldvDataGroup", props, "string");
      this.pldvOwner = gavpfp("pldvOwner", props, "string");
      this.pldvPublicAccess = gavpfp(
        "pldvPublicAccess",
        props,
        "string"
      );
      this.pldvUserStamp = gavpfp("pldvUserStamp", props, "string");

      this.passengerLoadTrips = gavpfp(
        "passengerLoadTrips",
        props,
        PassengerLoadTripsCollection,
        new PassengerLoadTripsCollection(),
        { altPropName: "passenger_load_trip", parent: this }
      );
    }

    get shortLoggingOutput() {
      return `${this.bimoId}: ${this.pldvIdentifier} - ${this.pldvDescription} (${this.pldvOwner})`;
    }

    addPassengerLoadTrip(pldt: BimoPassengerLoadTrip) {
      this.passengerLoadTrips.add(pldt);
    }

    removePassengerLoadTrip(pldt: BimoPassengerLoadTrip) {
      this.passengerLoadTrips.remove(pldt);
    }
  }

  PassengerLoadVersion.hastusKeywords = ["passenger_load_version"];
  PassengerLoadVersion.hastusObject = "passenger_load_version";

  PassengerLoadVersion.allChildClasses = getAllChildClasses(childClasses);

  return PassengerLoadVersion;
}

export default PassengerLoadVersionClassFactory;
