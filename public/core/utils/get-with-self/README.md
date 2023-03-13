# `@bimo/core-utils-get-with-self`

Like _.get, but with a special **self** keyword.
If the path is **self**, returns object.
If the last element of path is **self**, removes it from the path and returns what _.get would return.

Useful for cases where you generate objects and paths dynamically and don't know in advance if you are going to get a prop from an object or the object itself.
