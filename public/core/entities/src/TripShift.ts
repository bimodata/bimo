const childClasses = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps, ExtendedItem } from "@bimo/core-utils-collection";

export interface TripShiftProps extends ExtendedItemProps {
  tripshiftTripNo: string;
  tripshiftActualShift?: string;
}

export class TripShift extends Item<TripShift> {
  tripshiftTripNo: string;
  tripshiftActualShift?: string;
  constructor(props: TripShiftProps) {
    super(props);
    this.tripshiftTripNo = gavpfp("tripshiftTripNo", props);
    this.tripshiftActualShift = gavpfp("tripshiftActualShift", props);
  }
}

TripShift.hastusKeywords = ["trip_shift"];
TripShift.hastusObject = "trip_shift";

TripShift.allChildClasses = getAllChildClasses(childClasses);

export default TripShift;
