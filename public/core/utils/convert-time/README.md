# `@bimo/core-utils-convert-date-time`

Converts a time or DateTime from a format to another.

## Managing times around midnight

When managing times around midnight, it is often necessary to know if the time should be considered as very early on the beginning of the current operating day, or very late at the end of the previous operating day.

The best example is a trip that leaves its origin at 23h55, and reaches its destination 10 minutes later, at 00h05 the next day.

When working with times without dates, there is no easy way of knowing that the 00h05 should be seen as the next day.

Some time formats, like the Hastus extended hours format, solve this by allowing the use of more than 24 hours in a day. The 00h05 would then be noted as 24:05.

Therefore, when converting a single time from a given format to the Hastus extended hours format (or any other format that accounts for day differences), the client that calls `convertTime` might want to adjust the duration.

`convertTime` provides two mechanisms for that.
They can be used individually, or combined.

### config.durationAdjustementObject

This is typically useful for cases where you have a time shortly after midnight that you would rather consider as very late on day 1 rather than very early on day 2.

For example, the last trip of the day leaves station A at 00:04:00 and arrives at station B at 00:34:30.

When converting those iso times into Hastus times, you would like to get times of 24:04;00 and 24:34;30 instead of 00:04;00 and 00:34;30.

To do so, you can provide a durationAdjustementObject with value `{day: 1}`

### config.lowerBoundDuration

This is typically useful for cases where you plan on converting multiple times before and after midnight, and make sure they are all coherent with each other.

For example, a trip leaves station A at 23:58, passes at station B at 01:00, then arrives at station C at 04:00.

You could have a rule that says that any time before 03:00 should be considered as the end of the previous day, and use `durationAdjustementObject` to handle this. But this would not work on the 04:00 time at station C. (Unless you make your pivot time 04:00, but then what if you have trips that do start at 03:45 and that you want to consider as the current day ?)

`lowerBoundDuration` is made for that: when it is set, it will ensure that the return value is never smaller than the lowerBoundDuration, and automatically add 1 day to the duration.

When converting times of a trip, setting lowerBoundDuration to the start time of the trip should do the trick. For complex cases, like trips that span more than 24 hours, you could also set it to the time of the previous trip point.
