/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { Item } = require('@bimo/core-utils-collection');

const MaintenanceClassFactory = ({ BlockActivityItemMixin }) => {
  class Maintenance extends BlockActivityItemMixin(
    Item,
    {
      blkActIdPropName: 'blkactMaintenanceNo',
      itemIdPropName: 'mtnInternalNumber',
      placePropName: 'mtnPlace',
      startTimePropName: 'mtnStartTime',
      endTimePropName: 'mtnEndTime',
    },
  ) {
    constructor(props) {
      super(props);
      /** */ this.bimoId = getAndValidatePropFromProps('bimoId', props);
      /** */ this._mtnInternalNumber = getAndValidatePropFromProps('mtnInternalNumber', props);
      if (!this._mtnInternalNumber) this._mtnInternalNumber = this.bimoId;

      /** */ this.mtnStartTime = getAndValidatePropFromProps('mtnStartTime', props);
      /** */ this.mtnEndTime = getAndValidatePropFromProps('mtnEndTime', props);
      /** */ this.mtnPlace = getAndValidatePropFromProps('mtnPlace', props);
      /** */ this.mtnVehicle = getAndValidatePropFromProps('mtnVehicle', props);
      /** */ this.mtnVehicleActivityId = getAndValidatePropFromProps('mtnVehicleActivityId', props);
      /** */ this.mtnOperateSun = getAndValidatePropFromProps('mtnOperateSun', props, 'string', '1');
      /** */ this.mtnOperateMon = getAndValidatePropFromProps('mtnOperateMon', props, 'string', '0');
      /** */ this.mtnOperateTue = getAndValidatePropFromProps('mtnOperateTue', props, 'string', '0');
      /** */ this.mtnOperateWed = getAndValidatePropFromProps('mtnOperateWed', props, 'string', '0');
      /** */ this.mtnOperateThu = getAndValidatePropFromProps('mtnOperateThu', props, 'string', '0');
      /** */ this.mtnOperateFri = getAndValidatePropFromProps('mtnOperateFri', props, 'string', '0');
      /** */ this.mtnOperateSat = getAndValidatePropFromProps('mtnOperateSat', props, 'string', '0');
      /** */ this.mtnEvent = getAndValidatePropFromProps('mtnEvent', props);
      /** */ this.mtnEventStatus = getAndValidatePropFromProps('mtnEventStatus', props);
      /** */ this.mtnComment = getAndValidatePropFromProps('mtnComment', props);
    }

    get blkactVehicleActivityTypeNo() {
      return activityTypeNoByMaintenanceVehicleActivityId[this.mtnVehicleActivityId];
    }

    get mtnInternalNumber() {
      return this._mtnInternalNumber;
    }

    set mtnInternalNumber(v) {
      if (this.parent && this.parent.invalidateItemByBusinessId) {
        this.parent.invalidateItemByBusinessId();
      }
      this._mtnInternalNumber = v;
    }

    get shortLoggingOutput() {
      return `[${this.mtnVehicleActivityId}]-${this.mtnPlace}-(${this.mtnStartTime}=>${this.mtnEndTime})`;
    }
  }

  /* Serialization utilities */
  Maintenance.allChildClasses = getAllChildClasses(childClasses);
  Maintenance.prototype.serializeModel = serializeThis;
  Maintenance.parseModel = parseThis;

  return Maintenance;
};

const activityTypeNoByMaintenanceVehicleActivityId = {
  PC: '10000',
  EJ: '10001',
};

module.exports = MaintenanceClassFactory;
