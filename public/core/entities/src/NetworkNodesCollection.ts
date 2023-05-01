import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";

import { NetworkNode, NetworkNodeProps } from "./NetworkNode";

const childClasses = [NetworkNode];


export interface NetworkNodesCollectionProps extends ExtendedCollectionProps<NetworkNode, NetworkNodeProps> {
}

export class NetworkNodesCollection extends Collection<NetworkNode, NetworkNodeProps> {
  constructor(props: NetworkNodesCollectionProps = {}) {
    super({
      itemName: 'NetworkNode',
      ItemConstructor: NetworkNode,
      idPropName: 'bimoId',
      businessIdPropName: 'businessId',
      labelPropName: 'businessId',
      associationType: 'composition',
      ...props,
    });
  }
}

NetworkNodesCollection.allChildClasses = getAllChildClasses(childClasses);



export default NetworkNodesCollection;