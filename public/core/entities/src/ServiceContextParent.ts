import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceContextParent as BimoServiceContextParent } from "../base-types/rawIndex";
export { ServiceContextParent as BimoServiceContextParent } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface ServiceContextParentProps extends ExtendedItemProps {
  sctxName?: string;
}

export function ServiceContextParentClassFactory(entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey): typeof BimoServiceContextParent{
 class ServiceContextParent extends Item<ServiceContextParent> {
    sctxName?: string;
    constructor(props: ServiceContextParentProps) {
      super(props);
      this.sctxName = gavpfp("sctxName", props, `string`, "Base");
    }
  }
  
  return ServiceContextParent
}

export default ServiceContextParentClassFactory