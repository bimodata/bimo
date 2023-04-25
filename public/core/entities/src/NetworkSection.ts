import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';

import { Item } from '@bimo/core-utils-collection'); const NetworkNodesCollection = require('./NetworkNodesCollection';
import { NetworkEdgesCollection, NetworkEdgesCollectionProps } from "./NetworkEdgesCollection";

const childClasses = [NetworkNodesCollection, NetworkEdgesCollection];

/** Un sous-ensembe de nodes et d'edges d'un network qui partagent des caractéristiques communes.
 * Par exemple un ensemble de nodes et d'edges qui forment la voie 1 entre Amiens et Beauvais.
 */
export interface NetworkSectionProps extends ExtendedItemProps {
  bimoId?: string;
  businessId?: string;
  label?: string;
  customProps?: string;
  nodes?: string;
  edges?: string;
}

export class NetworkSection extends Item<NetworkSection> {
  /**
   *
   * @param {NetworkSection} props
   */
  bimoId?: string;
  businessId?: string;
  label?: string;
  customProps?: string;
  nodes?: string;
  edges?: string;
  constructor(props: NetworkSectionProps) {
    super(props, 'NetworkSection');
    this.bimoId = gavpfp('bimoId', props, 'string');
    this.businessId = gavpfp('businessId', props, 'string');
    this.label = gavpfp('label', props, 'string');
    this.customProps = gavpfp('customProps', props, Object, {});

    /** @type {NetworkNodesCollection} */
    this.nodes = gavpfp('nodes', props, NetworkNodesCollection, [], { associationType: 'aggregation' });
    /** @type {NetworkEdgesCollection} */
    this.edges = gavpfp('edges', props, NetworkEdgesCollection, [], { associationType: 'aggregation' });
  }

  get shortLoggingOutput() {
    return this.label;
  }

  get mediumLoggingOutput() {
    return `${this.shortLoggingOutput}: ${this.nodes.shortLoggingOutput} ${this.edges.shortLoggingOutput}`;
  }

  /**
   * @param {import ('./NetworkEdge')} edge
   * @returns {Boolean}
   */
  hasEdge(edge) {
    return this.edges.has(edge);
  }

  /**
   *
   * @param {import ('./NetworkEdge')} edge
   * @param {*} [options={}]
   * @param {boolean} [options.addNodes=false]
   */
  addEdge(edge, { addNodes = false }) {
    if (addNodes) edge.nodes.forEach((node) => this.addNode(node));
    if (!this.edges.has(edge)) {
      this.edges.add(edge);
      edge.addSection(this);
    }
  }

  /**
   *
   * @param {import ('./NetworkNode')} node
   */
  addNode(node) {
    if (!this.nodes.has(node)) {
      this.nodes.add(node);
      node.addSection(this);
    }
  }

  /**
   * @param {import ('./NetworkNode')} node
   * @returns {Boolean}
   */
  hasNode(node) {
    return this.nodes.has(node);
  }
}

NetworkSection.allChildClasses = getAllChildClasses(childClasses);



export default NetworkSection;
