import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";

export interface TripvehgrpspecProps extends ExtendedItemProps {
  tripvehgrpspecVehGroup: string;
  tripvehgrpspecReqType?: string;
  tripvehgrpspecPriority?: string;
}

export class Tripvehgrpspec extends Item<Tripvehgrpspec> {
  tripvehgrpspecVehGroup: string;
  tripvehgrpspecReqType?: string;
  tripvehgrpspecPriority?: string;
  constructor(props: TripvehgrpspecProps) {
    super(props);
    this.tripvehgrpspecVehGroup = gavpfp("tripvehgrpspecVehGroup", props);
    this.tripvehgrpspecReqType = gavpfp("tripvehgrpspecReqType", props);
    this.tripvehgrpspecPriority = gavpfp("tripvehgrpspecPriority", props);
  }
}

Tripvehgrpspec.hastusKeywords = ["tripvehgroupspec"];
Tripvehgrpspec.hastusObject = "tripvehgrpspec";

Tripvehgrpspec.allChildClasses = getAllChildClasses(childClasses);

export default Tripvehgrpspec;
