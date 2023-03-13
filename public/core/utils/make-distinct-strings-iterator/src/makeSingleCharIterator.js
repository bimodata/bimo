const zero = [0];
const oneToNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const lowerCaseLetters = Array(26).fill().map((v, i) => String.fromCharCode(97 + i));
const upperCaseLetters = Array(26).fill().map((v, i) => String.fromCharCode(65 + i));

const defaultCharArrayByCharSetKey = { zero, oneToNine, lowerCaseLetters, upperCaseLetters };

function* makeSingleCharIterator(config = {}) {
  const {
    orderedCharSetKeys = ['zero', 'oneToNine', 'lowerCaseLetters', 'upperCaseLetters'],
    customCharArrayByCharSetKey = {},
  } = config;

  const charArrayByCharSetKey = { ...defaultCharArrayByCharSetKey, ...customCharArrayByCharSetKey };

  const iterableChars = [];
  orderedCharSetKeys.forEach((charSetKey) => {
    const charArray = charArrayByCharSetKey[charSetKey];
    if (!charArray) throw new Error(`No charArray for key ${charSetKey}`);
    if (!Array.isArray(charArray)) throw new Error(`charArray for key ${charSetKey} is not an array`);
    iterableChars.push(...charArray);
  });

  for (let i = 0; i < iterableChars.length; i++) {
    yield iterableChars[i];
  }
}

module.exports = makeSingleCharIterator;
