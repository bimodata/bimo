const path = require('path');
const api = require('./www/mapshaper');
const pathToExportedBuild = path.join(__dirname, 'www'); 

module.exports = {
  api,
  pathToExportedBuild
};