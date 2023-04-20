const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');

// À modifier, il faudra plutôt passer par le contexte
const { Place, PlacesCollection, TripOrVariantPoint, TripPoint, VariantPoint, TrainPathVariantPoint } = require('@bimo/core-entities');

const placeIdPropByConstructor = new Map([
  [TripPoint, `trpptPlace`],
  [VariantPoint, `varptPlace`],
  [TrainPathVariantPoint, `trnpvptPlace`],
]);

/**
 * Retrieves a place corresponding to the placeLike object in placesCollection
 * @param {Place|string|TripOrVariantPoint} placeLike - the object from which to retrieve a place
 * @param {PlacesCollection=} placesCollection - placesCollection to use
 * @param {any=} options - @see ServiceOptions
 * @return {Place}
 */
function retrievePlace(placeLike, placesCollection, options) {
  const logger = getAndAddLoggerToServiceOptions(options, { serviceName: `retrievePlace` });
  if (!placeLike) return undefined;
  logger.silly(`Start of retrievePlace`);
  if (placeLike instanceof Place) {
    logger.silly(`Place like is a place and will be returned as is`);
    return placeLike;
  }
  if (!(placesCollection instanceof PlacesCollection)) {
    throw new Error(`When placeLike is not a place, a placesCollection must be provided.`);
  }
  let placeIdToUse;
  if (typeof placeLike === `string`) {
    logger.silly(`Place like is string ${placeLike}. A place with this string as plcIdentifier will be retrieved.`);
    placeIdToUse = placeLike;
  }

  if (!placeIdToUse) {
    const { constructor } = Object.getPrototypeOf(placeLike);
    // If we start using more complex prototype chains, we will have to change this and test using instanceof
    logger.silly(`Place like is an instance of ${(constructor.name)}.`);
    const placeIdProp = placeIdPropByConstructor.get(constructor);
    if (!placeIdProp) {
      throw new Error(`No place id prop found for ${(constructor.name)}`);
    }
    placeIdToUse = placeLike[placeIdProp];
    logger.silly(`Got ${placeIdToUse} as placeIdToUse using ${placeIdProp} as placeIdProp`);
  }

  if (!placeIdToUse) {
    throw new Error(`Couldn't get placeIdToUse`);
  }
  const place = placesCollection.getByBusinessId(placeIdToUse);
  if (!place) {
    throw new Error(`Pas de lieu avec l'id "${placeIdToUse}" dans le jeu de lieux`);
  }
  logger.silly(`retrievePlace returning ${place.shortLoggingOutput}`);
  return place;
}

module.exports = retrievePlace;
