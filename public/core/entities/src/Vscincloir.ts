import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { Vscincloir as BimoVscincloir } from "../base-types/rawIndex";
export { Vscincloir as BimoVscincloir } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { BimoVehicleSchedule } from "./VehicleSchedule";
import { BimoVehicleSchedulesCollection } from "./VehicleSchedulesCollection";
export interface VscincloirProps extends ExtendedItemProps {
  vscincloirIntKey?: string;
  bimoId?: string;
}
export function VscincloirClassFactory({}: EntityConstructorByEntityClassKey): typeof BimoVscincloir {
  class Vscincloir extends Item<Vscincloir> {
    vscincloirIntKey: string;
    bimoId?: string;
    constructor(props: VscincloirProps) {
      super(props);
      this.vscincloirIntKey = gavpfp("vscincloirIntKey", props);
      this.bimoId = gavpfp("bimoId", props);
    }

    get vehicleSchedule() {
      return this.parent && (this.parent.parent as unknown as BimoVehicleSchedule);
    }

    get vscsCollection() {
      return (
        this.vehicleSchedule &&
        (this.vehicleSchedule.parent as BimoVehicleSchedulesCollection)
      );
    }

    get vsc(): BimoVehicleSchedule | null {
      return this._getAndSetCachedValue("vsc", () => {
        const includedVsc =
          this.vscsCollection?.getById(this.vscincloirIntKey) ??
          this.context?.loadedVscs?.find(
            (candidateVsc: BimoVehicleSchedule) =>
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

  return Vscincloir;
}

export default VscincloirClassFactory;
