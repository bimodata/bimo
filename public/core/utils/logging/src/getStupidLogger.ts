import { Logger, LogLevel } from "@bimo/core-global-types";

export function getStupidLogger(silentMode = false): Logger {
  const doNothing = function doNothing() {};

  const functionToUse = silentMode
    ? doNothing
    : (message: string, level: LogLevel) => {
        // eslint-disable-next-line no-console
        console.log(`logger(${level}): ${message}`);
      };
  const logOrThrow = (level: LogLevel | "throw", message: string) => {
    if (level === "throw") throw new Error(message);
    return functionToUse(message, level);
  };
  return {
    OFF: () => {},
    silly: (message: string) => functionToUse(message, `silly`),
    trace: (message: string) => functionToUse(message, `trace`),
    debug: (message: string) => functionToUse(message, `debug`),
    info: (message: string) => functionToUse(message, `info`),
    progress: (message: string) => functionToUse(message, `progress`),
    warning: (message: string) => functionToUse(message, `warn`),
    warn: (message: string) => functionToUse(message, `warn`),
    error: (message: string) => functionToUse(message, `error`),
    throw: (message: string) => {
      throw new Error(message);
    },
    logOrThrow,
    logNotice: ({ level, message }) => logOrThrow(level, message),
  };
}

export default getStupidLogger;
