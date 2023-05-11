import { OvernightLink, OvernightLinkProps } from "./OvernightLink";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
export interface OvernightLinksCollectionProps extends ExtendedCollectionProps<OvernightLink, OvernightLinkProps> {
}
export declare class OvernightLinksCollection extends Collection<OvernightLink, OvernightLinkProps> {
    constructor(props?: OvernightLinksCollectionProps);
}
export default OvernightLinksCollection;
