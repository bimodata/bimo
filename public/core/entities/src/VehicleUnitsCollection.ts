import { Entity } from "@bimo/core-utils-entity";
import { VehicleUnit, VehicleUnitProps } from "./VehicleUnit";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
const childClasses: (typeof Entity)[] = [VehicleUnit];

export interface VehicleUnitsCollectionProps
  extends ExtendedCollectionProps<VehicleUnit, VehicleUnitProps> {}

export class VehicleUnitsCollection extends Collection<VehicleUnit, VehicleUnitProps> {
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

export default VehicleUnitsCollection;
