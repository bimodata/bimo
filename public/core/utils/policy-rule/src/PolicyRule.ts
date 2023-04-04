import { Item } from "@bimo/core-utils-item";
import { Context, Entity } from "@bimo/core-utils-entity";
import { Collection } from "@bimo/core-utils-collection";

/**
 * - add occurs when an item is added to the collection
 * - remove occurs when an item is removed from the collection
 * - default is the event to use in any other case
 */
export type PolicyRuleEvent = "add" | "remove" | "default";

// TODO: switch collection to proper type
export interface PolicyRuleEvaluationArgs<ItemType extends Entity> {
  item?: Item<ItemType>;
  collection?: any;
}

export interface PolicyRuleEvaluateFn<ItemType extends Entity> {
  (args: PolicyRuleEvaluationArgs<ItemType>, context: Context): any;
}

export type EvaluateFnByEventKey<ItemType extends Entity> = {
  [eventKey in PolicyRuleEvent]: PolicyRuleEvaluateFn<ItemType>;
};

export interface PolicyRuleProps<ItemType extends Entity> {
  key: string;
  description?: string;
  evaluateFnByEventKey: EvaluateFnByEventKey<ItemType>;
}

export class PolicyRule<ItemType extends Entity> {
  key: string; // a unique short key for this rule
  description?: string; // a description of the rule
  _evaluateFnByEventKey: EvaluateFnByEventKey<ItemType>;

  constructor(props: PolicyRuleProps<ItemType>) {
    this.key = props.key;
    this.description = props.description;
    this._evaluateFnByEventKey = props.evaluateFnByEventKey;
  }

  /**
   *
   * @param {'add'|'remove'|'default'} eventKey
   * @param {object} args
   * @param {object=} args.item
   * @param {object=} args.collection
   */
  evaluate(
    eventKey: PolicyRuleEvent = "default",
    args: PolicyRuleEvaluationArgs<ItemType> = {},
    context: Context = {}
  ) {
    const evaluateFn = this._evaluateFnByEventKey[eventKey];
    if (!evaluateFn) return null;
    return evaluateFn(args, context);
  }
}

export default PolicyRule;
