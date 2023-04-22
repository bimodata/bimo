import { Policy } from "./Policy";
import { uniqueIdRuleFactory } from "./uniqueIdRuleFactory";
import { uniqueBusinessIdRuleFactory } from "./uniqueBusinessIdRuleFactory";
import { truthyIdRuleFactory } from "./truthyIdRuleFactory";
import { ExtendedItem, ExtendedItemProps } from "./Item";

export function uniqueIdPolicyFactory<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
>() {
  return new Policy<ItemType, ItemProps>({
    key: "uniqueId",
    description:
      "Ensures that each item in a collection has a unique truthy id, and a unique business id.",
    ruleAndConfigTuples: [
      [uniqueIdRuleFactory<ItemType, ItemProps>(), { level: "error" }],
      [uniqueBusinessIdRuleFactory<ItemType, ItemProps>(), { level: "error" }],
      [truthyIdRuleFactory<ItemType, ItemProps>(), { level: "error" }],
    ],
    options: {},
  });
}

export default uniqueIdPolicyFactory;
