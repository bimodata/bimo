


const childClasses = [];
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';


export interface TripvehgrpspecProps extends ExtendedItemProps {
  tripvehgrpspecReqType?: string;
  tripvehgrpspecPriority?: string;
}

export class Tripvehgrpspec {
  tripvehgrpspecReqType?: string;
  tripvehgrpspecPriority?: string;
  constructor(props: TripvehgrpspecProps) {
    /** */ this.tripvehgrpspecVehGroup = gavpfp('tripvehgrpspecVehGroup', props);
    /** */ this.tripvehgrpspecReqType = gavpfp('tripvehgrpspecReqType', props);
    /** */ this.tripvehgrpspecPriority = gavpfp('tripvehgrpspecPriority', props);

    /* Children */

    /* Links */
  }
}

Tripvehgrpspec.hastusKeywords = ['tripvehgroupspec'];
Tripvehgrpspec.hastusObject = 'tripvehgrpspec';


Tripvehgrpspec.allChildClasses = getAllChildClasses(childClasses);



export default Tripvehgrpspec;
