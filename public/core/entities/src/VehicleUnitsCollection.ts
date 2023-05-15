import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VehicleUnitsCollection as BimoVehicleUnitsCollection } from "../base-types/rawIndex";
export { VehicleUnitsCollection as BimoVehicleUnitsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { BimoVehicleUnit, VehicleUnitProps } from "./VehicleUnit";

import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

export interface VehicleUnitsCollectionProps
  extends ExtendedCollectionProps<BimoVehicleUnit, VehicleUnitProps> {}

export function VehicleUnitsCollectionClassFactory({
  VehicleUnit,
}: EntityConstructorByEntityClassKey): typeof BimoVehicleUnitsCollection {
  const childClasses: (typeof Entity)[] = [VehicleUnit];
  class VehicleUnitsCollection extends Collection<BimoVehicleUnit, VehicleUnitProps> {
    constructor(props: VehicleUnitsCollectionProps = {}) {
      super({
        itemName: "VehicleUnit",
        ItemConstructor: VehicleUnit,
        idPropName: `vehuInternalNumber`,
        labelPropName: `vehuIdentifierUser`,
        ...props,
      });
    }
  }

  VehicleUnitsCollection.allChildClasses = getAllChildClasses(childClasses);

  return VehicleUnitsCollection;
}

export default VehicleUnitsCollectionClassFactory;
