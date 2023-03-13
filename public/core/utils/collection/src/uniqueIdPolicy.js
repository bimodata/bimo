const { Policy } = require('@bimo-core/policy');
const uniqueIdRule = require('./uniqueIdRule');
const uniqueBusinessIdRule = require('./uniqueBusinessIdRule');
const truthyIdRule = require('./truthyIdRule');

module.exports = new Policy({
  key: 'uniqueId',
  description: 'Ensures that each item in a collection has a unique truthy id, and a unique business id.',
  ruleAndConfigTuples: [
    [uniqueIdRule, { level: 'error' }],
    [uniqueBusinessIdRule, { level: 'error' }],
    [truthyIdRule, { level: 'error' }],
  ],
  options: {},
});
