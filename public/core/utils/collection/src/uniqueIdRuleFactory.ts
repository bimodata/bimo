import { ExtendedItem } from "./Item";
import PolicyRule from "./PolicyRule";
import { evaluateAdd, evaluateDefault } from "./uniquePropHelperFunctions";

export function uniqueIdRuleFactory<ItemType extends ExtendedItem<ItemType>>() {
  return new PolicyRule<ItemType>({
    key: "uniqueId",
    description:
      "Ensures that each item in a collection has a unique id. Falsey ids are ignored.",
    evaluateFnByEventKey: {
      add: ({ item, collection }) => {
        if (!collection.idPropName) return false;
        return evaluateAdd({ item, collection, propName: collection.idPropName });
      },
      default: ({ collection }) => {
        if (!collection.idPropName) return false;
        return evaluateDefault({ collection, propName: collection.idPropName });
      },
      remove: () => false,
    },
  });
}

export default uniqueIdRuleFactory;
