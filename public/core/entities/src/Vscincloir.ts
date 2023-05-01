import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { VehicleSchedule } from "./VehicleSchedule";
import VehicleSchedulesCollection from "./VehicleSchedulesCollection";

export interface VscincloirProps extends ExtendedItemProps {
  vscincloirIntKey?: string;
  bimoId?: string;
}

export class Vscincloir extends Item<Vscincloir> {
  vscincloirIntKey: string;
  bimoId?: string;
  constructor(props: VscincloirProps) {
    super(props);
    this.vscincloirIntKey = gavpfp("vscincloirIntKey", props);
    this.bimoId = gavpfp("bimoId", props);
  }

  get vehicleSchedule() {
    return this.parent && (this.parent.parent as unknown as VehicleSchedule);
  }

  get vscsCollection() {
    return (
      this.vehicleSchedule && (this.vehicleSchedule.parent as VehicleSchedulesCollection)
    );
  }

  get vsc(): VehicleSchedule | null {
    return this._getAndSetCachedValue("vsc", () => {
      const includedVsc =
        this.vscsCollection?.getById(this.vscincloirIntKey) ??
        this.context?.loadedVscs?.find(
          (candidateVsc: VehicleSchedule) =>
            candidateVsc.vscIntId === this.vscincloirIntKey
        );

      if (!includedVsc) return null;

      includedVsc.addBlockingVsc(this.vehicleSchedule);
      return includedVsc;
    });
  }

  set vsc(v) {
    if (this.vsc !== null && v !== this.vsc) {
      throw new Error(
        `${v?.shortLoggingOutput} should equal ${this.vsc.shortLoggingOutput}`
      );
    }
    if (v?.vscIntId !== this.vscincloirIntKey) {
      throw new Error(`${v?.vscIntId} should equal ${this.vscincloirIntKey}`);
    }
    this._setCachedValue("vsc", v);
  }
}

Vscincloir.hastusKeywords = ["vscincloir"];
Vscincloir.hastusObject = "vscincloir";

Vscincloir.allChildClasses = getAllChildClasses(childClasses);

export default Vscincloir;
