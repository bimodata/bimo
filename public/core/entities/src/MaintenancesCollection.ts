import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Maintenance, MaintenanceProps } from "./Maintenance";

const childClasses = [Maintenance];


export interface MaintenancesCollectionProps extends ExtendedCollectionProps<Maintenance, MaintenanceProps> {
}

export class MaintenancesCollection extends Collection<Maintenance, MaintenanceProps> {
  constructor(props: MaintenancesCollectionProps = {}) {
    super({
      itemName: 'Maintenance',
      ItemConstructor: Maintenance,
      idPropName: `bimoId`,
      businessIdPropName: `mtnInternalNumber`,
      labelPropName: `mtnVehicleActivityId`,
      ...props,
    });
  }
}

MaintenancesCollection.allChildClasses = getAllChildClasses(childClasses);



export default MaintenancesCollection;
