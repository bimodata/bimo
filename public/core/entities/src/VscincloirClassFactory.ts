/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { Item } = require('@bimo/core-utils-collection');

const VscincloirClassFactory = () => {
  class Vscincloir extends Item {
    constructor(props) {
      super(props);
      this.vscincloirIntKey = getAndValidatePropFromProps('vscincloirIntKey', props);
      this.bimoId = getAndValidatePropFromProps('bimoId', props);
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

  /* Serialization utilities */
  Vscincloir.allChildClasses = getAllChildClasses(childClasses);
  Vscincloir.prototype.serializeModel = serializeThis;
  Vscincloir.parseModel = parseThis;

  return Vscincloir;
};

module.exports = VscincloirClassFactory;
