import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { PortionWorking as BimoPortionWorking } from "../base-types/rawIndex";
export { PortionWorking as BimoPortionWorking } from "../base-types/rawIndex";
import { PortionWorkingVersion as BimoPortionWorkingVersion } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

const childClasses: (typeof Entity)[] = [];

export interface PortionWorkingProps extends ExtendedItemProps {
  bimoId?: string;
  pwrkRoutedTripId?: string;
  pwrkRoutingTripId?: string;
  pwrkStartPlace?: string;
  pwrkEndPlace?: string;
  pwrkRoutingTripAtTail?: string;
}

export function PortionWorkingClassFactory(
  entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey
): typeof BimoPortionWorking {
  class PortionWorking extends Item<PortionWorking> {
    bimoId?: string;
    pwrkRoutedTripId?: string;
    pwrkRoutingTripId?: string;
    pwrkStartPlace?: string;
    pwrkEndPlace?: string;
    pwrkRoutingTripAtTail?: string;
    constructor(props: PortionWorkingProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props);
      this.pwrkRoutedTripId = gavpfp("pwrkRoutedTripId", props, `string`);
      this.pwrkRoutingTripId = gavpfp("pwrkRoutingTripId", props, `string`);
      this.pwrkStartPlace = gavpfp("pwrkStartPlace", props, `string`);
      this.pwrkEndPlace = gavpfp("pwrkEndPlace", props, `string`);
      this.pwrkRoutingTripAtTail = gavpfp("pwrkRoutingTripAtTail", props, `string`, "0");
    }

    get portionWorkingVersion() {
      return this.parent && (this.parent.parent as BimoPortionWorkingVersion);
    }

    get shortLoggingOutput() {
      return `${this.pwrkRoutingTripId} & ${this.pwrkRoutedTripId} (${this.pwrkStartPlace} => ${this.pwrkEndPlace})`;
    }
  }

  PortionWorking.hastusKeywords = ["portion_working"];
  PortionWorking.hastusObject = "portion_working";

  PortionWorking.allChildClasses = getAllChildClasses(childClasses);

  return PortionWorking;
}

export default PortionWorkingClassFactory;
