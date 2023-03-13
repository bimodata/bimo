const mergeSets = (...sets) => new Set(function* () {
  for (const set of sets) yield* set;
}());

exports.mergeSets = mergeSets;
