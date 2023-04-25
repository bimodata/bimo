import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { TrainPathVariantsCollection, TrainPathVariantsCollectionProps } from "./TrainPathVariantsCollection";

const childClasses = [TrainPathVariantsCollection];

export interface TrainPathProps extends ExtendedItemProps {
  trnpIdentifier?: string;
}

export class TrainPath extends Item<TrainPath> {
  trnpIdentifier?: string;
  constructor(props: TrainPathProps) {
    super(props);

    this.trnpIdentifier = gavpfp('trnpIdentifier', props, `string`);
    if (!this.trnpIdentifier) {
      throw new Error('Pas de nom de sillon');
    }
    this.trnpRoute = gavpfp('trnpRoute', props, `string`);
    this.trnpIsInService = gavpfp('trnpIsInService', props, `string`);

    /* Children */
    /** @type {TrainPathVariantsCollection} */
    this.trainPathVariants = gavpfp(
      'trainPathVariants', props,
      TrainPathVariantsCollection,
      new TrainPathVariantsCollection(),
      { altPropName: 'train_path_variant', parent: this },
    );
  }

  get shortLoggingOutput() {
    return `${this.trnpIdentifier}-(${this.trnpRoute}|${this.trnpIsInService})`;
  }
}

TrainPath.allChildClasses = getAllChildClasses(childClasses);



export default TrainPath;
