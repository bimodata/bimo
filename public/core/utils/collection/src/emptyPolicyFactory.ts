import Policy from "./Policy";
import { ExtendedItem, ExtendedItemProps } from "./Item";

export function emptyPolicyFactory<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
>() {
  return new Policy<ItemType, ItemProps>({
    key: "emptyPolicy",
    description:
      "An empty policy for use on collections where no specific rules must be enforced",
    ruleAndConfigTuples: [],
    options: {},
  });
}
