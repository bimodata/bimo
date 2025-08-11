import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { MaintenancesCollection as BimoMaintenancesCollection, VehicleSchedule as BimoVehicleSchedule,
  Maintenance as BimoMaintenance
  } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { MaintenanceProps } from "./Maintenance";

export interface MaintenancesCollectionProps
  extends ExtendedCollectionProps<BimoMaintenance, MaintenanceProps> {}

export function MaintenancesCollectionClassFactory({
  Maintenance,
}: EntityConstructorByEntityClassKey): typeof BimoMaintenancesCollection {
  const childClasses: (typeof Entity)[] = [Maintenance];

  class MaintenancesCollection extends Collection<BimoMaintenance, MaintenanceProps> {
    declare parent?: BimoVehicleSchedule;
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

  return MaintenancesCollection;
}

export default MaintenancesCollectionClassFactory;
