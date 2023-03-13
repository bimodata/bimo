const { serializeThis } = require('..');

exports.simpleInstances = [
  {
    serializedRootObject: {
      _type: 'Object',
      _id: '1',
    },
    serializedInstanceByIdByType: {
      Object: {
        1: {
          toto: 1,
          titi: '2',
          tutu: true,
        },
      },
    },
  },
  {
    serializedRootObject: {
      _type: 'Object',
      _id: '1',
    },
    serializedInstanceByIdByType: {
      Object: {
        1: {
          a: [
            1,
            '2',
            true,
            {
              _type: 'Object',
              _id: '2',
            },
          ],
        },
        2: { toto: 4 },
      },
    },
  },
  {
    serializedRootObject: {
      _type: 'Object',
      _id: '1',
    },
    serializedInstanceByIdByType: {
      Object: {
        1: {
          root: 'this is the root',
          level1: {
            _type: 'Object',
            _id: '2',
          },
        },
        2: {
          name: 'this is level 1',
          level2: {
            _type: 'Object',
            _id: '3',
          },
        },
        3: { name: 'guess what? level 2' },
      },
    },
  },
  {
    serializedRootObject: {
      _type: 'Object',
      _id: '1',
    },
    serializedInstanceByIdByType: {
      Object: {
        1: {
          b: [
            [
              1,
              2,
              3,
            ],
            [
              '4',
              [
                6,
                '7',
                false,
              ],
            ],
          ],
        },
      },
    },
  },
  { serializedRootObject: { _type: 'Object', _id: '1' }, serializedInstanceByIdByType: { Object: { 1: { toto: '1', tutu: 2, tata: { _type: 'Object', _id: '1' } } } } },
];

exports.mutlipleClassesObject = {
  serializedRootObject: {
    _type: 'OperationPivot',
    _id: '1',
  },
  serializedInstanceByIdByType: {
    OperationPivot: {
      1: {
        id: undefined,
        heureDebut: 'allo',
        type: 'bonjour',
        position: 'D',
        jour: 'lundi',
        segmentPivot: {
          _type: 'SegmentPivot',
          _id: '1',
        },
        jeuJour: {
          _type: 'Object',
          _id: '1',
        },
      },
    },
    SegmentPivot: {
      1: {
        id: 'String',
        rang: 'String',
        nature: 'String',
        idEtapeBase: 'String',
        trainCommercial: undefined,
        jeuJour: {
          _type: 'Object',
          _id: '2',
        },
        etapePivot: {
          _type: 'Object',
          _id: '3',
        },
        operationsPivot: [],
      },
    },
    Object: {
      1: {},
      2: {},
      3: {},
    },
  },
};

exports.simpleObjectForParseThis = {
  serializedRootObject: {
    _type: 'Object',
    _id: '1',
  },
  serializedInstanceByIdByType: {
    Object: {
      1: {
        serialize: serializeThis,
        root: 'this is the root',
        level1: {
          _type: 'Object',
          _id: '2',
        },
      },
      2: {
        name: 'this is level 1',
        level2: {
          _type: 'Object',
          _id: '3',
        },
      },
      3: { name: 'guess what? level 2' },
    },
  },
};

exports.aggregObject = {
  serializedRootObject: {
    _type: 'OperationsPivotCollection',
    _id: '1',
  },
  serializedInstanceByIdByType: {
    Object: { 1: {} },
    OperationsPivotCollection: {
      1: {
        itemName: 'OperationPivot',
        associationType: 'aggregation',
        businessIdPropName: undefined,
        customProps: { _id: '1', _type: 'Object' },
        idPropName: undefined,
        items: [
          {
            _type: 'OperationPivot',
            _repoId: '1234',
          },
          {
            _type: 'OperationPivot',
            _repoId: '5678',
          },
        ],
        label: undefined,
        labelPropName: undefined,
        parent: undefined,
      },
    },
  },
};
