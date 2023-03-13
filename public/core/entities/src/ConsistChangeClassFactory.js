const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const Item = require('@bimo/core-utils-item');

const ConsistChangeClassFactory = ({ BlockActivityItemMixin }) => {
  class ConsistChange extends BlockActivityItemMixin(
    Item,
    {
      blkActIdPropName: 'blkactCchgNo',
      itemIdPropName: 'cchgInternalNumber',
      placePropName: 'cchgPlaceStart',
      startTimePropName: 'cchgTimeStart',
      endTimePropName: 'cchgTimeStart', // TODO: improve this
    },
  ) {
    constructor(props) {
      super(props);
      this.cchgActivity = getAndValidatePropFromProps('cchgActivity', props);
      this._cchgInternalNumber = getAndValidatePropFromProps('cchgInternalNumber', props);
      this._cchgBuildTime = getAndValidatePropFromProps('cchgBuildTime', props);
      this.cchgEvent = getAndValidatePropFromProps('cchgEvent', props);
      this.cchgEventStatus = getAndValidatePropFromProps('cchgEventStatus', props);
      this.cchgPlaceStart = getAndValidatePropFromProps('cchgPlaceStart', props);
      this._cchgTimeStart = getAndValidatePropFromProps('cchgTimeStart', props);
      this.cchgDuration = getAndValidatePropFromProps('cchgDuration', props);
      this.cchgOnTripNo = getAndValidatePropFromProps('cchgOnTripNo', props);
      this.cchgOrigOnTripNo = getAndValidatePropFromProps('cchgOrigOnTripNo', props);
      this.cchgUnitCount = getAndValidatePropFromProps('cchgUnitCount', props);
      this.cchgOnTrip = getAndValidatePropFromProps('cchgOnTrip', props);
      this.cchgIsRequired = getAndValidatePropFromProps('cchgIsRequired', props, 'string', '0');

      /** @type {string} - WARNING: this is the blkNumber, not the blkIntNumber */
      this.cchgRelatedBlock = getAndValidatePropFromProps('cchgRelatedBlock', props);
      /** @type {string} - This is currently not exported in default OIG but we add it because it makes senses */
      this.cchgRelatedBlockIntNo = getAndValidatePropFromProps('cchgRelatedBlockIntNo', props);

      /** @type {string} - WARNING: this is the blkNumber, not the blkIntNumber */
      this.cchgOntrpBlock = getAndValidatePropFromProps('cchgOntrpBlock', props);
      /** @type {string} - This is currently not exported in default OIG but we add it because it makes senses */
      this.cchgOntrpBlockIntNo = getAndValidatePropFromProps('cchgOntrpBlockIntNo', props);

      this.cchgComment = getAndValidatePropFromProps('cchgComment', props);
      this.cchgPosition = getAndValidatePropFromProps('cchgPosition', props, 'string', '0');
      this.cchgTimeSpecified = getAndValidatePropFromProps('cchgTimeSpecified', props);
      this.cchgOperatesSun = getAndValidatePropFromProps('cchgOperatesSun', props, 'string', '1');
      this.cchgOperatesMon = getAndValidatePropFromProps('cchgOperatesMon', props, 'string', '0');
      this.cchgOperatesTue = getAndValidatePropFromProps('cchgOperatesTue', props, 'string', '0');
      this.cchgOperatesWed = getAndValidatePropFromProps('cchgOperatesWed', props, 'string', '0');
      this.cchgOperatesThu = getAndValidatePropFromProps('cchgOperatesThu', props, 'string', '0');
      this.cchgOperatesFri = getAndValidatePropFromProps('cchgOperatesFri', props, 'string', '0');
      this.cchgOperatesSat = getAndValidatePropFromProps('cchgOperatesSat', props, 'string', '0');
      this.cchgFromNote = getAndValidatePropFromProps('cchgFromNote', props);
      this.cchgToNote = getAndValidatePropFromProps('cchgToNote', props);
    }

    /** @param {import ('./Trip')} newTrip */
    setNewTrip(newTrip) {
      this.cchgOnTripNo = newTrip.trpIntNumber;
    }

    get cchgInternalNumber() {
      return this._cchgInternalNumber;
    }

    set cchgInternalNumber(v) {
      if (this.parent && this.parent.invalidateItemByBusinessId) {
        this.parent.invalidateItemByBusinessId();
      }
      this._cchgInternalNumber = v;
    }

    get cchgBuildTime() {
      return this._cchgBuildTime || this._cchgTimeStart;
    }

    set cchgBuildTime(v) {
      this._cchgBuildTime = v;
    }

    get cchgTimeStart() {
      return this._cchgTimeStart || this._cchgBuildTime;
    }

    set cchgTimeStart(v) {
      this._cchgTimeStart = v;
    }

    get shortLoggingOutput() {
      return `${this.cchgActivity}-${this.cchgPlaceStart}-${this.cchgTimeStart}-${this.cchgOnTripNo}`;
    }
  }

  ConsistChange.allChildClasses = getAllChildClasses(childClasses);
  ConsistChange.prototype.serializeModel = serializeThis;
  ConsistChange.parseModel = parseThis;

  return ConsistChange;
};

module.exports = ConsistChangeClassFactory;
