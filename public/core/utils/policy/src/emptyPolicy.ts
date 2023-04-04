const Policy = require('./Policy');

module.exports = new Policy({
  key: 'emptyPolicy',
  description: 'An empty policy for use on collections where no specific rules must be enforced',
  ruleAndConfigTuples: [],
  options: {},
});
