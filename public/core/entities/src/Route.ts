import _ from "lodash";

import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { VariantsCollection, VariantsCollectionProps } from "./VariantsCollection";
import { RouteVersion } from "./RouteVersion";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [VariantsCollection];

export interface RouteProps extends ExtendedItemProps {
  bimoId?: string;
  rteVersion?: string;
  rteIdentifier?: string;
  _rteDescription?: string;
  rteDirection?: string;
  rteServiceType?: string;
  rteServiceMode?: string;
  rteGarage?: string;
  rteGroup?: string;
  rteMainColorRgb?: string;
  rteSecondaryColorRgb?: string;
  rteMainColorAdjustedRgb?: string;
  rteSecondaryColorAdjustedRgb?: string;
  rtePubIdSpec?: string;
  rteForPublicInfo?: string;
  rtePublicRating?: string;
  rteReliability?: string;
  rtePubDir_1?: string;
  rtePubDir_2?: string;
  rteBasicVarDir_1?: string;
  rteBasicVarDir_2?: string;
  rteUrl?: string;
  rteMainPpatDir_1?: string;
  rteMainPpatDir_2?: string;
  rteDriverPpat_1?: string;
  rteDriverPpat_2?: string;
  rtePublicPpat_1?: string;
  rtePublicPpat_2?: string;
  rteSchedulerPpat_1?: string;
  rteSchedulerPpat_2?: string;
  rteDistrict?: string;
  rteZone?: string;
  rteIsCancelled?: string;
  variants: VariantsCollection;
}

export class Route extends Item<Route> {
  bimoId?: string;
  rteVersion?: string;
  rteIdentifier?: string;
  _rteDescription?: string;
  rteDirection?: string;
  rteServiceType?: string;
  rteServiceMode?: string;
  rteGarage?: string;
  rteGroup?: string;
  rteMainColorRgb?: string;
  rteSecondaryColorRgb?: string;
  rteMainColorAdjustedRgb?: string;
  rteSecondaryColorAdjustedRgb?: string;
  rtePubIdSpec?: string;
  rteForPublicInfo?: string;
  rtePublicRating?: string;
  rteReliability?: string;
  rtePubDir_1?: string;
  rtePubDir_2?: string;
  rteBasicVarDir_1?: string;
  rteBasicVarDir_2?: string;
  rteUrl?: string;
  rteMainPpatDir_1?: string;
  rteMainPpatDir_2?: string;
  rteDriverPpat_1?: string;
  rteDriverPpat_2?: string;
  rtePublicPpat_1?: string;
  rtePublicPpat_2?: string;
  rteSchedulerPpat_1?: string;
  rteSchedulerPpat_2?: string;
  rteDistrict?: string;
  rteZone?: string;
  rteIsCancelled?: string;
  variants: VariantsCollection;
  _links: { [linkType: string]: any } = {};
  constructor(props: RouteProps) {
    super(props);

    this.bimoId = gavpfp("bimoId", props);
    this.rteVersion = gavpfp("rteVersion", props, "string");
    this.rteIdentifier = gavpfp("rteIdentifier", props, "string");
    this._rteDescription = gavpfp("rteDescription", props, "string");
    this.rteDirection = gavpfp("rteDirection", props, "string", "1");
    this.rteServiceType = gavpfp("rteServiceType", props, "string", "0");
    this.rteServiceMode = gavpfp("rteServiceMode", props, "string", "3");
    this.rteGarage = gavpfp("rteGarage", props, "string");
    this.rteGroup = gavpfp("rteGroup", props, "string");
    this.rteMainColorRgb = gavpfp("rteMainColorRgb", props, "string");
    this.rteSecondaryColorRgb = gavpfp("rteSecondaryColorRgb", props, "string");
    this.rteMainColorAdjustedRgb = gavpfp("rteMainColorAdjustedRgb", props, "string");
    this.rteSecondaryColorAdjustedRgb = gavpfp(
      "rteSecondaryColorAdjustedRgb",
      props,
      "string"
    );
    this.rtePubIdSpec = gavpfp("rtePubIdSpec", props, "string");
    this.rteForPublicInfo = gavpfp("rteForPublicInfo", props, "string");
    this.rtePublicRating = gavpfp("rtePublicRating", props, "string");
    this.rteReliability = gavpfp("rteReliability", props, "string");
    this.rtePubDir_1 = gavpfp("rtePubDir_1", props, "string");
    this.rtePubDir_2 = gavpfp("rtePubDir_2", props, "string");
    this.rteBasicVarDir_1 = gavpfp("rteBasicVarDir_1", props, "string");
    this.rteBasicVarDir_2 = gavpfp("rteBasicVarDir_2", props, "string");
    this.rteUrl = gavpfp("rteUrl", props, "string");
    this.rteMainPpatDir_1 = gavpfp("rteMainPpatDir_1", props, "string");
    this.rteMainPpatDir_2 = gavpfp("rteMainPpatDir_2", props, "string");
    this.rteDriverPpat_1 = gavpfp("rteDriverPpat_1", props, "string");
    this.rteDriverPpat_2 = gavpfp("rteDriverPpat_2", props, "string");
    this.rtePublicPpat_1 = gavpfp("rtePublicPpat_1", props, "string");
    this.rtePublicPpat_2 = gavpfp("rtePublicPpat_2", props, "string");
    this.rteSchedulerPpat_1 = gavpfp("rteSchedulerPpat_1", props, "string");
    this.rteSchedulerPpat_2 = gavpfp("rteSchedulerPpat_2", props, "string");
    this.rteDistrict = gavpfp("rteDistrict", props, "string");
    this.rteZone = gavpfp("rteZone", props, "string");
    this.rteIsCancelled = gavpfp("rteIsCancelled", props, "string", "0");

    this.variants = gavpfp(
      "variants",
      props,
      VariantsCollection,
      new VariantsCollection(),
      { altPropName: "variant", parent: this }
    );
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

  addLink(type: string, value: any) {
    this._links[type] = value;
  }

  getLink(type: string) {
    return this._links[type];
  }

  removeLink(type: string) {
    delete this._links[type];
  }

  /** Creates a new instance of a route. All variants are new instances too.*/
  copy(newRteIdentifier: string | undefined = this.rteIdentifier): Route {
    const copiedRoute = new Route(this);
    copiedRoute.rteIdentifier = newRteIdentifier;
    const copiedVariants = this.variants.map((variant) => variant.copy());
    copiedRoute.variants = new VariantsCollection({ items: copiedVariants });
    copiedRoute.variants.parent = copiedRoute;
    copiedRoute.addLink("copiedFrom", this);
    return copiedRoute;
  }

  get shortLoggingOutput() {
    return `${this.rteIdentifier} (${this.rteVersion})`;
  }

  get mediumLoggingOutput() {
    return `${this.slo} (${this.variants.length} variantes)`;
  }

  getVariantsThatUseOneOfThesePlaces(listOfPlaces: any) {
    if (!listOfPlaces) {
      return undefined;
    }
    return this.variants.pick((variant) => variant.usesOneOfThesePlaces(listOfPlaces));
  }

  getVariantById(variantId: any) {
    return this.variants.getByPropName("varIdentifier", variantId);
  }

  get routeVersion() {
    return this.parent && (this.parent.parent as RouteVersion);
  }
}

Route.hastusKeywords = ["route"];
Route.hastusObject = "route";

Route.allChildClasses = getAllChildClasses(childClasses);

export default Route;
