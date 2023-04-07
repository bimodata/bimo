const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

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
const NetworkMapClassFactory = () => {
  class NetworkMap {
    constructor(props) {
      this.bimoId = getAndValidatePropFromProps('bimoId', props, 'string');
      this.label = getAndValidatePropFromProps('label', props, 'string');
      /** @type {GeoJSON.FeatureCollection} */
      this.featureCollection = getAndValidatePropFromProps('featureCollection', props);

      /** @type {GeoJSON.FeatureCollection} */
      this.nodesFeatureCollection = getAndValidatePropFromProps('nodesFeatureCollection', props);

      /** @type {GeoJSON.FeatureCollection} */
      this.sectionsFeatureCollection = getAndValidatePropFromProps('sectionsFeatureCollection', props);
    }

    get shortLoggingOutput() {
      return this.label;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput}: ${this.featureCollection.features.length} segments`;
    }
  }

  NetworkMap.allChildClasses = getAllChildClasses(childClasses);
  NetworkMap.prototype.serializeModel = serializeThis;
  NetworkMap.parseModel = parseThis;

  return NetworkMap;
};

module.exports = NetworkMapClassFactory;
