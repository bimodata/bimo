/* eslint-disable class-methods-use-this */

const Item = require('@bimo/core-utils-item');

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
 * Initial use case: comparing the distances between sources
 * Potential future use cases: combining trips or variants to create longer itineraries
 */
const TripOrVariantSectionClassFactory = () => {
  class TripOrVariantSection extends Item {
    /**
     * @param {Object} props
     * @param {import('./TripOrVariantPoint')[]} props.points
     */
    constructor(props) {
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

  return TripOrVariantSection;
};

module.exports = TripOrVariantSectionClassFactory;
