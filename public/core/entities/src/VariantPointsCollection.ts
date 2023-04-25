import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { VariantPoint, VariantPointProps } from "./VariantPoint";

const childClasses = [VariantPoint];



export interface VariantPointsCollectionProps extends ExtendedCollectionProps<VariantPoint, VariantPointProps> {
}

export class VariantPointsCollection extends Collection<VariantPoint, VariantPointProps> {
  constructor(props: VariantPointsCollectionProps = {}) {
    super({
      itemName: 'VariantPoint',
      ItemConstructor: VariantPoint,
      items: props.items,
      parent: props.parent,
      associationType: props.associationType,
    });
  }

  get mediumLoggingOutput() {
    return this.map((varPt) => `${varPt.varptPlace}${varPt.varptNoStopping === '1' ? '~' : '|'}`).join('');
  }

  get longLoggingOutput() {
    return this.map((varPt) => varPt.shortLoggingOutput).join('\n');
  }
}


VariantPointsCollection.allChildClasses = getAllChildClasses(childClasses);



export default VariantPointsCollection;
