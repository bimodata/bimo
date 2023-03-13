const _regexByStringifiedRegex = {};
const stringifiedRegexMatcher = /^\/(.*)\/(.*)$/;
function getRegexFromStringifedRegex(stringifiedRegex) {
  let regex = _regexByStringifiedRegex[stringifiedRegex];
  if (!regex) {
    const matches = stringifiedRegexMatcher.exec(stringifiedRegex);
    if (!matches) throw new Error(`Expression régulière invalide: ${stringifiedRegex}`);
    regex = new RegExp(matches[1], matches[2]);
    _regexByStringifiedRegex[stringifiedRegex] = regex;
  }
  return regex;
}

module.exports = getRegexFromStringifedRegex;
