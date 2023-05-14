import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { MaintenancesCollection as BimoMaintenancesCollection } from "../base-types/rawIndex";
export { MaintenancesCollection as BimoMaintenancesCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoMaintenance, MaintenanceProps } from "./Maintenance";
import { BimoVehicleSchedule, VehicleScheduleProps } from "./VehicleSchedule";
export function MaintenancesCollectionClassFactory({
  Maintenance,
  VehicleSchedule,
}: EntityConstructorByEntityClassKey): typeof BimoMaintenancesCollection{
  
  const childClasses: (typeof Entity)[] = [Maintenance];
  
  export interface MaintenancesCollectionProps
  extends ExtendedCollectionProps<BimoMaintenance, MaintenanceProps> {}
  
 class MaintenancesCollection extends Collection<BimoMaintenance, MaintenanceProps> {
    declare parent?: VehicleSchedule;
    constructor(props: MaintenancesCollectionProps = {}) {
      super({
        itemName: "Maintenance",
        ItemConstructor: Maintenance,
        idPropName: `bimoId`,
        businessIdPropName: `mtnInternalNumber`,
        labelPropName: `mtnVehicleActivityId`,
        ...props,
      });
    }
  }
  
  MaintenancesCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return MaintenancesCollection
}

export default MaintenancesCollectionClassFactory