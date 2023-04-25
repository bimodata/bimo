import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';

import { RoutesCollection, RoutesCollectionProps } from "./RoutesCollection";
import { VariantsCollection, VariantsCollectionProps } from "./VariantsCollection";
import { Variant, VariantProps } from "./Variant";
import { VariantPointsCollection, VariantPointsCollectionProps } from "./VariantPointsCollection";
import { VehicleScheduleOrRouteVersion, VehicleScheduleOrRouteVersionProps } from "./VehicleScheduleOrRouteVersion";
import { TripOrVariantSectionsCollection, TripOrVariantSectionsCollectionProps } from "./TripOrVariantSectionsCollection";

const childClasses = [RoutesCollection];


export interface RouteVersionProps extends ExtendedItemProps {
  bimoId?: string;
  rtevIdentifier?: string;
  rtevDescription?: string;
  rtevSchedulingUnit?: string;
  rtevEffectiveDate?: string;
  rtevRailInfra?: string;
  rtevRoutesBasedOnRailLinks?: string;
  rtevOwner?: string;
  rtevPublicAccess?: string;
  rtevDataGroup?: string;
  routes?: string;
  _cachedValueByValueKey?: string;
  _links?: string;
}

export class RouteVersion extends VehicleScheduleOrRouteVersion {
  bimoId?: string;
  rtevIdentifier?: string;
  rtevDescription?: string;
  rtevSchedulingUnit?: string;
  rtevEffectiveDate?: string;
  rtevRailInfra?: string;
  rtevRoutesBasedOnRailLinks?: string;
  rtevOwner?: string;
  rtevPublicAccess?: string;
  rtevDataGroup?: string;
  routes?: string;
  _cachedValueByValueKey?: string;
  _links?: string;
  constructor(props: RouteVersionProps) {
    super(props, 'variant');

    this.bimoId = gavpfp('bimoId', props);
    this.rtevIdentifier = gavpfp('rtevIdentifier', props);
    this.rtevDescription = gavpfp('rtevDescription', props);
    this.rtevSchedulingUnit = gavpfp('rtevSchedulingUnit', props);
    this.rtevEffectiveDate = gavpfp('rtevEffectiveDate', props);
    this.rtevRailInfra = gavpfp('rtevRailInfra', props, 'string', '0');
    this.rtevRoutesBasedOnRailLinks = gavpfp('rtevRoutesBasedOnRailLinks', props, 'string', '0');
    this.rtevOwner = gavpfp('rtevOwner', props, 'string', 'ADMIN');
    this.rtevPublicAccess = gavpfp('rtevPublicAccess', props, 'string', '0');
    this.rtevDataGroup = gavpfp('rtevDataGroup', props);

    /* Children */
    /** @type {RoutesCollection} */
    this.routes = gavpfp('routes', props, RoutesCollection, new RoutesCollection());
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


RouteVersion.allChildClasses = getAllChildClasses(childClasses);



export default RouteVersion;
