


const childClasses = [];
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';


export interface TripShiftProps extends ExtendedItemProps {
  tripshiftActualShift?: string;
}

export class TripShift {
  tripshiftActualShift?: string;
  constructor(props: TripShiftProps) {
    /** */ this.tripshiftTripNo = gavpfp('tripshiftTripNo', props);
    /** */ this.tripshiftActualShift = gavpfp('tripshiftActualShift', props);

    /* Children */

    /* Links */
  }
}

TripShift.hastusKeywords = ['trip_shift'];
TripShift.hastusObject = 'trip_shift';


TripShift.allChildClasses = getAllChildClasses(childClasses);



export default TripShift;
