#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');

const updateClassFactories = require('./src/updateClassFactories');

console.log('Starting');
updateClassFactories(
  path.join(process.cwd(), 'input'),
  path.join(process.cwd(), 'output'),
).then(() => {
  console.log('done');
}).catch((error) => {
  console.log(error);
});
