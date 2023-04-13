async function yieldAndLogProgressInAsyncLoop(currentIndex, totalNbOfIndexes, logger, progressMessage, step = 10) {
  if (((currentIndex + 1) % step) === 0) {
    const percentage = totalNbOfIndexes && (((currentIndex / totalNbOfIndexes) * 100).toFixed(0));
    const fullMessage = `${progressMessage}: ${percentage
      ? ` traitement complété à ${percentage} %`
      : `${currentIndex + 1} éléments traités`}`;
    logger.progress(fullMessage);
    await new Promise((resolve) => {
      setImmediate(() => resolve());
    });
  }
}

module.exports = { yieldAndLogProgressInAsyncLoop };
