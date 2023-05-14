import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VehicleStandbysCollection as BimoVehicleStandbysCollection } from "../base-types/rawIndex";
export { VehicleStandbysCollection as BimoVehicleStandbysCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoVehicleStandby, VehicleStandbyProps } from "./VehicleStandby";
import { BimoVehicleSchedule, VehicleScheduleProps } from "./VehicleSchedule";
export function VehicleStandbysCollectionClassFactory({
  VehicleStandby,
  VehicleSchedule,
}: EntityConstructorByEntityClassKey): typeof BimoVehicleStandbysCollection{
  
  const childClasses: (typeof Entity)[] = [VehicleStandby];
  
  export interface VehicleStandbysCollectionProps
  extends ExtendedCollectionProps<BimoVehicleStandby, VehicleStandbyProps> {}
  
 class VehicleStandbysCollection extends Collection<
    VehicleStandby,
    VehicleStandbyProps
  > {
    declare parent?: VehicleSchedule;
    constructor(props: VehicleStandbysCollectionProps = {}) {
      super({
        itemName: "VehicleStandby",
        ItemConstructor: VehicleStandby,
        idPropName: `bimoId`,
        businessIdPropName: `sdbyStandbyNo`,
        labelPropName: `sdbyComment`,
        ...props,
      });
    }
  }
  
  VehicleStandbysCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return VehicleStandbysCollection
}

export default VehicleStandbysCollectionClassFactory