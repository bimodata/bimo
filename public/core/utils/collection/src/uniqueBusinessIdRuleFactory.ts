import PolicyRule from "./PolicyRule";
import { ExtendedItem, ExtendedItemProps } from "./Item";
import { evaluateAdd, evaluateDefault } from "./uniquePropHelperFunctions";

export function uniqueBusinessIdRuleFactory<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
>() {
  return new PolicyRule<ItemType, ItemProps>({
    key: "uniqueBusinessId",
    description:
      "Ensures that each item in a collection has a unique business id. Falsey ids are ignored.",
    evaluateFnByEventKey: {
      add: ({ item, collection }) => {
        if (!collection.businessIdPropName) return false;
        return evaluateAdd({
          item,
          collection,
          propName: collection.businessIdPropName,
        });
      },
      default: ({ collection }) => {
        if (!collection.businessIdPropName) return false;
        return evaluateDefault({
          collection,
          propName: collection.businessIdPropName,
        });
      },
      remove: () => false,
    },
  });
}

export default uniqueBusinessIdRuleFactory;
