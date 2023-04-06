import PolicyRule from "./PolicyRule";
import { ExtendedItem } from "./Item";

export function truthyIdRuleFactory<ItemType extends ExtendedItem<ItemType>>() {
  return new PolicyRule<ItemType>({
    key: "truthyId",
    description: "Ensures that each item in a collection has a truthy id.",
    evaluateFnByEventKey: {
      add: ({ item, collection }) => {
        if (!collection.idPropName) return false;
        if (!item[collection.idPropName]) {
          return `La valeur ${item[collection.idPropName]} de la propriété ${
            collection.idPropName
          } est invalide.`;
        }
        return false;
      },
      default: ({ collection }) => {
        if (!collection.idPropName) return false;
        const itemWithFalseyId = collection.items.find(
          (item) => !item[collection.idPropName as string]
        );

        if (itemWithFalseyId) {
          return `Un item a une valeur invalide (${
            itemWithFalseyId[collection.idPropName]
          }) dans la propriété ${
            collection.idPropName
          } utilisée comme id dans cette collection.`;
        }
        return false;
      },
      remove: () => false,
    },
  });
}
export default truthyIdRuleFactory;
