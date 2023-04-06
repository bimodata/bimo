import { Policy } from "./Policy";
import { uniqueIdRuleFactory } from "./uniqueIdRuleFactory";
import { uniqueBusinessIdRuleFactory } from "./uniqueBusinessIdRuleFactory";
import { truthyIdRuleFactory } from "./truthyIdRuleFactory";
import { ExtendedItem } from "./Item";

export function uniqueIdPolicyFactory<ItemType extends ExtendedItem<ItemType>>() {
  return new Policy<ItemType>({
    key: "uniqueId",
    description:
      "Ensures that each item in a collection has a unique truthy id, and a unique business id.",
    ruleAndConfigTuples: [
      [uniqueIdRuleFactory<ItemType>(), { level: "error" }],
      [uniqueBusinessIdRuleFactory<ItemType>(), { level: "error" }],
      [truthyIdRuleFactory<ItemType>(), { level: "error" }],
    ],
    options: {},
  });
}

export default uniqueIdPolicyFactory;
