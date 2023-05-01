import TripOrVariantSectionsCollection from "../TripOrVariantSectionsCollection";
import { TripOrVariant } from "../TripOrVariant";
import { ExtendedItem, ExtendedItemProps } from "@bimo/core-utils-collection";

function computeTripOrVariantSectionsOfTripOrVariant<
  TripOrVariantType extends ExtendedItem<TripOrVariantType>,
  TripOrVariantProps extends ExtendedItemProps
>(tripOrVariant: TripOrVariant<TripOrVariantType, TripOrVariantProps>) {
  try {
    const tripOrVariantSections = new TripOrVariantSectionsCollection({
      associationType: "composition",
      parent: tripOrVariant,
    });

    for (let i = 0; i < tripOrVariant.points.length; i++) {
      for (let j = i + 1; j < tripOrVariant.points.length; j++) {
        tripOrVariantSections.createNewItem({
          points: tripOrVariant.points.items.slice(i, j + 1),
        });
      }
    }

    return tripOrVariantSections;
  } catch (error) {
    const err = new Error(
      `Erreur dans le calcul des tripOrVariantSections de ${tripOrVariant.slo}: ${error.message}`
    );
    err.stack = `Re-thrown: ${err.stack}\nOriginal:${error.stack}`;
    throw err;
  }
}

export default computeTripOrVariantSectionsOfTripOrVariant;
