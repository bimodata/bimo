import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { SchedulingUnitRoute as BimoSchedulingUnitRoute } from "../base-types/rawIndex";
export { SchedulingUnitRoute as BimoSchedulingUnitRoute } from "../base-types/rawIndex";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface SchedulingUnitRouteProps extends ExtendedItemProps {
  rteIdentifier?: string;
}

export function SchedulingUnitRouteClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoSchedulingUnitRoute {
  class SchedulingUnitRoute extends Item<SchedulingUnitRoute> {
    rteIdentifier?: string;
    constructor(props: SchedulingUnitRouteProps) {
      super(props);
      this.rteIdentifier = gavpfp("rteIdentifier", props, `string`);
    }
  }

  return SchedulingUnitRoute;
}

export default SchedulingUnitRouteClassFactory;
