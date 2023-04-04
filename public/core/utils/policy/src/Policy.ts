const PolicyRule = require('@bimo-core/policy-rule/src/PolicyRule');
const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');

/**
   * @typedef {object} PolicyRuleConfig
   *
   */

/**
   * @typedef {[PolicyRule, PolicyRuleConfig]} RuleAndConfigTuple
   *
   */

class Policy {
  /**
   *
   * @param {object} props
   * @param {string} props.key - a unique short key for this policy
   * @param {string} props.description - a description of the policy
   * @param {RuleAndConfigTuple[]} props.ruleAndConfigTuples -
   * @param {object} props.options - options
   */
  constructor(props) {
    this.key = props.key;
    this.description = props.description;
    this.ruleAndConfigTuples = props.ruleAndConfigTuples;
    this.options = props.options;
  }

  /**
   *
   * @param {'add'|'remove'|'default'} eventKey
   * @param {object} args
   */
  evaluate(eventKey = 'default', args = {}, context = {}) {
    const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `Policy.evaluate` });
    const results = [];
    this.ruleAndConfigTuples.forEach((ruleAndConfigTuple) => {
      const [rule, config = {}] = ruleAndConfigTuple;
      const { level = 'warning' } = config;
      logger.debug(`Evaluating rule ${rule.key} of policy ${this.key}`);
      const message = rule.evaluate(eventKey, args, context);
      if (message) {
        results.push({ ruleKey: rule.key, level, message });
        if (level === 'error') throw new Error(`Error on rule ${rule.description} (${rule.key}):\n${message}`);
      }
    });
    return results;
  }
}

module.exports = Policy;
