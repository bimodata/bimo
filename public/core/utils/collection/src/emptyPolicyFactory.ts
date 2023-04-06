import Policy from "./Policy";
import { ExtendedItem } from "./Item";

export function emptyPolicyFactory<ItemType extends ExtendedItem<ItemType>>() {
  return new Policy<ItemType>({
    key: "emptyPolicy",
    description:
      "An empty policy for use on collections where no specific rules must be enforced",
    ruleAndConfigTuples: [],
    options: {},
  });
}
