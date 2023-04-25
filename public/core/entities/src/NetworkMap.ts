import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';

const childClasses = [];

/** Une représentation physique d'un réseau ou d'une partie d'un réseau.
Un même réseau peut avoir plusieurs NetworkMaps. Par exemple:
 - Une représentation géographique de l'ensemble du réseau
 - Une représentation schématique de l'ensemble du réseau
 - Une représentation géographique détaillée de la partie nord du réseau
 - Une représentation géographique détaillée de la partie sud du réseau
...
Une network map est stockée sous la forme de plusieurs FeatureCollection geojson, contenant des
features de type Point ou LineString. Chacune de ces features a des propriétés qui font le
lien vers des Edges ou des Nodes, ou des sections du réseau. */
export interface NetworkMapProps extends ExtendedItemProps {
  label?: string;
  featureCollection?: string;
  nodesFeatureCollection?: string;
  sectionsFeatureCollection?: string;
}

export class NetworkMap {
  label?: string;
  featureCollection?: string;
  nodesFeatureCollection?: string;
  sectionsFeatureCollection?: string;
  constructor(props: NetworkMapProps) {
    this.bimoId = gavpfp('bimoId', props, 'string');
    this.label = gavpfp('label', props, 'string');
    /** @type {GeoJSON.FeatureCollection} */
    this.featureCollection = gavpfp('featureCollection', props);

    /** @type {GeoJSON.FeatureCollection} */
    this.nodesFeatureCollection = gavpfp('nodesFeatureCollection', props);

    /** @type {GeoJSON.FeatureCollection} */
    this.sectionsFeatureCollection = gavpfp('sectionsFeatureCollection', props);
  }

  get shortLoggingOutput() {
    return this.label;
  }

  get mediumLoggingOutput() {
    return `${this.shortLoggingOutput}: ${this.featureCollection.features.length} segments`;
  }
}

NetworkMap.allChildClasses = getAllChildClasses(childClasses);



export default NetworkMap;
