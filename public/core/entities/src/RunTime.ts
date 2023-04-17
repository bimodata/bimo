const { Item } = require('@bimo/core-utils-collection');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

/* Linked Classes */

const childClasses = [];

/* Class definition */
class RunTime extends Item {
  constructor(props) {
    super(props);
    this.bimoId = getAndValidatePropFromProps('bimoId', props);
    this.rtStartPlaceId = getAndValidatePropFromProps('rtStartPlaceId', props, `string`);
    this.rtEndPlaceId = getAndValidatePropFromProps('rtEndPlaceId', props, `string`);
    this.rtPeriodStartTime = getAndValidatePropFromProps('rtPeriodStartTime', props, `string`);
    this.rtPeriodEndTime = getAndValidatePropFromProps('rtPeriodEndTime', props, `string`);
    this.rtRunTime = getAndValidatePropFromProps('rtRunTime', props, `string`);
    this.rtRouteId = getAndValidatePropFromProps('rtRouteId', props, `string`);
    this.rtVariantId = getAndValidatePropFromProps('rtVariantId', props, `string`);
    this.rtNetworkEventId = getAndValidatePropFromProps('rtNetworkEventId', props, `string`);
    this.rtDetourId = getAndValidatePropFromProps('rtDetourId', props, `string`);

    this.parent = props.parent;
  }

  copy() {
    const copiedItem = new RunTime(this);
    return copiedItem;
  }

  get runTimeVersion() {
    return this.parent && this.parent.parent;
  }

  get od() {
    return `${this.rtStartPlaceId} -> ${this.rtEndPlaceId}`;
  }

  /** @type {string} key made of all attributes except the runtime */
  get key() {
    return `${this.rtStartPlaceId}|${this.rtEndPlaceId}|${this.rtPeriodStartTime}|${this.rtPeriodEndTime}`
      + `|${this.rtRouteId}|${this.rtVariantId}|${this.rtNetworkEventId}|${this.rtDetourId}`;
  }

  /** @type {string} key made of all attributes including the runtime */
  get keyWithTime() {
    return `${this.rtStartPlaceId}|${this.rtEndPlaceId}|${this.rtPeriodStartTime}|${this.rtPeriodEndTime}`
      + `|${this.rtRouteId}|${this.rtVariantId}|${this.rtNetworkEventId}|${this.rtDetourId}:${this.rtRunTime}`;
  }

  get shortLoggingOutput() {
    return `${this.rtStartPlaceId} -> ${this.rtEndPlaceId} (${this.rtRouteId}|${this.rtVariantId}) : ${this.rtRunTime}`;
  }
}

RunTime.hastusKeywords = ['runtime'];
RunTime.hastusObject = 'run_time';

/* Serialization utilities */
RunTime.allChildClasses = getAllChildClasses(childClasses);
RunTime.prototype.serializeModel = serializeThis;
RunTime.parseModel = parseThis;

module.exports = RunTime;
