import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceEvolution as BimoServiceEvolution } from "../base-types/rawIndex";
export { ServiceEvolution as BimoServiceEvolution } from "../base-types/rawIndex";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

export interface ServiceEvolutionProps extends ExtendedItemProps {
  sevoStartDate?: string;
  sevoDisplayName?: string;
  sevoDescription?: string;
  sevoComment?: string;
  sevoDatetimeStamp?: string;
  sevoUserStamp?: string;
}

export function ServiceEvolutionClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoServiceEvolution {
  class ServiceEvolution extends Item<ServiceEvolution> {
    sevoStartDate?: string;
    sevoDisplayName?: string;
    sevoDescription?: string;
    sevoComment?: string;
    sevoDatetimeStamp?: string;
    sevoUserStamp?: string;
    constructor(props: ServiceEvolutionProps) {
      super(props);
      this.sevoStartDate = gavpfp("sevoStartDate", props, `string`);
      this.sevoDisplayName = gavpfp("sevoDisplayName", props, `string`);
      this.sevoDescription = gavpfp("sevoDescription", props, `string`);
      this.sevoComment = gavpfp("sevoComment", props);
      this.sevoDatetimeStamp = gavpfp("sevoDatetimeStamp", props, `string`);
      this.sevoUserStamp = gavpfp("sevoUserStamp", props, "string");
    }
  }

  return ServiceEvolution;
}

export default ServiceEvolutionClassFactory;
