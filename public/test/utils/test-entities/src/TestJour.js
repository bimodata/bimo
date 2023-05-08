const ALL_JOUR_VALUE_BY_KEY_BY_ID = {
  1: {
    NUM1: 1,
    FR0: 'Lundi',
    FR1: 'lundi',
    FR2: 'lu',
    EN1: 'monday',
    EN2: 'mon',
  },
  2: {
    NUM1: 2,
    FR0: 'Mardi',
    FR1: 'mardi',
    FR2: 'ma',
    EN1: 'tuesday',
    EN2: 'tue',
  },
  3: {
    NUM1: 3,
    FR0: 'Mercredi',
    FR1: 'mercredi',
    FR2: 'me',
    EN1: 'wednesday',
    EN2: 'wed',
  },
  4: {
    NUM1: 4,
    FR0: 'Jeudi',
    FR1: 'jeudi',
    FR2: 'je',
    EN1: 'thursday',
    EN2: 'thu',
  },
  5: {
    NUM1: 5,
    FR0: 'Vendredi',
    FR1: 'vendredi',
    FR2: 've',
    EN1: 'friday',
    EN2: 'fri',
  },
  6: {
    NUM1: 6,
    FR0: 'Samedi',
    FR1: 'samedi',
    FR2: 'sa',
    EN1: 'saturday',
    EN2: 'sat',
  },
  7: {
    NUM1: 7,
    FR0: 'Dimanche',
    FR1: 'dimanche',
    FR2: 'di',
    EN1: 'sunday',
    EN2: 'sun',
  },
};

class Jour {
  constructor(jourValue) {
    if (jourValue instanceof Jour) {
      return jourValue;
    }
    // console.log(jourValue);
    if (typeof jourValue === 'object' && typeof jourValue.FR0 === 'string') {
      jourValue = jourValue.FR0;
    }
    // console.log(jourValue);
    const lowerCasedJourValue = jourValue.toString().toLowerCase();
    const jourId = Jour.jourIdByJourValue[lowerCasedJourValue];
    if (!jourId) {
      throw new Error(`Impossible de construire un jour à partir de cet argument: ${JSON.stringify(jourValue)}`);
    }
    if (Jour.jourByJourId[jourId]) {
      return Jour.jourByJourId[jourId];
    }

    const allJourValueByKeyForThisId = ALL_JOUR_VALUE_BY_KEY_BY_ID[jourId];
    Object.assign(this, allJourValueByKeyForThisId);
    Jour.jourByJourId[jourId] = this;
    return this;
  }

  getNextJour() {
    return this.getJourAtDelta(1);
  }

  getPreviousJour() {
    return this.getJourAtDelta(-1);
  }

  /**
     *
     * @param {Number} delta - number of days to add to current day
     */
  getJourAtDelta(delta) {
    const newNum = ((this.NUM1 + delta + 6) % 7) + 1;
    return new Jour(newNum);
  }
}

Jour.jourByJourId = {};

const jourIdByJourValue = {};
Object.keys(ALL_JOUR_VALUE_BY_KEY_BY_ID).forEach((ID) => {
  const JOUR_VALUE_BY_KEY = ALL_JOUR_VALUE_BY_KEY_BY_ID[ID];
  Object.keys(JOUR_VALUE_BY_KEY).forEach((KEY) => {
    const key = KEY.toString();
    const JOUR_VALUE = JOUR_VALUE_BY_KEY[key];
    jourIdByJourValue[JOUR_VALUE] = ID;
  });
});

Jour.jourIdByJourValue = jourIdByJourValue;

module.exports = Jour;
