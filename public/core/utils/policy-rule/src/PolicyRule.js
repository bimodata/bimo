/* Class definition */
class PolicyRule {
  /**
   *
   * @param {object} props
   * @param {string} props.key - a unique short key for this rule
   * @param {string} props.description - a description of the rule
   * @param {object} props.evaluateFnByEventKey -
   * @param {function} props.evaluateFnByEventKey.default - the validation function to use in general
   * @param {function} [props.evaluateFnByEventKey.add] - the validation function to use when an item is added to the collection
   * @param {function} [props.evaluateFnByEventKey.remove] - the validation funciton to use when an item is removed from the collection
   */
  constructor(props) {
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
  evaluate(eventKey = 'default', args = {}, context = {}) {
    const evaluateFn = this._evaluateFnByEventKey[eventKey];
    if (!evaluateFn) return null;
    return evaluateFn(args, context);
  }
}

module.exports = PolicyRule;
