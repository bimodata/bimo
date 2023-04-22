import { BimoContext } from "@bimo/core-global-types";
import { ExtendedItem, ExtendedItemProps } from "./Item";
import { Collection } from "./Collection";

/**
 * - add occurs when an item is added to the collection
 * - remove occurs when an item is removed from the collection
 * - default is the event to use in any other case
 */
export type PolicyRuleEvent = "add" | "remove" | "default";

export interface PolicyRuleEvaluationArgs<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
> {
  item?: ItemType;
  collection: Collection<ItemType, ItemProps>;
}

export type EvaluateFnByEventKey<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
> = {
  add: (
    args: { item: ItemType; collection: Collection<ItemType, ItemProps> },
    context?: BimoContext
  ) => string | false;
  remove: (
    args: { item: ItemType; collection: Collection<ItemType, ItemProps> },
    context?: BimoContext
  ) => string | false;
  default: (
    args: { collection: Collection<ItemType, ItemProps> },
    context?: BimoContext
  ) => string | false;
};

export interface PolicyRuleProps<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
> {
  key: string;
  description?: string;
  evaluateFnByEventKey: EvaluateFnByEventKey<ItemType, ItemProps>;
}

export class PolicyRule<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
> {
  key: string; // a unique short key for this rule
  description?: string; // a description of the rule
  _evaluateFnByEventKey: EvaluateFnByEventKey<ItemType, ItemProps>;

  constructor(props: PolicyRuleProps<ItemType, ItemProps>) {
    this.key = props.key;
    this.description = props.description;
    this._evaluateFnByEventKey = props.evaluateFnByEventKey;
  }

  evaluate(
    eventKey: PolicyRuleEvent = "default",
    args: PolicyRuleEvaluationArgs<ItemType, ItemProps>,
    context: BimoContext = {}
  ): string | false {
    const evaluateFn = this._evaluateFnByEventKey[eventKey];
    if (!evaluateFn) return false;
    return evaluateFn(
      args as { item: ItemType; collection: Collection<ItemType, ItemProps> },
      context
    );
  }
}

export default PolicyRule;
