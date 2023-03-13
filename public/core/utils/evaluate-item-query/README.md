# `@bimo/core-utils-evaluate-item-query`

Evaluate a `BimoItemQuery` against an item. Returns true if the item matches the query, false otherwise.

BimoItemQuery can be a function or an object.

In the function form, it is a function that takes the item as only parameter, and returns a boolean.

In the object form, it is a json-query-matcher query. See https://www.npmjs.com/package/json-query-matcher?activeTab=readme
