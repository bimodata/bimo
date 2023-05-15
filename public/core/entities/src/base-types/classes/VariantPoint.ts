import { ExtendedItemProps } from "@bimo/core-utils-collection";
import { TripOrVariantPoint } from "./TripOrVariantPoint";
import { Variant } from "./Variant";
/**
 * Propriétés de point de variante
 * @typedef {Object} VariantPointProps
 * @property {string} varptPlace - place identifier
 * @property {Object=} parent - tripPointsCollection that contains this trip point
 * @see VariantPoint
 */
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
  varptCodeCs?: string;
  varptTypeArret?: string;
  varptNaturePointDeCommutation?: string;
}
export declare class VariantPoint extends TripOrVariantPoint<
  VariantPoint,
  VariantPointProps
> {
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
  varptCodeCs?: string;
  varptTypeArret?: string;
  varptNaturePointDeCommutation?: string;
  constructor(props: VariantPointProps);
  get variant(): Variant | undefined;
  copy(): VariantPoint;
  get varptPublicInfo(): string | undefined;
  set varptPublicInfo(v: string | undefined);
  /** @type {string} */
  get originalPlaceId(): string;
  set originalPlaceId(v: string);
  get variantId(): string | undefined;
  set variantId(v: string | undefined);
  get shortLoggingOutput(): string;
  get mediumLoggingOutput(): string;
  get longLoggingOutput(): string;
  get _indexInParent(): number | null;
  getNthPointFromThisOne(n: number): VariantPoint;
  get nextPoint(): VariantPoint;
  get previousPoint(): VariantPoint;
}
