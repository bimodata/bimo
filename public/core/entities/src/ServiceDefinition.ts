import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { SdefSchedulingUnitsCollection, SdefSchedulingUnitsCollectionProps } from "./SdefSchedulingUnitsCollection";

const childClasses = [SdefSchedulingUnitsCollection];

export interface ServiceDefinitionProps extends ExtendedItemProps {
  sdefIdentifier?: string;
  sdefDescription?: string;
  sdefOwner?: string;
  sdefDataGroup?: string;
  sdefPublicAccess?: string;
  schedulingUnits?: string;
}

export class ServiceDefinition extends Item<ServiceDefinition> {
  sdefIdentifier?: string;
  sdefDescription?: string;
  sdefOwner?: string;
  sdefDataGroup?: string;
  sdefPublicAccess?: string;
  schedulingUnits?: string;
  constructor(props: ServiceDefinitionProps) {
    super(props);
    this.sdefIdentifier = gavpfp('sdefIdentifier', props, `string`);
    this.sdefDescription = gavpfp('sdefDescription', props, `string`, 'Générée par Lauritz');
    this.sdefOwner = gavpfp('sdefOwner', props, `string`, 'ADMIN');
    this.sdefDataGroup = gavpfp('sdefDataGroup', props, `string`);
    this.sdefPublicAccess = gavpfp('sdefPublicAccess', props, `string`, '1');

    /* Children */
    /** @type {SdefSchedulingUnitsCollection} */
    this.schedulingUnits = gavpfp(
      'sdefSchedulingUnit', props,
      SdefSchedulingUnitsCollection,
      new SdefSchedulingUnitsCollection(),
      { altPropName: 'sdef_scheduling_unit', parent: this },
    );
  }

  get shortLoggingOutput() {
    return `${this.sdefIdentifier} - ${this.sdefDescription}`;
  }
}

ServiceDefinition.hastusKeywords = ['service_definition'];
ServiceDefinition.hastusObject = 'service_definition';

ServiceDefinition.allChildClasses = getAllChildClasses(childClasses);



export default ServiceDefinition;
