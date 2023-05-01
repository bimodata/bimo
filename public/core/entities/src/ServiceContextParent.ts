import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface ServiceContextParentProps extends ExtendedItemProps {
  sctxName?: string;
}

export class ServiceContextParent extends Item<ServiceContextParent> {
  sctxName?: string;
  constructor(props: ServiceContextParentProps) {
    super(props);
    this.sctxName = gavpfp("sctxName", props, `string`, "Base");
  }
}

export default ServiceContextParent;
