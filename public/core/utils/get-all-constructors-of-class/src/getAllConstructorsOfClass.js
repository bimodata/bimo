/**
 * @param {function} classToGet
 * @returns {function[]}
 */
function getAllConstructorsOfClass(classToGet) {
  if (typeof classToGet !== 'function') throw new Error('classToGet must be a (class) function');
  const prototypes = [];
  let prototype = classToGet.prototype;
  while (prototype) {
    prototypes.push(prototype);
    prototype = Object.getPrototypeOf(prototype);
  }
  return prototypes.map((pt) => pt.constructor);
}

module.exports = getAllConstructorsOfClass;
