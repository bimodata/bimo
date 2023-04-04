import PolicyRule, { PolicyRuleEvent, PolicyRuleEvaluationArgs } from "@bimo-core/policy-rule";
import { Entity, Context } from "@bimo/core-utils-entity";
export type PolicyRuleLevel = "info" | "warning" | "error";
export interface PolicyRuleConfig {
    level?: PolicyRuleLevel;
}
export interface PolicyProps<ItemType extends Entity> {
    key: string;
    description?: string;
    ruleAndConfigTuples: [PolicyRule<ItemType>, PolicyRuleConfig][];
    options?: any;
}
export interface PolicyEvaluationResult {
    ruleKey: string;
    level: PolicyRuleLevel;
    message: string;
}
export declare class Policy<ItemType extends Entity> {
    key: string;
    description?: string;
    ruleAndConfigTuples: [PolicyRule<ItemType>, PolicyRuleConfig][];
    options?: any;
    constructor(props: PolicyProps<ItemType>);
    evaluate(eventKey?: PolicyRuleEvent, args?: PolicyRuleEvaluationArgs<ItemType>, context?: Context): PolicyEvaluationResult[];
}
export default Policy;
