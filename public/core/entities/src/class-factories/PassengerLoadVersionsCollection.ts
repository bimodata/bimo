import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { PassengerLoadVersionsCollection as BimoPassengerLoadVersionsCollection } from "../base-types/rawIndex";
export { PassengerLoadVersionsCollection as BimoPassengerLoadVersionsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import {
  BimoPassengerLoadVersion,
  PassengerLoadVersionProps,
} from "./PassengerLoadVersion";

export interface PassengerLoadVersionsCollectionProps
  extends ExtendedCollectionProps<
    BimoPassengerLoadVersion,
    PassengerLoadVersionProps
  > {}

export function PassengerLoadVersionsCollectionClassFactory({
  PassengerLoadVersion,
}: EntityConstructorByEntityClassKey): typeof BimoPassengerLoadVersionsCollection {
  const childClasses: (typeof Entity)[] = [PassengerLoadVersion];

  class PassengerLoadVersionsCollection extends Collection<
    BimoPassengerLoadVersion,
    PassengerLoadVersionProps
  > {
    constructor(props: PassengerLoadVersionsCollectionProps = {}) {
      super({
        itemName: 'PassengerLoadVersion', 
        ItemConstructor: PassengerLoadVersion, 
        associationType: 'aggregation',
        idPropName: `bimoId`,
        businessIdPropName: 'pldvIdentifier',
        labelPropName: `pldvIdentifier`,
        ...props,
      });
    }

    get shortLoggingOutput() {
      return `${this.label} - (${this.count()} pldvs)`;
    }
    
    /**
     * @param oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
     */
    static createFromOirStyleData(oirStyleData: any) {
      const rawPassengerLoadVersions = oirStyleData.passenger_load_version;

      if (!rawPassengerLoadVersions) {
        throw new Error(`Bad oirStyleData: could not find "passenger_load_version" key`);
      }
      const newPassengerLoadVersionsCollection = new PassengerLoadVersionsCollection({
        items: rawPassengerLoadVersions,
      });

      return newPassengerLoadVersionsCollection;
    }

    generateOirStyleData() {
      return {
        passenger_load_version: this.map((passengerLoadVersion) => ({
          ...passengerLoadVersion,
          passenger_load_trip: passengerLoadVersion.passengerLoadTrips,
        })),
      };
    }
  }

  PassengerLoadVersionsCollection.allChildClasses = getAllChildClasses(childClasses);

  return PassengerLoadVersionsCollection;
}

export default PassengerLoadVersionsCollectionClassFactory;



