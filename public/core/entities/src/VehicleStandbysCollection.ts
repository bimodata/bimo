import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { VehicleStandby, VehicleStandbyProps } from "./VehicleStandby";
import { VehicleSchedule } from "./VehicleSchedule";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [VehicleStandby];

export interface VehicleStandbysCollectionProps
  extends ExtendedCollectionProps<VehicleStandby, VehicleStandbyProps> {}

export class VehicleStandbysCollection extends Collection<
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

export default VehicleStandbysCollection;
