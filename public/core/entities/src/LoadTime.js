const { Item } = require('@bimo/core-utils-collection');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

/* Linked Classes */

const childClasses = [];

/* Class definition */
class LoadTime extends Item {
  constructor(props) {
    super(props);
    this.bimoId = getAndValidatePropFromProps('bimoId', props);
    this.ltPlaceId = getAndValidatePropFromProps('ltPlaceId', props, `string`);
    this.ltLoadPlaceId = getAndValidatePropFromProps('ltLoadPlaceId', props, `string`);
    this.ltPeriodStartTime = getAndValidatePropFromProps('ltPeriodStartTime', props, `string`);
    this.ltPeriodEndTime = getAndValidatePropFromProps('ltPeriodEndTime', props, `string`);
    this.ltDirection = getAndValidatePropFromProps('ltDirection', props, `string`);
    this.ltLoadTime = getAndValidatePropFromProps('ltLoadTime', props, `string`);
    this.ltRouteId = getAndValidatePropFromProps('ltRouteId', props, `string`);
    this.ltVariantId = getAndValidatePropFromProps('ltVariantId', props, `string`);
    this.ltNetworkEventId = getAndValidatePropFromProps('ltNetworkEventId', props, `string`);
    this.ltDetourId = getAndValidatePropFromProps('ltDetourId', props, `string`);
  }

  /** @type {string} key made of all attributes except the loadtime */
  get key() {
    return `${this.ltPlaceId}|${this.ltLoadPlaceId}|${this.ltPeriodStartTime}|${this.ltPeriodEndTime}`
      + `|${this.ltRouteId}|${this.ltVariantId}|${this.ltNetworkEventId}|${this.ltDetourId}`;
  }

  /** @type {string} key made of all attributes including the loadtime */
  get keyWithTime() {
    return `${this.ltPlaceId}|${this.ltLoadPlaceId}|${this.ltPeriodStartTime}|${this.ltPeriodEndTime}`
      + `|${this.ltRouteId}|${this.ltVariantId}|${this.ltNetworkEventId}|${this.ltDetourId}:${this.ltLoadTime}`;
  }
}

LoadTime.hastusKeywords = ['loadtime'];
LoadTime.hastusObject = 'load_time';

/* Serialization utilities */
LoadTime.allChildClasses = getAllChildClasses(childClasses);
LoadTime.prototype.serializeModel = serializeThis;
LoadTime.parseModel = parseThis;

module.exports = LoadTime;
