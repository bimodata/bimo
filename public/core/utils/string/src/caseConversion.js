const snakeToCamel = function snakeToCamel(snakeString) {
  return snakeString.replace(/([_][a-z])/ig, (lodashAndLetter) => lodashAndLetter.toUpperCase().replace('_', ''));
};

const camelToPascal = function camelToPascal(camelString) {
  return camelString.replace(/^[a-z]/, (firstChar) => firstChar.toUpperCase());
};

const camelOrPascalToSnake = function camelOrPascalToSnake(camelOrPascalString) {
  return camelOrPascalString.replace(/[A-Z]/g, (upperCasedChar, offset) => {
    const lowerCasedChar = upperCasedChar.toLowerCase();
    return (offset === 0) ? lowerCasedChar : `_${lowerCasedChar}`;
  });
};

const snakeToPascal = function snakeToPascal(snakeString) {
  return camelToPascal(snakeToCamel(snakeString));
};

module.exports = {
  snakeToCamel,
  snakeToPascal,
  camelToPascal,
  camelOrPascalToSnake,
};
