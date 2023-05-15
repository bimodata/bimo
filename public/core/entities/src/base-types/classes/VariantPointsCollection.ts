import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { VariantPoint, VariantPointProps } from "./VariantPoint";
export interface VariantPointsCollectionProps
  extends ExtendedCollectionProps<VariantPoint, VariantPointProps> {}
export declare class VariantPointsCollection extends Collection<
  VariantPoint,
  VariantPointProps
> {
  constructor(props?: VariantPointsCollectionProps);
  get mediumLoggingOutput(): string;
  get longLoggingOutput(): string;
}
