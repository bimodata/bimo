const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const RoutesCollection = require('./RoutesCollection');
const VariantsCollection = require('./VariantsCollection');
const Variant = require('./Variant');
const VariantPointsCollection = require('./VariantPointsCollection');
const VehicleScheduleOrRouteVersion = require('./VehicleScheduleOrRouteVersion');
const TripOrVariantSectionsCollection = require('./TripOrVariantSectionsCollection');

const childClasses = [RoutesCollection];

/** @extends {VehicleScheduleOrRouteVersion<Variant>}  */
class RouteVersion extends VehicleScheduleOrRouteVersion {
  constructor(props) {
    super(props, 'variant');

    this.bimoId = getAndValidatePropFromProps('bimoId', props);
    this.rtevIdentifier = getAndValidatePropFromProps('rtevIdentifier', props);
    this.rtevDescription = getAndValidatePropFromProps('rtevDescription', props);
    this.rtevSchedulingUnit = getAndValidatePropFromProps('rtevSchedulingUnit', props);
    this.rtevEffectiveDate = getAndValidatePropFromProps('rtevEffectiveDate', props);
    this.rtevRailInfra = getAndValidatePropFromProps('rtevRailInfra', props, 'string', '0');
    this.rtevRoutesBasedOnRailLinks = getAndValidatePropFromProps('rtevRoutesBasedOnRailLinks', props, 'string', '0');
    this.rtevOwner = getAndValidatePropFromProps('rtevOwner', props, 'string', 'ADMIN');
    this.rtevPublicAccess = getAndValidatePropFromProps('rtevPublicAccess', props, 'string', '0');
    this.rtevDataGroup = getAndValidatePropFromProps('rtevDataGroup', props);

    /* Children */
    /** @type {RoutesCollection} */
    this.routes = getAndValidatePropFromProps('routes', props, RoutesCollection, new RoutesCollection());
    this.routes.parent = this;

    /* Links */

    this._cachedValueByValueKey = { variantsCollectionOfAllVariantsOfAllRoutes: null };
    this._links = {};
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

  removeVariant(variant) {
    this.variantsCollectionOfAllVariantsOfAllRoutes.remove(variant);
    this.getRouteById(variant.routeId).variants.remove(variant);
  }

  /**
   * Creates a new instance of a routeVersion. All routes are new instances too.
   * @param {string=} newRtevIdentifier
   * @returns {RouteVersion}
   */
  copy(newRtevIdentifier) {
    const copiedRouteVersion = new RouteVersion(this);
    copiedRouteVersion.rtevIdentifier = newRtevIdentifier;
    copiedRouteVersion.routes = new RoutesCollection({ items: this.routes.map((route) => route.copy()) });
    copiedRouteVersion.routes.parent = copiedRouteVersion;
    copiedRouteVersion.addLink('copiedFrom', this);
    return copiedRouteVersion;
  }

  get shortLoggingOutput() {
    return `${this.rtevIdentifier} - ${this.rtevDescription}`;
  }

  get mediumLoggingOutput() {
    return `${this.slo} (${this.routes.length} lignes et ${this.variantsCollectionOfAllVariantsOfAllRoutes?.length} variantes)`;
  }

  getVariantsThatUseOneOfThesePlaces(listOfPlaces) {
    if (!listOfPlaces) {
      return undefined;
    }
    let variants = [];
    this.routes.forEach((route) => {
      variants = variants.concat(route.getVariantsThatUseOneOfThesePlaces(listOfPlaces));
    });
    // variants.forEach(variant => {
    //     console.log(`${variant.varIdentifier} ${variant.parent.parent.rteIdentifier}`)
    // })
    return variants;
  }

  getRouteById(routeId) {
    return this.routes.getByPropName(`rteIdentifier`, routeId);
  }

  /** @type {import('./VariantsCollection')} */
  get variantsCollectionOfAllVariantsOfAllRoutes() {
    if (!this._cachedValueByValueKey.variantsCollectionOfAllVariantsOfAllRoutes) {
      this._refreshVariantsCollectionOfAllVariantsOfAllRoutes();
    }
    // @ts-ignore
    return this._cachedValueByValueKey.variantsCollectionOfAllVariantsOfAllRoutes;
  }

  get variantPointsCollectionOfAllVariantPointsOfAllRoutes() {
    if (!this._cachedValueByValueKey.variantPointsCollectionOfAllVariantPointsOfAllRoutes) {
      this._refreshVariantPointsCollectionOfAllVariantPointsOfAllRoutes();
    }
    // @ts-ignore
    return this._cachedValueByValueKey.variantPointsCollectionOfAllVariantPointsOfAllRoutes;
  }

  /** @type {import('./TripOrVariantSectionsCollection')} */
  get variantSectionsCollectionOfAllVariantsOfAllRoutes() {
    let allVariantSections = [];
    this.variantsCollectionOfAllVariantsOfAllRoutes.forEach((variant) => {
      allVariantSections = allVariantSections.concat(variant.sections.items);
    });

    return new TripOrVariantSectionsCollection(
      { items: allVariantSections, associationType: `aggregation` },
    );
  }

  _refreshVariantsCollectionOfAllVariantsOfAllRoutes() {
    let allVariants = [];
    this.routes.forEach((route) => {
      allVariants = allVariants.concat(route.variants.items);
    });
    this._cachedValueByValueKey.variantsCollectionOfAllVariantsOfAllRoutes = new VariantsCollection(
      { items: allVariants, associationType: `aggregation` },
    );
  }

  _refreshVariantPointsCollectionOfAllVariantPointsOfAllRoutes() {
    let allPoints = [];
    this.variantsCollectionOfAllVariantsOfAllRoutes.forEach((variant) => {
      allPoints = allPoints.concat(variant.points.items);
    });
    this._cachedValueByValueKey.variantPointsCollectionOfAllVariantPointsOfAllRoutes = new VariantPointsCollection(
      { items: allPoints, associationType: `aggregation` },
    );
  }
}

RouteVersion.hastusKeywords = ['route_version'];
RouteVersion.hastusObject = 'route_version';

/* Serialization utilities */
RouteVersion.allChildClasses = getAllChildClasses(childClasses);
RouteVersion.prototype.serializeModel = serializeThis;
RouteVersion.parseModel = parseThis;

module.exports = RouteVersion;
