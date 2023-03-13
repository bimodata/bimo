const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

class SegmentPivot {
  constructor(props) {
    this.id = getAndValidatePropFromProps('id', props);
    this.rang = getAndValidatePropFromProps('rang', props);
    this.nature = getAndValidatePropFromProps('nature', props);
    this.trainCommercial = getAndValidatePropFromProps('trainCommercial', props);
    this.idEtapeBase = getAndValidatePropFromProps('idEtapeBase', props);

    this.jeuJour = props.jeuJour || {};
    this.etapePivot = props.etapePivot || {};
    this.operationsPivot = props.operationsPivot || [];
    // this.nextSegment = props.nextSegment || {};
  }

  get fullLoggingOutput() {
    return `${this.id} - ${this.rang} - ${this.nature} - ${this.etapePivot.mediumLoggingOutput}`;
  }

  linkToOperationPivot(etapePivot) {
    this.etapePivot = etapePivot;
    etapePivot.segments.push(this);
  }
}

module.exports = SegmentPivot;
