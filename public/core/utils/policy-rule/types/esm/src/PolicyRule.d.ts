import { Item } from "@bimo/core-utils-item";
import { Context, Entity } from "@bimo/core-utils-entity";
/**
 * - add occurs when an item is added to the collection
 * - remove occurs when an item is removed from the collection
 * - default is the event to use in any other case
 */
export type PolicyRuleEvent = "add" | "remove" | "default";
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
export declare class PolicyRule<ItemType extends Entity> {
    key: string;
    description?: string;
    _evaluateFnByEventKey: EvaluateFnByEventKey<ItemType>;
    constructor(props: PolicyRuleProps<ItemType>);
    /**
     *
     * @param {'add'|'remove'|'default'} eventKey
     * @param {object} args
     * @param {object=} args.item
     * @param {object=} args.collection
     */
    evaluate(eventKey?: PolicyRuleEvent, args?: PolicyRuleEvaluationArgs<ItemType>, context?: Context): any;
}
export default PolicyRule;
