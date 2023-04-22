import PolicyRule, { PolicyRuleEvent, PolicyRuleEvaluationArgs } from "./PolicyRule";
import { ExtendedItem, ExtendedItemProps } from "./Item";
import { BimoContext } from "@bimo/core-global-types";
import { getAndAddLoggerToServiceOptions } from "@bimo/core-utils-logging";

export type PolicyRuleLevel = "info" | "warning" | "error";

export interface PolicyRuleConfig {
  level?: PolicyRuleLevel;
}

export interface PolicyProps<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
> {
  key: string;
  description?: string;
  ruleAndConfigTuples: [PolicyRule<ItemType, ItemProps>, PolicyRuleConfig][];
  options?: any;
}

export interface PolicyEvaluationResult {
  ruleKey: string;
  level: PolicyRuleLevel;
  message: string;
}

export class Policy<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
> {
  key: string;
  description?: string;
  ruleAndConfigTuples: [PolicyRule<ItemType, ItemProps>, PolicyRuleConfig][];
  options?: any;

  constructor(props: PolicyProps<ItemType, ItemProps>) {
    this.key = props.key;
    this.description = props.description;
    this.ruleAndConfigTuples = props.ruleAndConfigTuples;
    this.options = props.options;
  }

  evaluate(
    eventKey: PolicyRuleEvent = "default",
    args: PolicyRuleEvaluationArgs<ItemType, ItemProps>,
    context: BimoContext = {}
  ) {
    const logger = getAndAddLoggerToServiceOptions(context, {
      serviceName: `Policy.evaluate`,
    });
    const results: PolicyEvaluationResult[] = [];
    this.ruleAndConfigTuples.forEach((ruleAndConfigTuple) => {
      const [rule, config = {}] = ruleAndConfigTuple;
      const { level = "warning" } = config;
      logger.debug(`Evaluating rule ${rule.key} of policy ${this.key}`);
      const message = rule.evaluate(eventKey, args, context);
      if (message) {
        results.push({ ruleKey: rule.key, level, message });
        if (level === "error")
          throw new Error(`Error on rule ${rule.description} (${rule.key}):\n${message}`);
      }
    });
    return results;
  }
}

export default Policy;
