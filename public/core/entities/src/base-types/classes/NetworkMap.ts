import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { FeatureCollection } from "geojson";
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
export declare class NetworkMap extends Item<NetworkMap> {
  bimoId: string;
  featureCollection: FeatureCollection;
  nodesFeatureCollection?: FeatureCollection;
  sectionsFeatureCollection?: FeatureCollection;
  constructor(props: NetworkMapProps);
  get shortLoggingOutput(): string;
  get mediumLoggingOutput(): string;
}
