import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VariantPointsCollection as BimoVariantPointsCollection } from "../base-types/rawIndex";
export { VariantPointsCollection as BimoVariantPointsCollection } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { BimoVariantPoint, VariantPointProps } from "./VariantPoint";
export function VariantPointsCollectionClassFactory({
  VariantPoint,
}: EntityConstructorByEntityClassKey): typeof BimoVariantPointsCollection{
  
  const childClasses: (typeof Entity)[] = [VariantPoint];
  
  export interface VariantPointsCollectionProps
  extends ExtendedCollectionProps<BimoVariantPoint, VariantPointProps> {}
  
 class VariantPointsCollection extends Collection<BimoVariantPoint, VariantPointProps> {
    constructor(props: VariantPointsCollectionProps = {}) {
      super({
        itemName: "VariantPoint",
        ItemConstructor: VariantPoint,
        items: props.items,
        parent: props.parent,
        associationType: props.associationType,
      });
    }
  
    get mediumLoggingOutput() {
      return this.map(
        (varPt) => `${varPt.varptPlace}${varPt.varptNoStopping === "1" ? "~" : "|"}`
      ).join("");
    }
  
    get longLoggingOutput() {
      return this.map((varPt) => varPt.shortLoggingOutput).join("\n");
    }
  }
  
  VariantPointsCollection.allChildClasses = getAllChildClasses(childClasses);
  
  return VariantPointsCollection
}

export default VariantPointsCollectionClassFactory