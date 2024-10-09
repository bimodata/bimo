import { Logger, LogLevel } from "@bimo/core-global-types";

export function getStupidLogger(
  silentMode = false,
  { mutedLevels }: { mutedLevels: LogLevel[] } = { mutedLevels: [] }
): Logger {

  const logMessage = (message: string, level: LogLevel) => {
        // eslint-disable-next-line no-console
        if (silentMode || mutedLevels.includes(level)) return
        console.log(`logger(${level}): ${message}`);
      };
      
  const logOrThrow = (level: LogLevel | "throw", message: string) => {
    if (level === "throw") throw new Error(message);
    return logMessage(message, level);
  };
  return {
    OFF: () => {},
    silly: (message: string) => logMessage(message, `silly`),
    trace: (message: string) => logMessage(message, `trace`),
    debug: (message: string) => logMessage(message, `debug`),
    info: (message: string) => logMessage(message, `info`),
    progress: (message: string) => logMessage(message, `progress`),
    warning: (message: string) => logMessage(message, `warn`),
    warn: (message: string) => logMessage(message, `warn`),
    error: (message: string) => logMessage(message, `error`),
    throw: (message: string) => {
      throw new Error(message);
    },
    logOrThrow,
    logNotice: ({ level, message }) => logOrThrow(level, message),
  };
}

export default getStupidLogger;
