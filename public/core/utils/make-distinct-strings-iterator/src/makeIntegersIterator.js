function* makeIntegersIterator({ start = 0, end = Infinity, step = 1 }) {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
    iterationCount += 1;
    yield i;
  }
  return iterationCount;
}

module.exports = makeIntegersIterator;
