const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const Item = require('@bimo/core-utils-item');
const { pick } = require('lodash');

const childClasses = [];

const BoundingBoxClassFactory = () => {
  class BoundingBox extends Item {
    constructor(rawProps) {
      const props = Array.isArray(rawProps) ? { xMin: rawProps[0], yMin: rawProps[1], xMax: rawProps[2], yMax: rawProps[3] } : rawProps;
      super(props, 'BoundingBox');
      this.activeCoordinatesSystemName = getAndValidatePropFromProps('activeCoordinatesSystemName', rawProps, 'string', 'default');
      this.coordinatesBySystemName = getAndValidatePropFromProps('coordinatesBySystemName', rawProps, Object, {});
      if (Object.keys(this.coordinatesBySystemName).length === 0) {
        this.coordinatesBySystemName.default = pick(props, ['xMin', 'xMax', 'yMin', 'yMax']);
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

    setActiveCoordinatesSystemName(coordinatesSystemName) {
      this.activeCoordinatesSystemName = coordinatesSystemName;
    }
  }

  BoundingBox.allChildClasses = getAllChildClasses(childClasses);
  BoundingBox.prototype.serializeModel = serializeThis;
  BoundingBox.parseModel = parseThis;

  return BoundingBox;
};

module.exports = BoundingBoxClassFactory;
