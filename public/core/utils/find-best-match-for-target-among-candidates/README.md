# `@bimo/core-utils-find-best-match-for-target-among-candidates`

Finds the best match for a target among a list of candidates

```javascript
const bestMatch = findBestMatchForTargetAmongCandidates(
  { target, candidates },
  config,
  context
);
```

## Principles

This service will try over multiple iterations to find a satisfying match for a target among a list of candidates.

In each iteration, it goes through two phases:

1. Reduce the list of candidates
2. Compute a distance between the target and each of the remaining candidates, and declare bestMatch if the criteria are met

This gives a lot of flexibility in the configuration, and makes it possible to always find a match by making the iterations looser and looser, while keeping a good performance by having first iterations that are strict.

- You can have a first iteration in which you use a very small list of candidates, but have high criteria for a good match - if you do find a very good match in this small list, you are out of there quickly !
- If the first iteration didn't work, you can have a second iteration with more candidates, and the same high criteria for a good match !
- If it still doesn't work, maybe it's time for you to loosen your criteria a bit ...

You have very good control over the notices that are emitted at each iteration: if you do have to loosen your criteria to find a match in iteration #326, and are not convinced that it really is such a good match, you can warn your user about it !

### Phase 1 : reduce the list of candidates

Options for this phase are provided in the `candidatesFilteringConfig` key of the global config.
If this key is null of undefined, all candidates are used. If the key is defined, candidates are filtered through 2 sub-phases

#### Phase 1A: filterPredicate

This phase is useful to eliminate candidates based on fixed criteria, that do not depend on the target.

If it's provided, `candidatesFilteringConfig.filterPredicate` will be passed through [\_.iteratee](https://lodash.com/docs/#iteratee) to create a callback, and this callback will be used to filter the candidates.

##### Example

TODO

#### Phase 1B: groupCandidates and pick the group that matches the key

This phase is useful to keep only the candidates that have some characteristic in common with the target. First, we group all the candidates according this characteristic, then we compute the characteristic on the target, and keep only the candidates that had the same characteristic as the target.

If `candidatesFilteringConfig.groupCandidatesByConfig` is not provided, this phase is avoided. Otherwise, the remaining candidates are grouped according to `groupCandidatesByConfig`.

If `groupCandidatesByConfig` is a string, `Collection.groupByProp` is used. All of the candidates that have the same value for the given prop end up in the same group.

If `groupCandidatesByConfig` is a function, `Collection.groupByCustomKey` is used. All of the candidates are passed through the function to generate a key, and the candidates that have the same key end up in the same group.

Next, a key is generated from the target by calling computeItemKey on the target and passsing `candidatesFilteringConfig.getKeyFromTargetConfig` as the config.

Finally, the group of candidates that match the key is returned.

##### Example

We have 5 places as candidates: 2 places that have "Agathe" in plcSource, and 3 places that have "REFPROD" in plcSource. `candidatesFilteringConfig.groupCandidatesByConfig = plcSource`

We will end up with a group of 2 places, with the key "Agathe", and a group of 3 places, with the key "REFPROD".

Our target is a random object that looks like this:

```javascript
const target = {
  id: "toto",
  desc: "tutu",
  meta: {
    source: "Agathe",
    extractedAt: 12346345125,
  },
};
```

`candidatesFilteringConfig.getKeyFromTargetConfig = 'meta.source'`

When passing the object to computeItemKey, we will get "Agathe".

This final list of candidates that will be used will be the group of 2 places with the key Agathe.

### Phase 2 : find the best candidate among the remaining ones

Options for this phase are provided in the `getBestMatchConfig` key of the global config.

This config consists of:

```javascript
const {
  keyFunction = (o) => JSON.stringify(o),
  distanceFunction = (t, c) => levenshtein(keyFunction(t), keyFunction(c)),
  detailedResults = false,
  maxDistance = Number.POSITIVE_INFINITY,
} = config;
```

The most important keys are `distanceFunction` and `maxDistance`

`distanceFunction` is a function that will be called for each candidate, with the following signature:
`distanceFunction(target, candidate, config, context): Number`

The better the match between target and candidate, the smaller the return value. If the return value is 0, the match is considered perfect, and the other candidates will not even be evaluated, unless explicitly requested via `detailedResults = true`. If none of the candidates has a distance of 0, the one with the smallest distance will be returned as the best match, unless none of the candidates has a distance smaller than maxDistance.
