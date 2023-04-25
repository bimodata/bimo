import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { SchedulingUnitRoutesCollection, SchedulingUnitRoutesCollectionProps } from "./SchedulingUnitRoutesCollection";

const childClasses = [SchedulingUnitRoutesCollection];

export interface SchedulingUnitProps extends ExtendedItemProps {
  scuIdentifier?: string;
  scuType?: string;
  scuDescription?: string;
  scuOwner?: string;
  scuDataGroup?: string;
  scuPublicAccess?: string;
  schedulingUnitRoutes?: string;
}

export class SchedulingUnit extends Item<SchedulingUnit> {
  scuIdentifier?: string;
  scuType?: string;
  scuDescription?: string;
  scuOwner?: string;
  scuDataGroup?: string;
  scuPublicAccess?: string;
  schedulingUnitRoutes?: string;
  constructor(props: SchedulingUnitProps) {
    super(props);
    this.scuIdentifier = gavpfp('scuIdentifier', props, `string`);
    this.scuType = gavpfp('scuType', props, `string`, '1100');
    this.scuDescription = gavpfp('scuDescription', props, `string`, 'Générée par Lauritz');
    this.scuOwner = gavpfp('scuOwner', props, `string`, 'ADMIN');
    this.scuDataGroup = gavpfp('scuDataGroup', props, `string`, '');
    this.scuPublicAccess = gavpfp('scuPublicAccess', props, `string`, '1');

    /* Children */
    /** @type {SchedulingUnitRoutesCollection} */
    this.schedulingUnitRoutes = gavpfp(
      'schedUnitRoute', props,
      SchedulingUnitRoutesCollection,
      new SchedulingUnitRoutesCollection(),
      { altPropName: 'sched_unit_route', parent: this },
    );
  }

  get shortLoggingOutput() {
    return `${this.scuIdentifier} - ${this.scuDescription} - ${this.scuType}`;
  }
}

SchedulingUnit.hastusKeywords = ['scheduling_unit'];
SchedulingUnit.hastusObject = 'scheduling_unit';

SchedulingUnit.allChildClasses = getAllChildClasses(childClasses);



export default SchedulingUnit;
