const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

class OperationPivot {
  constructor(props) {
    this.id = getAndValidatePropFromProps('id', props);
    this.heureDebut = getAndValidatePropFromProps('heureDebut', props);
    this.type = getAndValidatePropFromProps('type', props);
    this.position = getAndValidatePropFromProps('position', props);
    this.jour = getAndValidatePropFromProps('jour', props);
    this.jeuJour = props.jeuJour || {};
    this.segmentPivot = props.segmentPivot || {};
  }
}

module.exports = OperationPivot;
