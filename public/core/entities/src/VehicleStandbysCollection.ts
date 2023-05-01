import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { VehicleStandby, VehicleStandbyProps } from "./VehicleStandby";

const childClasses = [VehicleStandby];

export interface VehicleStandbysCollectionProps
  extends ExtendedCollectionProps<VehicleStandby, VehicleStandbyProps> {}

export class VehicleStandbysCollection extends Collection<
  VehicleStandby,
  VehicleStandbyProps
> {
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
