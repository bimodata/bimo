import { BimoContext } from "@bimo/core-global-types";
import { ExtendedItem } from "./Item";
import { Collection } from "./Collection";

/**
 * - add occurs when an item is added to the collection
 * - remove occurs when an item is removed from the collection
 * - default is the event to use in any other case
 */
export type PolicyRuleEvent = "add" | "remove" | "default";

export interface PolicyRuleEvaluationArgs<ItemType extends ExtendedItem<ItemType>> {
  item?: ItemType;
  collection: Collection<ItemType>;
}

export type EvaluateFnByEventKey<ItemType extends ExtendedItem<ItemType>> = {
  add: (
    args: { item: ItemType; collection: Collection<ItemType> },
    context?: BimoContext
  ) => string | false;
  remove: (
    args: { item: ItemType; collection: Collection<ItemType> },
    context?: BimoContext
  ) => string | false;
  default: (
    args: { collection: Collection<ItemType> },
    context?: BimoContext
  ) => string | false;
};

export interface PolicyRuleProps<ItemType extends ExtendedItem<ItemType>> {
  key: string;
  description?: string;
  evaluateFnByEventKey: EvaluateFnByEventKey<ItemType>;
}

export class PolicyRule<ItemType extends ExtendedItem<ItemType>> {
  key: string; // a unique short key for this rule
  description?: string; // a description of the rule
  _evaluateFnByEventKey: EvaluateFnByEventKey<ItemType>;

  constructor(props: PolicyRuleProps<ItemType>) {
    this.key = props.key;
    this.description = props.description;
    this._evaluateFnByEventKey = props.evaluateFnByEventKey;
  }

  evaluate(
    eventKey: PolicyRuleEvent = "default",
    args: PolicyRuleEvaluationArgs<ItemType>,
    context: BimoContext = {}
  ): string | false {
    const evaluateFn = this._evaluateFnByEventKey[eventKey];
    if (!evaluateFn) return false;
    return evaluateFn(
      args as { item: ItemType; collection: Collection<ItemType> },
      context
    );
  }
}

export default PolicyRule;
