import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
export interface BoundingBoxProps extends ExtendedItemProps {
    activeCoordinatesSystemName?: string;
    coordinatesBySystemName?: string;
}
export interface BoundingBoxCoordinates {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}
export interface BoundingBoxCoordinatesBySystemName {
    [systemName: string]: BoundingBoxCoordinates;
}
export declare class BoundingBox extends Item<BoundingBox> {
    activeCoordinatesSystemName: string;
    coordinatesBySystemName: BoundingBoxCoordinatesBySystemName;
    constructor(rawProps: [number, number, number, number] | BoundingBoxProps);
    get xMin(): number;
    get yMin(): number;
    get xMax(): number;
    get yMax(): number;
    get dX(): number;
    get dY(): number;
    get mapshaperStyleString(): string;
    get shortLoggingOutput(): string;
    get mediumLoggingOutput(): string;
    setActiveCoordinatesSystemName(coordinatesSystemName: string): void;
}
export default BoundingBox;
