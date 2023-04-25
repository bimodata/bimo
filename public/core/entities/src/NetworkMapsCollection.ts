import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { NetworkMap, NetworkMapProps } from "./NetworkMap";

const childClasses = [NetworkMap];


export interface NetworkMapsCollectionProps extends ExtendedCollectionProps<NetworkMap, NetworkMapProps> {
}

export class NetworkMapsCollection extends Collection<NetworkMap, NetworkMapProps> {
  /**
   *
   * @param {Object} props
   * @param {string} props.label
   */
  constructor(props: NetworkMapsCollectionProps = {}) {
    super({
      itemName: 'NetworkMap',
      ItemConstructor: NetworkMap,
      idPropName: 'bimoId',
      businessIdPropName: 'businessId',
      labelPropName: 'label',
      associationType: 'aggregation',
      ...props,
    });
  }
}

NetworkMapsCollection.allChildClasses = getAllChildClasses(childClasses);



export default NetworkMapsCollection;
