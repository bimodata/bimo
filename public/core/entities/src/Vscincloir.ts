


const childClasses = [];
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";


export interface VscincloirProps extends ExtendedItemProps {
  vscincloirIntKey?: string;
  bimoId?: string;
}

export class Vscincloir extends Item<Vscincloir> {
  vscincloirIntKey?: string;
  bimoId?: string;
  constructor(props: VscincloirProps) {
    super(props);
    this.vscincloirIntKey = gavpfp('vscincloirIntKey', props);
    this.bimoId = gavpfp('bimoId', props);
  }

  get vscsCollection() {
    return this.parent?.parent?.parent;
  }

  /** @type {import ('./VehicleSchedule')} */
  get vsc() {
    return this._getAndSetCachedValue('vsc', () => {
      const includedVsc = this.vscsCollection?.getById(this.vscincloirIntKey)
        ?? this.context?.loadedVscs?.find((candidateVsc) => candidateVsc.vscIntId === this.vscincloirIntKey);

      if (!includedVsc) return null;

      includedVsc.addBlockingVsc(this.parent.parent);
      return includedVsc;
    });
  }

  set vsc(v) {
    if (this.vsc !== null && v !== this.vsc) {
      throw new Error(`${v.shortLoggingOutput} should equal ${this.vsc.shortLoggingOutput}`);
    }
    if (v.vscIntId !== this.vscincloirIntKey) {
      throw new Error(`${v.vscIntId} should equal ${this.vscincloirIntKey}`);
    }
    this._setCachedValue('vsc', v);
  }
}

Vscincloir.hastusKeywords = ['vscincloir'];
Vscincloir.hastusObject = 'vscincloir';


Vscincloir.allChildClasses = getAllChildClasses(childClasses);



export default Vscincloir;
