import { Logger } from "@bimo/core-utils-logging";

export interface BimoContext {
  [key: string]: any;
  logger?: Logger;
}
