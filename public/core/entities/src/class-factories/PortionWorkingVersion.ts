import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { PortionWorkingVersion as BimoPortionWorkingVersion } from "../base-types/rawIndex";
export { PortionWorkingVersion as BimoPortionWorkingVersion } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { BimoPortionWorkingsCollection } from "./PortionWorkingsCollection";

export interface PortionWorkingVersionProps extends ExtendedItemProps {
  bimoId?: string;
  pwrkvIdentifier?: string;
  pwrkvDescription?: string;
  pwrkvOwner?: string;
  pwrkvPublicAccess?: string;
  portionWorkings?: BimoPortionWorkingsCollection;
}
export function PortionWorkingVersionClassFactory({
  PortionWorkingsCollection,
}: EntityConstructorByEntityClassKey): typeof BimoPortionWorkingVersion {
  const childClasses: (typeof Entity)[] = [PortionWorkingsCollection];

  class PortionWorkingVersion extends Item<PortionWorkingVersion> {
    bimoId?: string;
    pwrkvIdentifier?: string;
    pwrkvDescription?: string;
    pwrkvOwner?: string;
    pwrkvPublicAccess?: string;
    portionWorkings?: BimoPortionWorkingsCollection;
    constructor(props: PortionWorkingVersionProps) {
      super(props);
      /** We can't use rtevIdentifier: it has a functional meaning */
      this.bimoId = gavpfp("bimoId", props);

      this.pwrkvIdentifier = gavpfp("pwrkvIdentifier", props, `string`);
      this.pwrkvDescription = gavpfp("pwrkvDescription", props, `string`);
      this.pwrkvOwner = gavpfp("pwrkvOwner", props, `string`, "ADMIN");
      this.pwrkvPublicAccess = gavpfp("pwrkvPublicAccess", props, `string`, "0");

      this.portionWorkings = gavpfp(
        "portionWorkings",
        props,
        PortionWorkingsCollection,
        new PortionWorkingsCollection(),
        { altPropName: "portion_working", parent: this }
      );
    }

    get shortLoggingOutput() {
      return `${this.pwrkvIdentifier} - ${this.pwrkvDescription}`;
    }
  }

  PortionWorkingVersion.hastusKeywords = ["portion_working_version"];
  PortionWorkingVersion.hastusObject = "portion_working_version";

  PortionWorkingVersion.allChildClasses = getAllChildClasses(childClasses);

  return PortionWorkingVersion;
}

export default PortionWorkingVersionClassFactory;
