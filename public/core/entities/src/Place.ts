


const childClasses = [];
import { getAllChildClasses } from '@bimo/core-utils-serialization';
import gavpfp from '@bimo/core-utils-get-and-validate-prop-from-props';
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";


export interface PlaceProps extends ExtendedItemProps {
  bimoId?: string;
  plcIdentifier?: string;
  plcDescription?: string;
  plcReferencePlace?: string;
  plcType?: string;
  plcDistrict?: string;
  plcAlterName?: string;
  plcNumber?: string;
  plcFlowMethod?: string;
  plcDataGroup?: string;
  locaXCoord?: string;
  locaYCoord?: string;
  locaLocStatus?: string;
  locaSegmentExtId?: string;
  locaDistInter1?: string;
  locaDistInter2?: string;
  locaSegmentSide?: string;
  locaLocMethod?: string;
  locaLocApproved?: string;
  plcLastApprovedSegmentName?: string;
  plcLastApprovedSegmentSide?: string;
  plcLastApprovedIntersect1?: string;
  plcLastApprovedIntersect2?: string;
  plcLastApprovedDistInter1?: string;
  plcLastApprovedDistInter2?: string;
  plcRim?: string;
  relatedPlaces?: string;
}

export class Place extends Item<Place> {
  bimoId?: string;
  plcIdentifier?: string;
  plcDescription?: string;
  plcReferencePlace?: string;
  plcType?: string;
  plcDistrict?: string;
  plcAlterName?: string;
  plcNumber?: string;
  plcFlowMethod?: string;
  plcDataGroup?: string;
  locaXCoord?: string;
  locaYCoord?: string;
  locaLocStatus?: string;
  locaSegmentExtId?: string;
  locaDistInter1?: string;
  locaDistInter2?: string;
  locaSegmentSide?: string;
  locaLocMethod?: string;
  locaLocApproved?: string;
  plcLastApprovedSegmentName?: string;
  plcLastApprovedSegmentSide?: string;
  plcLastApprovedIntersect1?: string;
  plcLastApprovedIntersect2?: string;
  plcLastApprovedDistInter1?: string;
  plcLastApprovedDistInter2?: string;
  plcRim?: string;
  relatedPlaces?: string;
  constructor(props, entityClassKey = 'Place') {
    super(props, entityClassKey);
    this.bimoId = gavpfp('bimoId', props);
    this.plcIdentifier = gavpfp('plcIdentifier', props);
    this.plcDescription = gavpfp('plcDescription', props);
    this.plcReferencePlace = gavpfp('plcReferencePlace', props);
    this.plcType = gavpfp('plcType', props);
    this.plcDistrict = gavpfp('plcDistrict', props);
    this.plcAlterName = gavpfp('plcAlterName', props);
    this.plcNumber = gavpfp('plcNumber', props);
    this.plcFlowMethod = gavpfp('plcFlowMethod', props, 'string', '0');
    this.plcDataGroup = gavpfp('plcDataGroup', props);
    this.locaXCoord = gavpfp('locaXCoord', props);
    this.locaYCoord = gavpfp('locaYCoord', props);
    this.locaLocStatus = gavpfp('locaLocStatus', props, 'string');
    this.locaSegmentExtId = gavpfp('locaSegmentExtId', props, 'string');
    this.locaDistInter1 = gavpfp('locaDistInter1', props, 'string');
    this.locaDistInter2 = gavpfp('locaDistInter2', props, 'string');
    this.locaSegmentSide = gavpfp('locaSegmentSide', props, 'string');
    this.locaLocMethod = gavpfp('locaLocMethod', props, 'string');
    this.locaLocApproved = gavpfp('locaLocApproved', props, 'string');
    this.plcLastApprovedSegmentName = gavpfp('plcLastApprovedSegmentName', props, 'string');
    this.plcLastApprovedSegmentSide = gavpfp('plcLastApprovedSegmentSide', props, 'string');
    this.plcLastApprovedIntersect1 = gavpfp('plcLastApprovedIntersect1', props, 'string');
    this.plcLastApprovedIntersect2 = gavpfp('plcLastApprovedIntersect2', props, 'string');
    this.plcLastApprovedDistInter1 = gavpfp('plcLastApprovedDistInter1', props, 'string');
    this.plcLastApprovedDistInter2 = gavpfp('plcLastApprovedDistInter2', props, 'string');
    this.plcRim = gavpfp('plcRim', props, 'string');

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

Place.hastusKeywords = ['place'];
Place.hastusObject = 'place';


Place.allChildClasses = getAllChildClasses(childClasses);



export default Place;
