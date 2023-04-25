/* eslint-disable class-methods-use-this */

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

/**
 * Bimo specific class that represents a sub section of a trip or variant
 * A tripOrVariant that does A|B|C|D will have 6 sections:
 * A>D (full tripOrVariant)
 * A>C
 * A>B
 * B>D
 * B>C
 * C>D
 * For x trip points, the number of sections is
 * ((x-1)(x)/2)
 *
 * Initial use case: comparing the distances we have in Hastus with external distances
 * Potential future use cases: combining trips or variants to create longer itineraries
 */
export interface TripOrVariantSectionProps extends ExtendedItemProps {
  points?: string;
}

export class TripOrVariantSection extends Item<TripOrVariantSection> {
  /**
   * @param {Object} props
   * @param {import('./TripOrVariantPoint')[]} props.points
   */
  points?: string;
  constructor(props: TripOrVariantSectionProps) {
    super(props);
    const { points } = props;
    this.points = points;
  }

  get startPoint() {
    return this.points[0];
  }

  get endPoint() {
    return this.points[this.points.length - 1];
  }

  get totalDistance() {
    return this.points.slice(1).reduce((previousValue, currentPoint) => previousValue + parseFloat(currentPoint.distance), 0);
  }

  get totalDistanceAsString() {
    return this.totalDistance.toFixed(1);
  }

  get tripOrVariant() {
    return this.parent?.parent;
  }

  get shortLoggingOutput() {
    return `${this.startPoint.placeId} > ${this.endPoint.placeId}`;
  }

  get mediumLoggingOutput() {
    return this.points.map((point) => point.placeId).join('|');
  }

  get longLoggingOutput() {
    return `${this.shortLoggingOutput} (de ${this.tripOrVariant.mlo}) dist: ${this.totalDistance}`;
  }
}

export default TripOrVariantSection;
