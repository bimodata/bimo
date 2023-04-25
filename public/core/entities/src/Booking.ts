import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';



const childClasses = [];


export interface BookingProps extends ExtendedItemProps {
  bkIdentifier?: string;
  bkDescription?: string;
  bkDateStart?: string;
  bkDateEnd?: string;
  bkDataGroup?: string;
  bkTrainPathAdministrativeYear?: string;
}

export class Booking {
  bkIdentifier?: string;
  bkDescription?: string;
  bkDateStart?: string;
  bkDateEnd?: string;
  bkDataGroup?: string;
  bkTrainPathAdministrativeYear?: string;
  constructor(props: BookingProps) {
    this.bimoId = gavpfp('bimoId', props);
    /** */ this.bkIdentifier = gavpfp('bkIdentifier', props, `string`);
    /** */ this.bkDescription = gavpfp('bkDescription', props, `string`);
    /** */ this.bkDateStart = gavpfp('bkDateStart', props, `string`);
    /** */ this.bkDateEnd = gavpfp('bkDateEnd', props, `string`);
    /** */ this.bkDataGroup = gavpfp('bkDataGroup', props, `string`);
    /** */ this.bkTrainPathAdministrativeYear = gavpfp('bkTrainPathAdministrativeYear', props, `string`);
  }
}

Booking.hastusKeywords = ['booking'];
Booking.hastusObject = 'booking';


Booking.allChildClasses = getAllChildClasses(childClasses);



export default Booking;
