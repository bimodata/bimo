const _ = require('lodash');

const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const Item = require('@bimo/core-utils-item');

const RouteClassFactory = ({ VariantsCollection }) => {
  const childClasses = [VariantsCollection];

  class Route extends Item {
    constructor(props) {
      super(props);

      this.bimoId = getAndValidatePropFromProps('bimoId', props);
      this.rteVersion = getAndValidatePropFromProps('rteVersion', props, 'string');
      this.rteIdentifier = getAndValidatePropFromProps('rteIdentifier', props, 'string');
      this._rteDescription = getAndValidatePropFromProps('rteDescription', props, 'string');
      this.rteDirection = getAndValidatePropFromProps('rteDirection', props, 'string', '1');
      this.rteServiceType = getAndValidatePropFromProps('rteServiceType', props, 'string', '0');
      this.rteServiceMode = getAndValidatePropFromProps('rteServiceMode', props, 'string', '3');
      this.rteGarage = getAndValidatePropFromProps('rteGarage', props, 'string');
      this.rteGroup = getAndValidatePropFromProps('rteGroup', props, 'string');
      this.rteMainColorRgb = getAndValidatePropFromProps('rteMainColorRgb', props, 'string');
      this.rteSecondaryColorRgb = getAndValidatePropFromProps('rteSecondaryColorRgb', props, 'string');
      this.rteMainColorAdjustedRgb = getAndValidatePropFromProps('rteMainColorAdjustedRgb', props, 'string');
      this.rteSecondaryColorAdjustedRgb = getAndValidatePropFromProps('rteSecondaryColorAdjustedRgb', props, 'string');
      this.rtePubIdSpec = getAndValidatePropFromProps('rtePubIdSpec', props, 'string');
      this.rteForPublicInfo = getAndValidatePropFromProps('rteForPublicInfo', props, 'string');
      this.rtePublicRating = getAndValidatePropFromProps('rtePublicRating', props, 'string');
      this.rteReliability = getAndValidatePropFromProps('rteReliability', props, 'string');
      this.rtePubDir_1 = getAndValidatePropFromProps('rtePubDir_1', props, 'string');
      this.rtePubDir_2 = getAndValidatePropFromProps('rtePubDir_2', props, 'string');
      this.rteBasicVarDir_1 = getAndValidatePropFromProps('rteBasicVarDir_1', props, 'string');
      this.rteBasicVarDir_2 = getAndValidatePropFromProps('rteBasicVarDir_2', props, 'string');
      this.rteUrl = getAndValidatePropFromProps('rteUrl', props, 'string');
      this.rteMainPpatDir_1 = getAndValidatePropFromProps('rteMainPpatDir_1', props, 'string');
      this.rteMainPpatDir_2 = getAndValidatePropFromProps('rteMainPpatDir_2', props, 'string');
      this.rteDriverPpat_1 = getAndValidatePropFromProps('rteDriverPpat_1', props, 'string');
      this.rteDriverPpat_2 = getAndValidatePropFromProps('rteDriverPpat_2', props, 'string');
      this.rtePublicPpat_1 = getAndValidatePropFromProps('rtePublicPpat_1', props, 'string');
      this.rtePublicPpat_2 = getAndValidatePropFromProps('rtePublicPpat_2', props, 'string');
      this.rteSchedulerPpat_1 = getAndValidatePropFromProps('rteSchedulerPpat_1', props, 'string');
      this.rteSchedulerPpat_2 = getAndValidatePropFromProps('rteSchedulerPpat_2', props, 'string');
      this.rteDistrict = getAndValidatePropFromProps('rteDistrict', props, 'string');
      this.rteZone = getAndValidatePropFromProps('rteZone', props, 'string');
      this.rteIsCancelled = getAndValidatePropFromProps('rteIsCancelled', props, 'string', '0');

      /* Children */
      /** @type {VariantsCollection} */
      this.variants = getAndValidatePropFromProps('variants', props, VariantsCollection,
        new VariantsCollection(), { altPropName: 'variant' });
      this.variants.parent = this;

      this._links = {};
    }

    get rteDescription() {
      return _.truncate(this._rteDescription, { length: 40 });
    }

    set rteDescription(v) {
      this._rteDescription = v;
    }

    get isProductiveOnly() {
      return this.variants.every((variant) => variant.isProductive);
    }

    get isNonProductiveOnly() {
      return this.variants.every((variant) => !variant.isProductive);
    }

    addLink(type, value) {
      this._links[type] = value;
    }

    getLink(type) {
      return this._links[type];
    }

    removeLink(type) {
      delete this._links[type];
    }

    /**
     * Creates a new instance of a route. All variants are new instances too.
     * @param {string=} newRteIdentifier
     * @returns {Route}
     */
    copy(newRteIdentifier = this.rteIdentifier) {
      // @ts-ignore
      const copiedRoute = new this.constructor(this);
      copiedRoute.rteIdentifier = newRteIdentifier;
      const copiedVariants = this.variants.map((variant) => variant.copy());
      copiedRoute.variants = new VariantsCollection({ items: copiedVariants });
      copiedRoute.variants.parent = copiedRoute;
      copiedRoute.addLink('copiedFrom', this);
      return copiedRoute;
    }

    get shortLoggingOutput() {
      return `${this.rteIdentifier} (${this.rteVersion})`;
    }

    get mediumLoggingOutput() {
      return `${this.slo} (${this.variants.length} variantes)`;
    }

    getVariantsThatUseOneOfThesePlaces(listOfPlaces) {
      if (!listOfPlaces) {
        return undefined;
      }
      return this.variants.pick((variant) => variant.usesOneOfThesePlaces(listOfPlaces));
    }

    getVariantById(variantId) {
      return this.variants.getByPropName('varIdentifier', variantId);
    }

    get routeVersion() {
      return this.parent.parent;
    }
  }

  /* Serialization utilities */
  Route.allChildClasses = getAllChildClasses(childClasses);
  Route.prototype.serializeModel = serializeThis;
  Route.parseModel = parseThis;

  return Route;
};

module.exports = RouteClassFactory;
