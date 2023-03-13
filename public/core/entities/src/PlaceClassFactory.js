/* Serialization utilities dependencies */
const childClasses = [];
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const Item = require('@bimo/core-utils-item');

const PlaceClassFactory = () => {
  class Place extends Item {
    constructor(props, entityClassKey = 'Place') {
      super(props, entityClassKey);
      this.bimoId = getAndValidatePropFromProps('bimoId', props);
      this.plcIdentifier = getAndValidatePropFromProps('plcIdentifier', props);
      this.plcDescription = getAndValidatePropFromProps('plcDescription', props);
      this.plcReferencePlace = getAndValidatePropFromProps('plcReferencePlace', props);
      this.plcType = getAndValidatePropFromProps('plcType', props);
      this.plcDistrict = getAndValidatePropFromProps('plcDistrict', props);
      this.plcAlterName = getAndValidatePropFromProps('plcAlterName', props);
      this.plcNumber = getAndValidatePropFromProps('plcNumber', props);
      this.plcFlowMethod = getAndValidatePropFromProps('plcFlowMethod', props, 'string', '0');
      this.plcDataGroup = getAndValidatePropFromProps('plcDataGroup', props);
      this.locaXCoord = getAndValidatePropFromProps('locaXCoord', props);
      this.locaYCoord = getAndValidatePropFromProps('locaYCoord', props);
      this.locaLocStatus = getAndValidatePropFromProps('locaLocStatus', props, 'string');
      this.locaSegmentExtId = getAndValidatePropFromProps('locaSegmentExtId', props, 'string');
      this.locaDistInter1 = getAndValidatePropFromProps('locaDistInter1', props, 'string');
      this.locaDistInter2 = getAndValidatePropFromProps('locaDistInter2', props, 'string');
      this.locaSegmentSide = getAndValidatePropFromProps('locaSegmentSide', props, 'string');
      this.locaLocMethod = getAndValidatePropFromProps('locaLocMethod', props, 'string');
      this.locaLocApproved = getAndValidatePropFromProps('locaLocApproved', props, 'string');
      this.plcLastApprovedSegmentName = getAndValidatePropFromProps('plcLastApprovedSegmentName', props, 'string');
      this.plcLastApprovedSegmentSide = getAndValidatePropFromProps('plcLastApprovedSegmentSide', props, 'string');
      this.plcLastApprovedIntersect1 = getAndValidatePropFromProps('plcLastApprovedIntersect1', props, 'string');
      this.plcLastApprovedIntersect2 = getAndValidatePropFromProps('plcLastApprovedIntersect2', props, 'string');
      this.plcLastApprovedDistInter1 = getAndValidatePropFromProps('plcLastApprovedDistInter1', props, 'string');
      this.plcLastApprovedDistInter2 = getAndValidatePropFromProps('plcLastApprovedDistInter2', props, 'string');
      this.plcRim = getAndValidatePropFromProps('plcRim', props, 'string');

      // bimo specific:
      this.relatedPlaces = new Set();
    }

    get veryShortLabel() {
      return this.plcIdentifier;
    }

    get shortLabel() {
      return this.plcIdentifier;
    }

    get shortLoggingOutput() {
      return `${this.plcIdentifier} - ${this.plcDescription}`;
    }

    get mediumLoggingOutput() {
      return `${this.plcIdentifier} - ${this.plcDescription} - ${this.plcType} (${this.locaXCoord}, ${this.locaYCoord})`;
    }

    /** @returns {Place} the place's reference place, or the place itself if it's a reference place, or null */
    get referencePlace() {
      if (this.plcReferencePlace) return this.parent.getByBusinessId(this.plcReferencePlace);
      return this.isRefPlace ? this : null;
    }

    /** @type {Boolean} */
    get isRefPlace() {
      return this.parent.placesByReferencePlace.has(this.plcIdentifier);
    }

    get childrenPlaces() {
      return this.isRefPlace ? this.parent.placesByReferencePlace.get(this.plcIdentifier) : [];
    }

    get isLocated() {
      return (
        Number.isFinite(parseFloat(this.locaXCoord))
        && Number.isFinite(parseFloat(this.locaYCoord))
      );
    }

    // See the file ../../docs/Place_zonage_dynamique.xlsx
    get mapZone() {
      return this._getAndSetCachedValue('mapZone', () => {
        if (!this.isLocated) return null;
        return `${Math.floor(this.locaXCoord / 100)}_${Math.floor(this.locaYCoord / 100)}`;
      });
    }

    resetRelatedPlaces() {
      this.relatedPlaces = new Set();
    }
  }

  /* Serialization utilities */
  Place.allChildClasses = getAllChildClasses(childClasses);
  Place.prototype.serializeModel = serializeThis;
  Place.parseModel = parseThis;

  return Place;
};

module.exports = PlaceClassFactory;
