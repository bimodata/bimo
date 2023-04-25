import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface SchedulingUnitRouteProps extends ExtendedItemProps {
  rteIdentifier?: string;
}

export class SchedulingUnitRoute extends Item<SchedulingUnitRoute> {
  rteIdentifier?: string;
  constructor(props: SchedulingUnitRouteProps) {
    super(props);
    this.rteIdentifier = gavpfp('rteIdentifier', props, `string`);
  }
}

export default SchedulingUnitRoute;
