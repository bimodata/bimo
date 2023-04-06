import _ from "lodash";

export function partition(
  collection: any[],
  iteratee: Function | object | string[] | string
) {
  const matchedValues: any[] = [];
  const unmatchedValues: any[] = [];
  const callback = _.iteratee(iteratee);
  collection.forEach((value, index, array) => {
    if (callback(value, index, array)) {
      matchedValues.push(value);
    } else {
      unmatchedValues.push(value);
    }
  });
  return [matchedValues, unmatchedValues];
}

export default partition;
