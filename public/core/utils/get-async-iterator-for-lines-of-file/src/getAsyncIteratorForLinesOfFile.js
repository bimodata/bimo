/* eslint-disable no-await-in-loop */

const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const LineByLineReader = require('line-by-line');

/**
 * Returns an async iterator that will yield a single line of the provided file on each
 * .next() call, without ever loading the whole file in memory.
 *
 * You can adjust the balance between speed and memory consumption by adjusting the
 * maxNumberOfLinesToLoadInMemory parameter. Keep it low to guarantee a low memory consumption,
 * but be aware that this will slow the process: the number of calls to "setImmediate" will be
 * higher.
 *
 * The right setting also depends on the speed at which you consume the lines. If your app
 * consumes lines faster than LineReader provides them, you can the parameter very high without
 * worry.
 *
 * @param {string} filePath
 * @param {GetIteratorForLinesOfHugeFileConfig} config
 * @param {Object} context
 * @returns {AsyncIterator}
 */
async function* getAsyncIteratorForLinesOfFile(filePath, config, context) {
  const logger = getAndAddLoggerToServiceOptions(context);

  const {
    firstLineToProcess = 1, lastLineToProcess = -1,
    maxNumberOfLinesToLoadInMemory = 175, lineNumberTraceStep = 250000,
  } = config;

  let lineNumber = 0;
  /** @type {string} */
  let firstLine = null;
  const nextLines = [];
  let maxLength = 0;
  let lineReaderIsActive = true;

  const lineReader = new LineByLineReader(filePath, config);

  const readLinesAndReturnFirst = new Promise((resolve, reject) => {
    lineReader.on('error', (err) => {
      logger.error(err);
      lineReaderIsActive = false;
      reject(err);
    });

    lineReader.on('line', (line) => {
      lineReader.pause();
      lineNumber += 1;

      if (lineNumber % lineNumberTraceStep === 0) {
        logger.trace(`Line ${lineNumber}`);
      }

      if (lineNumber < firstLineToProcess) {
        lineReader.resume();
      }
      else if (lineNumber === lastLineToProcess + 1) {
        logger.debug('Reached specified lineNumber - interrupting');
        lineReaderIsActive = false;
        lineReader.close();
      }
      else {
        nextLines.push({ line, lineNumber });
        if (nextLines.length > maxLength) maxLength = nextLines.length;
        if (!firstLine) resolve(line);
        if (nextLines.length < maxNumberOfLinesToLoadInMemory) {
          lineReader.resume();
        }
      }
    });

    lineReader.on('end', () => {
      lineReaderIsActive = false;
      logger.debug(`LineReader reached the end of the file after ${lineNumber} lines`);
      reject(new Error(`End event was emitted before any line event were emitted`));
    });
  });

  // Make sure that lineReader has loaded before going into the loop
  firstLine = await readLinesAndReturnFirst;
  logger.debug(`First line was read: ${firstLine}`);

  while (lineReaderIsActive || nextLines.length > 0) {
    if (nextLines.length > 0) {
      yield nextLines.shift();
    }
    else {
      lineReader.resume();
      // Make sure that lineReader has "time" to read the next line before next loop iteration
      await new Promise((resolve) => setImmediate(() => resolve()));
    }
  }
  lineReader.close();
}

module.exports = getAsyncIteratorForLinesOfFile;

/**
 * @typedef {Object} GetIteratorForLinesOfHugeFileConfig
 * @property {number} [firstLineToProcess=1]
 * @property {number} [lastLineToProcess=-1]
 * @property {string} [encoding=utf8]
 * @property {number} [maxNumberOfLinesToLoadInMemory=175] - @see getAsyncIteratorForLinesOfFile
 * @property {number} [lineNumberTraceStep=250000] - the step at which a trace containing the current
 * line number should be emitted. This includes the lines before firstLineToProcess (which we currently
 * have to pass over, to count them, to know when to start processing)
 */
