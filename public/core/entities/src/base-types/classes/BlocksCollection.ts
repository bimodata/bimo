import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { Block, BlockProps } from "./Block";
export interface BlocksCollectionProps extends ExtendedCollectionProps<Block, BlockProps> {
}
export declare class BlocksCollection extends Collection<Block, BlockProps> {
    constructor(props?: BlocksCollectionProps);
}
export default BlocksCollection;
