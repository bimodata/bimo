


const childClasses = [];
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';


export interface TripTpProps extends ExtendedItemProps {
  ttpPassingTime?: string;
  ttpRunTimeDiff?: string;
  ttpSkipped?: string;
  ttpNote?: string;
  ttpDistance?: string;
  ttpIsPublic?: string;
  ttpHoldTime?: string;
  ttpHoldType?: string;
  ttpIsLoading?: string;
}

export class TripTp {
  ttpPassingTime?: string;
  ttpRunTimeDiff?: string;
  ttpSkipped?: string;
  ttpNote?: string;
  ttpDistance?: string;
  ttpIsPublic?: string;
  ttpHoldTime?: string;
  ttpHoldType?: string;
  ttpIsLoading?: string;
  constructor(props: TripTpProps) {
    /** */ this.ttpPlace = gavpfp('ttpPlace', props);
    /** */ this.ttpPassingTime = gavpfp('ttpPassingTime', props);
    /** */ this.ttpRunTimeDiff = gavpfp('ttpRunTimeDiff', props);
    /** */ this.ttpSkipped = gavpfp('ttpSkipped', props);
    /** */ this.ttpNote = gavpfp('ttpNote', props);
    /** */ this.ttpDistance = gavpfp('ttpDistance', props);
    /** */ this.ttpIsPublic = gavpfp('ttpIsPublic', props);
    /** */ this.ttpHoldTime = gavpfp('ttpHoldTime', props);
    /** */ this.ttpHoldType = gavpfp('ttpHoldType', props);
    /** */ this.ttpIsLoading = gavpfp('ttpIsLoading', props);

    /* Children */

    /* Links */
  }
}

TripTp.hastusKeywords = ['trip_tp'];
TripTp.hastusObject = 'trip_tp';


TripTp.allChildClasses = getAllChildClasses(childClasses);



export default TripTp;
