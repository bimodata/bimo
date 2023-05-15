import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { VehicleSchedule } from "./VehicleSchedule";
import { VehicleSchedulesCollection } from "./VehicleSchedulesCollection";
export interface VscincloirProps extends ExtendedItemProps {
  vscincloirIntKey?: string;
  bimoId?: string;
}
export declare class Vscincloir extends Item<Vscincloir> {
  vscincloirIntKey: string;
  bimoId?: string;
  constructor(props: VscincloirProps);
  get vehicleSchedule(): VehicleSchedule | undefined;
  get vscsCollection(): VehicleSchedulesCollection | undefined;
  get vsc(): VehicleSchedule | null;
  set vsc(v: VehicleSchedule | null);
}
