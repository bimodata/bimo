const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { Item } = require('@bimo/core-utils-collection');

class DataFile extends Item {
  constructor(props) {
    super(props);
    this.fileInfo = getAndValidatePropFromProps(`fileInfo`, props);
    this.fileData = getAndValidatePropFromProps('fileData', props);
    this.fileName = this.fileInfo.nameOrPath;
    this.path = this.fileInfo.path;

    this.links = [];
  }
}

module.exports = DataFile;