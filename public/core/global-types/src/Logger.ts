export interface LogFunction {
  (message: string, type?: string): void;
}
export interface LogProgressFunction {
  (message: string, type?: string, percentage?: number): void;
}

export type LogLevel =
  | "OFF"
  | "silly"
  | "trace"
  | "debug"
  | "info"
  | "progress"
  | "warn"
  | "error";

export interface Logger {
  OFF: LogFunction;
  silly: LogFunction;
  trace: LogFunction;
  debug: LogFunction;
  info: LogFunction;
  progress: LogProgressFunction;
  warning: LogFunction;
  warn: LogFunction;
  error: LogFunction;
  logSilly?: LogFunction;
  logTrace?: LogFunction;
  logDebug?: LogFunction;
  logInfo?: LogFunction;
  logProgress?: LogProgressFunction;
  logWarning?: LogFunction;
  logError?: LogFunction;
  throw: (message: string) => never;
  logOrThrow: (level: LogLevel | "throw", message: string, type?: string) => void | never;
  logNotice: (params: {
    level: LogLevel | "throw";
    message: string;
    type?: string;
  }) => void | never;
  context?: LoggerContext;
}

export interface LoggerContext {
  [key: string]: any;
}
