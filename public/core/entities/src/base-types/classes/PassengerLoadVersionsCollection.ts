import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import {
  PassengerLoadVersion,
  PassengerLoadVersionProps,
} from "./PassengerLoadVersion";
export interface PassengerLoadVersionsCollectionProps
  extends ExtendedCollectionProps<PassengerLoadVersion, PassengerLoadVersionProps> {}
export declare class PassengerLoadVersionsCollection extends Collection<
  PassengerLoadVersion,
  PassengerLoadVersionProps
> {
  constructor(props?: PassengerLoadVersionsCollectionProps);
  /**
   * @param oirStyleData - données en "style" oir, telles qu'obtenues de OIG-OIR-to-JSON
   */
  static createFromOirStyleData(oirStyleData: any): PassengerLoadVersionsCollection;
  generateOirStyleData(): {
    passenger_load_version: any[];
  };
}
