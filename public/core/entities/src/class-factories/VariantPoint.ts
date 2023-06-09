import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VariantPoint as BimoVariantPoint } from "../base-types/rawIndex";
export { VariantPoint as BimoVariantPoint } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [];
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoVariant } from "./Variant";

export interface VariantPointProps extends ExtendedItemProps {
  varptIsTimingPoint?: string;
  varptPlace?: string;
  varptNoStopping?: string;
  varptSpecTpDistance?: string;
  _varptPublicInfo?: string;
  varptStop?: string;
  varptRefStoploc?: string;
  varptTimeFactor?: string;
  varptRoutingPoint?: string;
  varptSpecDistrict?: string;
  varptSpecZone?: string;
  varptSpecPassengersMvmtRestrict?: string;
  varptLoadPlace?: string;
  varptLoadDistrict?: string;
  varptLoadZone?: string;
  varptAllowLoadTime?: string;
  varptTpDistance?: string;
  varptDistance?: string;
}
export function VariantPointClassFactory({
  TripOrVariantPoint,
}: EntityConstructorByEntityClassKey): typeof BimoVariantPoint {
  class VariantPoint extends TripOrVariantPoint<VariantPoint, VariantPointProps> {
    /**
     *
     * @param {VariantPointProps} props - props
     */
    varptIsTimingPoint?: string;
    varptPlace: string;
    varptNoStopping?: string;
    varptSpecTpDistance?: string;
    _varptPublicInfo?: string;
    varptStop?: string;
    varptRefStoploc?: string;
    varptTimeFactor?: string;
    varptRoutingPoint?: string;
    varptSpecDistrict?: string;
    varptSpecZone?: string;
    varptSpecPassengersMvmtRestrict?: string;
    varptLoadPlace?: string;
    varptLoadDistrict?: string;
    varptLoadZone?: string;
    varptAllowLoadTime?: string;
    varptTpDistance?: string;
    varptDistance?: string;
    constructor(props: VariantPointProps) {
      super(props, "variant");
      this.varptIsTimingPoint = gavpfp("varptIsTimingPoint", props, "string", "1");
      this.varptPlace = gavpfp("varptPlace", props, "string");
      this.varptNoStopping = gavpfp("varptNoStopping", props, "string");

      /** en km */
      this.varptSpecTpDistance = gavpfp("varptSpecTpDistance", props, "string");
      this._varptPublicInfo = gavpfp("varptPublicInfo", props, "string");
      this.varptStop = gavpfp("varptStop", props, "string");
      this.varptRefStoploc = gavpfp("varptRefStoploc", props, "string");
      this.varptTimeFactor = gavpfp("varptTimeFactor", props, "string");
      this.varptRoutingPoint = gavpfp("varptRoutingPoint", props, "string");
      this.varptSpecDistrict = gavpfp("varptSpecDistrict", props, "string");
      this.varptSpecZone = gavpfp("varptSpecZone", props, "string");
      this.varptSpecPassengersMvmtRestrict = gavpfp(
        "varptSpecPassengersMvmtRestrict",
        props,
        "string"
      );
      this.varptLoadPlace = gavpfp("varptLoadPlace", props, "string");
      this.varptLoadDistrict = gavpfp("varptLoadDistrict", props, "string");
      this.varptLoadZone = gavpfp("varptLoadZone", props, "string");
      this.varptAllowLoadTime = gavpfp("varptAllowLoadTime", props, "string");

      /** en km */
      this.varptTpDistance = gavpfp(
        "varptTpDistance",
        props,
        "string",
        this.varptSpecTpDistance
      );

      /** en mètres */
      this.varptDistance = gavpfp("varptDistance", props, "string");
    }

    get variant() {
      return this.parent && (this.parent.parent as BimoVariant);
    }

    copy() {
      // @ts-ignore
      const copiedItem = new this.constructor(this);
      return copiedItem;
    }

    get varptPublicInfo() {
      return this.varptIsTimingPoint === "0"
        ? "0"
        : this._varptPublicInfo || this.varptIsTimingPoint;
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

    get variantId() {
      return this.variant?.varIdentifier;
    }

    // eslint-disable-next-line class-methods-use-this
    set variantId(v) {
      throw new Error(`variantId can not be set on VariantPoint`);
    }

    get shortLoggingOutput() {
      return (
        `${this.varptPlace}(noStopping:${this.varptNoStopping},` +
        ` loadTime:${this.varptAllowLoadTime} timingPoint:${this.varptIsTimingPoint})`
      );
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

    getNthPointFromThisOne(n: number) {
      return (
        (this.parent &&
          this._indexInParent &&
          this.parent.items[this._indexInParent + n]) ??
        null
      );
    }

    get nextPoint() {
      return this.getNthPointFromThisOne(1);
    }

    get previousPoint() {
      return this.getNthPointFromThisOne(-1);
    }
  }

  VariantPoint.hastusKeywords = ["rvpoint"];
  VariantPoint.hastusObject = "variant_point";

  VariantPoint.allChildClasses = getAllChildClasses(childClasses);

  return VariantPoint;
}

export default VariantPointClassFactory;
