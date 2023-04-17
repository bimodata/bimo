/* Linked Classes */

/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const TripOrVariantPoint = require('./TripOrVariantPoint');

/**
 * Propriétés de point de variante
 * @typedef {Object} VariantPointProps
 * @property {string} varptPlace - place identifier
 * @property {Object=} parent - tripPointsCollection that contains this trip point
 * @see VariantPoint
 */

/* Class definition */
class VariantPoint extends TripOrVariantPoint {
  /**
   *
   * @param {VariantPointProps} props - props
   */
  constructor(props) {
    super(props, 'variant');
    this.varptIsTimingPoint = getAndValidatePropFromProps('varptIsTimingPoint', props, 'string', '1');
    this.varptPlace = getAndValidatePropFromProps('varptPlace', props, 'string');
    this.varptNoStopping = getAndValidatePropFromProps('varptNoStopping', props, 'string');

    /** en km */
    this.varptSpecTpDistance = getAndValidatePropFromProps('varptSpecTpDistance', props, 'string');
    this._varptPublicInfo = getAndValidatePropFromProps('varptPublicInfo', props, 'string');
    this.varptStop = getAndValidatePropFromProps('varptStop', props, 'string');
    this.varptRefStoploc = getAndValidatePropFromProps('varptRefStoploc', props, 'string');
    this.varptTimeFactor = getAndValidatePropFromProps('varptTimeFactor', props, 'string');
    this.varptRoutingPoint = getAndValidatePropFromProps('varptRoutingPoint', props, 'string');
    this.varptSpecDistrict = getAndValidatePropFromProps('varptSpecDistrict', props, 'string');
    this.varptSpecZone = getAndValidatePropFromProps('varptSpecZone', props, 'string');
    this.varptSpecPassengersMvmtRestrict = getAndValidatePropFromProps('varptSpecPassengersMvmtRestrict', props, 'string');
    this.varptLoadPlace = getAndValidatePropFromProps('varptLoadPlace', props, 'string');
    this.varptLoadDistrict = getAndValidatePropFromProps('varptLoadDistrict', props, 'string');
    this.varptLoadZone = getAndValidatePropFromProps('varptLoadZone', props, 'string');
    this.varptAllowLoadTime = getAndValidatePropFromProps('varptAllowLoadTime', props, 'string');

    /** en km */
    this.varptTpDistance = getAndValidatePropFromProps('varptTpDistance', props, 'string', this.varptSpecTpDistance);

    /** en mètres */
    this.varptDistance = getAndValidatePropFromProps('varptDistance', props, 'string');

    /**
     * ## Spécifique SNCF ## --> décision du 24/08/2022
     *
     * TODO: rendre modulaire les spécificités des exploitants ferroviaires
     */
    this.varptCodeCs = getAndValidatePropFromProps('varptCodeCs', props);
    this.varptTypeArret = getAndValidatePropFromProps('varptTypeArret', props);
    this.varptNaturePointDeCommutation = getAndValidatePropFromProps('varptNaturePointDeCommutation', props);
  }

  /** @type {import ('./Variant')} */
  get variant() {
    return this.parent && this.parent.parent;
  }

  copy() {
    const copiedItem = new VariantPoint(this);
    return copiedItem;
  }

  get varptPublicInfo() {
    return this.varptIsTimingPoint === '0' ? '0' : (this._varptPublicInfo || this.varptIsTimingPoint);
  }

  set varptPublicInfo(v) {
    this._varptPublicInfo = v;
  }

  /** @type {string} */
  get originalPlaceId() {
    return this.placeId;
  }

  // eslint-disable-next-line class-methods-use-this
  set originalPlaceId(v) {
    throw new Error(`originalPlaceId can not be set on VariantPoint`);
  }

  /** @type {string} */
  get variantId() {
    return this.variant.varIdentifier;
  }

  // eslint-disable-next-line class-methods-use-this
  set variantId(v) {
    throw new Error(`variantId can not be set on VariantPoint`);
  }

  get shortLoggingOutput() {
    return `${this.varptPlace}(noStopping:${this.varptNoStopping},`
      + ` loadTime:${this.varptAllowLoadTime} timingPoint:${this.varptIsTimingPoint})`;
  }

  get mediumLoggingOutput() {
    return this.shortLoggingOutput;
  }

  get longLoggingOutput() {
    return this.mediumLoggingOutput;
  }

  get _indexInParent() {
    if (!this.parent) return null;
    return this.parent.indexOf(this);
  }

  getNthPointFromThisOne(n) {
    return (this.parent && this.parent.items[this._indexInParent + n]) ?? null;
  }

  get nextPoint() {
    return this.getNthPointFromThisOne(1);
  }

  get previousPoint() {
    return this.getNthPointFromThisOne(-1);
  }
}

VariantPoint.hastusKeywords = ['rvpoint'];
VariantPoint.hastusObject = 'variant_point';

/* Serialization utilities */
VariantPoint.allChildClasses = getAllChildClasses(childClasses);
VariantPoint.prototype.serializeModel = serializeThis;
VariantPoint.parseModel = parseThis;

module.exports = VariantPoint;
