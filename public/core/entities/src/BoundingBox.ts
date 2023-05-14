import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { BoundingBox as BimoBoundingBox } from "../base-types/rawIndex";
export { BoundingBox as BimoBoundingBox } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { pick } from "lodash";

const childClasses: (typeof Entity)[] = [];

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

export function BoundingBoxClassFactory(
  entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey
): typeof BimoBoundingBox {
  class BoundingBox extends Item<BoundingBox> {
    activeCoordinatesSystemName: string = "default";
    coordinatesBySystemName: BoundingBoxCoordinatesBySystemName;
    constructor(rawProps: [number, number, number, number] | BoundingBoxProps) {
      const props = Array.isArray(rawProps)
        ? { xMin: rawProps[0], yMin: rawProps[1], xMax: rawProps[2], yMax: rawProps[3] }
        : rawProps;
      super(props);
      this.activeCoordinatesSystemName = gavpfp(
        "activeCoordinatesSystemName",
        props,
        "string",
        "default"
      );
      this.coordinatesBySystemName = gavpfp("coordinatesBySystemName", props, Object, {});
      if (Object.keys(this.coordinatesBySystemName).length === 0) {
        this.coordinatesBySystemName.default = pick(props, [
          "xMin",
          "xMax",
          "yMin",
          "yMax",
        ]);
      }
    }

    get xMin() {
      return this.coordinatesBySystemName[this.activeCoordinatesSystemName].xMin;
    }

    get yMin() {
      return this.coordinatesBySystemName[this.activeCoordinatesSystemName].yMin;
    }

    get xMax() {
      return this.coordinatesBySystemName[this.activeCoordinatesSystemName].xMax;
    }

    get yMax() {
      return this.coordinatesBySystemName[this.activeCoordinatesSystemName].yMax;
    }

    get dX() {
      return this.xMax - this.xMin;
    }

    get dY() {
      return this.yMax - this.yMin;
    }

    get mapshaperStyleString() {
      return `${this.xMin},${this.yMin},${this.xMax},${this.yMax}`;
    }

    get shortLoggingOutput() {
      return `bbox: ${this.mapshaperStyleString}`;
    }

    get mediumLoggingOutput() {
      return `${this.shortLoggingOutput} dX: ${this.dX}  dY: ${this.dY}`;
    }

    setActiveCoordinatesSystemName(coordinatesSystemName: string) {
      this.activeCoordinatesSystemName = coordinatesSystemName;
    }
  }

  BoundingBox.allChildClasses = getAllChildClasses(childClasses);

  return BoundingBox;
}

export default BoundingBoxClassFactory;
