const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { Item } = require('@bimo/core-utils-collection');

const VehicleStandbyClassFactory = ({ BlockActivityItemMixin }) => {
  class VehicleStandby extends BlockActivityItemMixin(
    Item,
    {
      blkActIdPropName: 'blkactVehicleStandbyNo',
      itemIdPropName: 'sdbyStandbyNo',
      placePropName: 'sdbyPlace',
      startTimePropName: 'sdbyStartTime',
      endTimePropName: 'sdbyEndTime',
    },
  ) {
    constructor(props) {
      super(props);
      /** */ this.bimoId = getAndValidatePropFromProps('bimoId', props);
      /** */ this._sdbyStandbyNo = getAndValidatePropFromProps('sdbyStandbyNo', props);
      if (!this._sdbyStandbyNo) this._sdbyStandbyNo = this.bimoId;

      /** */ this.sdbyStartTime = getAndValidatePropFromProps('sdbyStartTime', props);
      /** */ this.sdbyEndTime = getAndValidatePropFromProps('sdbyEndTime', props);
      /** */ this.sdbyPlace = getAndValidatePropFromProps('sdbyPlace', props);
      /** */ this.sdbyOperateSun = getAndValidatePropFromProps('sdbyOperateSun', props);
      /** */ this.sdbyOperateMon = getAndValidatePropFromProps('sdbyOperateMon', props);
      /** */ this.sdbyOperateTue = getAndValidatePropFromProps('sdbyOperateTue', props);
      /** */ this.sdbyOperateWed = getAndValidatePropFromProps('sdbyOperateWed', props);
      /** */ this.sdbyOperateThu = getAndValidatePropFromProps('sdbyOperateThu', props);
      /** */ this.sdbyOperateFri = getAndValidatePropFromProps('sdbyOperateFri', props);
      /** */ this.sdbyOperateSat = getAndValidatePropFromProps('sdbyOperateSat', props);
      /** */ this.sdbyEvent = getAndValidatePropFromProps('sdbyEvent', props);
      /** */ this.sdbyEventStatus = getAndValidatePropFromProps('sdbyEventStatus', props);
      /** */ this.sdbyComment = getAndValidatePropFromProps('sdbyComment', props);
      /** */ this.sdbyCouvertureAdcNecessaire = getAndValidatePropFromProps('sdbyCouvertureAdcNecessaire', props);
    }

    get sdbyStandbyNo() {
      return this._sdbyStandbyNo;
    }

    set sdbyStandbyNo(v) {
      if (this.parent && this.parent.invalidateItemByBusinessId) {
        this.parent.invalidateItemByBusinessId();
      }
      this._sdbyStandbyNo = v;
    }
  }

  /* Serialization utilities */
  VehicleStandby.allChildClasses = getAllChildClasses(childClasses);
  VehicleStandby.prototype.serializeModel = serializeThis;
  VehicleStandby.parseModel = parseThis;

  return VehicleStandby;
};

module.exports = VehicleStandbyClassFactory;
