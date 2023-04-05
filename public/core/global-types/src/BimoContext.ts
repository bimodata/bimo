import { Logger } from "./Logger";

export interface BimoContext {
  [key: string]: any;
  logger?: Logger;
}
