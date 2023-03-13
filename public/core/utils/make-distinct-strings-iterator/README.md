# `@bimo/core-utils-make-distinct-strings-iterator`

makeDistinctStringsIterator is a generator function (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators).

It returns an iterator that is meant to provide distinct string values every time it is called.

A typical use case for this is to generate suffixes or prefixes that can be appended to strings that would otherwise be identical but need to be distinct.

Example: we generate variants based on a collection of trips. The variant identifier is limited to 8 characters in lenght, and we want it to have some sort of meaning. The identifier that is agreed upon is "ABC>DEFx", where ABC is the shorthand for the start place of the variant, DEF the shorthand of the end place of the variant, anx x is a suffix that is used to disambiguate variants that have the same start and end place, but different intermediate places (or other characteristics). Since we are limited to 8 characters, and place shorthands are 3 chars long, and we want to keep the > for readability, that leaves only one character for disambiguation. The most readable suffix in this case is to use numbers, since the rest of the string is made of letters. That leaves 9 (10 if you use 0) possibilities, which might not be enough. We could instead use lowercase letters (since the rest of the string is upper case, this is kind of readable) which would give 26 possibilities. Or use a mix of both: first use numbers, which should be enough for most cases, and provide maximum readability, then use letters if needed.

The idea of this package is to make it easy to handle such scenarios, by providing predefined "iterator flavors" that are easy to call in any function.
