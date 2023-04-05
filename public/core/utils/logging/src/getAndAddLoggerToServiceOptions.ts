import {
  BimoContext,
  Logger,
  LoggerContext,
  LogLevel,
} from "@bimo/core-global-types";

import getStupidLogger from "./getStupidLogger";

export function getAndAddLoggerToServiceOptions(
  options: BimoContext = {},
  newContext: LoggerContext = {}
) {
  const silentMode =
    options.silentMode === undefined ? true : options.silentMode;
  let logger: Logger;
  let context: LoggerContext;

  if (options.logger) {
    // todo: faire des vérifications. Ajouter une méthode .progress si pas présente ...
    logger = options.logger;
    context = options.logger.context || {};
    logger.context = context;
  } else if (options.task) {
    context = {};
    const logOrThrow = (
      level: LogLevel | "throw",
      message: string,
      type?: string
    ) => {
      if (level === "throw") throw new Error(message);
      if (level === "OFF") return null;
      return options.task.logNotice(message, type, level, context);
    };
    logger = {
      context,
      OFF: () => {},
      info: (message, type) => options.task.logInfo(message, type, context),
      logInfo: (message, type) => options.task.logInfo(message, type, context),
      trace: (message, type) => options.task.logTrace(message, type, context),
      logTrace: (message, type) =>
        options.task.logTrace(message, type, context),
      debug: (message, type) => options.task.logDebug(message, type, context),
      logDebug: (message, type) =>
        options.task.logDebug(message, type, context),
      error: (message, type) => options.task.logError(message, type, context),
      logError: (message, type) =>
        options.task.logError(message, type, context),
      warning: (message, type) =>
        options.task.logWarning(message, type, context),
      warn: (message, type) => options.task.logWarning(message, type, context),
      logWarning: (message, type) =>
        options.task.logWarning(message, type, context),
      progress: (message, type, percentage) =>
        options.task.logProgress(message, type, percentage, context),
      logProgress: (message, type, percentage) =>
        options.task.logProgress(message, type, percentage, context),
      silly: (message, type) => options.task.logSilly(message, type, context),
      throw: (message) => {
        throw new Error(message);
      },
      logOrThrow,
      logNotice: ({ level, message, type }) => logOrThrow(level, message, type),
    };
  } else {
    context = {};
    logger = getStupidLogger(silentMode);
    logger.context = context;
  }

  Object.assign(logger.context as LoggerContext, newContext);
  // eslint-disable-next-line no-param-reassign
  options.logger = logger;

  return logger;
}

export default getAndAddLoggerToServiceOptions;
