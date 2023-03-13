const xml2js = require('xml2js');

async function parseXml(xmlData, options = {}) {
  const firstCharToLowerCaseProcessor = xml2js.processors.firstCharLowerCase;

  const optionsToUse = { ...options };
  if (options.shouldPutAttributeNamesInLowerCase) {
    optionsToUse.attrNameProcessors = [firstCharToLowerCaseProcessor];
    optionsToUse.tagNameProcessors = [firstCharToLowerCaseProcessor];
  }

  const xmlParser = new xml2js.Parser(optionsToUse);

  return xmlParser.parseStringPromise(xmlData);
}

module.exports = parseXml;
