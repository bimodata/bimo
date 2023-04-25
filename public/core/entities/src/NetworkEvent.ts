


const childClasses = [];
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';


export interface NetworkEventProps extends ExtendedItemProps {
}

export class NetworkEvent {
  constructor(props: NetworkEventProps) {
    /** */ this.nevtIdentifier = gavpfp('nevtIdentifier', props);

    /* Children */

    /* Links */
  }
}

NetworkEvent.hastusKeywords = ['network_event'];
NetworkEvent.hastusObject = 'network_event';


NetworkEvent.allChildClasses = getAllChildClasses(childClasses);



export default NetworkEvent;
