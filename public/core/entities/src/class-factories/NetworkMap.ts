import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { NetworkMap as BimoNetworkMap } from "../base-types/rawIndex";
export { NetworkMap as BimoNetworkMap } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { FeatureCollection } from "geojson";

const childClasses: (typeof Entity)[] = [];

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
  bimoId: string;
  featureCollection?: FeatureCollection;
  nodesFeatureCollection?: FeatureCollection;
  sectionsFeatureCollection?: FeatureCollection;
}

export function NetworkMapClassFactory(
  entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey
): typeof BimoNetworkMap {
  class NetworkMap extends Item<NetworkMap> {
    bimoId: string;
    featureCollection: FeatureCollection;
    nodesFeatureCollection?: FeatureCollection;
    sectionsFeatureCollection?: FeatureCollection;
    constructor(props: NetworkMapProps) {
      super(props);
      this.bimoId = gavpfp("bimoId", props, "string");
      this.label = gavpfp("label", props, "string");
      this.featureCollection = gavpfp("featureCollection", props);
      this.nodesFeatureCollection = gavpfp("nodesFeatureCollection", props);
      this.sectionsFeatureCollection = gavpfp("sectionsFeatureCollection", props);
    }

    get shortLoggingOutput() {
      return this.label ?? super.slo;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput}: ${this.featureCollection.features.length} segments`;
    }
  }

  NetworkMap.allChildClasses = getAllChildClasses(childClasses);

  return NetworkMap;
}

export default NetworkMapClassFactory;
