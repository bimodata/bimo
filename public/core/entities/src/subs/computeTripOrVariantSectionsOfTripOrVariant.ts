import { BimoTripOrVariant } from "../TripOrVariant";
import { BimoTripOrVariantPoint } from "../TripOrVariantPoint";
import { ExtendedItem, ExtendedItemProps } from "@bimo/core-utils-collection";
import { EntityConstructorByEntityClassKey } from "../../base-types/entityConstructorByEntityClassKey";

function computeTripOrVariantSectionsOfTripOrVariant<
  TripOrVariantType extends ExtendedItem<TripOrVariantType>,
  TripOrVariantProps extends ExtendedItemProps,
  PointType extends BimoTripOrVariantPoint<PointType, PointProps>,
  PointProps extends ExtendedItemProps
>(
  tripOrVariant: BimoTripOrVariant<
    TripOrVariantType,
    TripOrVariantProps,
    PointType,
    PointProps
  >,
  { TripOrVariantSectionsCollection }: EntityConstructorByEntityClassKey
) {
  try {
    const tripOrVariantSections = new TripOrVariantSectionsCollection<
      PointType,
      PointProps,
      TripOrVariantType,
      TripOrVariantProps
    >({
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
  } catch (error: any) {
    const err = new Error(
      `Erreur dans le calcul des tripOrVariantSections de ${tripOrVariant.slo}: ${error.message}`
    );
    err.stack = `Re-thrown: ${err.stack}\nOriginal:${error.stack}`;
    throw err;
  }
}

export default computeTripOrVariantSectionsOfTripOrVariant;
