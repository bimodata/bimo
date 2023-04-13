# `@bimo/core-utils-yield-and-log-progress-in-async-loop`

When you loop over a large number of objects and perform operations on them in a syncrhonous manner, in a single-threaded setup, everything freezes until the loop is over.

When you want to avoid this, you can convert your loop to an async loop (using `@bimo/core-utils-async-for-each`) and use `@bimo/core-utils-yield-and-log-progress-in-async-loop` to periodically yield the thread back to other needs, and log progress.

## Example:

We have the following sync code:

```javascript
rawTrainPathsCollection.forEach((rawTrainPath) => {
  if (trainPathShouldBeSelected(rawTrainPath)) {
    moveOrCopyTrainPathToScheduledService(
      { trainPath: rawTrainPath, scheduledService },
      { moveOrCopyTrainPaths },
      context
    );
  }
});
```

When `rawTrainPathsCollection` contains 12000 trains paths, this can get pretty long, and the UI is frozen during a few minutes.

To avoid this, we switch to:

```javascript
const totalNbOfIndexes = rawTrainPathsCollection.length;
await rawTrainPathsCollection.asyncForEach(async (rawTrainPath, index) => {
  await yieldAndLogProgressInAsyncLoop(
    index,
    totalNbOfIndexes,
    logger,
    `Sélection des sillons`,
    100
  );
  if (trainPathShouldBeSelected(rawTrainPath)) {
    moveOrCopyTrainPathToScheduledService(
      { trainPath: rawTrainPath, scheduledService },
      { moveOrCopyTrainPaths },
      context
    );
  }
});
```

And now every 100 train path, the ui unfreezes and logs a progress message.
