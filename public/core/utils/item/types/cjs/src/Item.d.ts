import { Entity, EntityProps } from "@bimo/core-utils-entity";
export interface RawOigProps {
    [key: string]: string;
}
export declare class Item<ItemType extends Entity> extends Entity {
    private _rawOigProps;
    constructor(props?: {}, context?: {});
    clone(): ItemType;
    static getRawOigProps(props: EntityProps): {
        [k: string]: string;
    };
}
