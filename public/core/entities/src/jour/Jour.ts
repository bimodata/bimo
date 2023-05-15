import { serializeThis, parseThis } from "@bimo/core-utils-serialization";

const ALL_JOUR_VALUE_BY_KEY_BY_ID: { [jourId in JourId]: { [key: string]: JourValue } } =
  {
    1: {
      NUM1: 1,
      FR0: "Lundi",
      FR1: "lundi",
      FR2: "lu",
      EN0: "Monday",
      EN1: "monday",
      EN2: "mon",
      vscSchedType: "13",
    },
    2: {
      NUM1: 2,
      FR0: "Mardi",
      FR1: "mardi",
      FR2: "ma",
      EN0: "Tuesday",
      EN1: "tuesday",
      EN2: "tue",
      vscSchedType: "14",
    },
    3: {
      NUM1: 3,
      FR0: "Mercredi",
      FR1: "mercredi",
      FR2: "me",
      EN0: "Wednesday",
      EN1: "wednesday",
      EN2: "wed",
      vscSchedType: "11",
    },
    4: {
      NUM1: 4,
      FR0: "Jeudi",
      FR1: "jeudi",
      FR2: "je",
      EN0: "Thursday",
      EN1: "thursday",
      EN2: "thu",
      vscSchedType: "3",
    },
    5: {
      NUM1: 5,
      FR0: "Vendredi",
      FR1: "vendredi",
      FR2: "ve",
      EN0: "Friday",
      EN1: "friday",
      EN2: "fri",
      vscSchedType: "4",
    },
    6: {
      NUM1: 6,
      FR0: "Samedi",
      FR1: "samedi",
      FR2: "sa",
      EN0: "Saturday",
      EN1: "saturday",
      EN2: "sat",
      vscSchedType: "5",
    },
    7: {
      NUM1: 7,
      FR0: "Dimanche",
      FR1: "dimanche",
      FR2: "di",
      EN0: "Sunday",
      EN1: "sunday",
      EN2: "sun",
      vscSchedType: "6",
    },
  };

export type JourId = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type JourFR0 =
  | "Lundi"
  | "Mardi"
  | "Mercredi"
  | "Jeudi"
  | "Vendredi"
  | "Samedi"
  | "Dimanche";
export type JourFR1 = Lowercase<JourFR0>;
export type JourFR2 = "lu" | "ma" | "me" | "je" | "ve" | "sa" | "di";
export type JourEN0 =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
export type JourEN1 = Lowercase<JourEN0>;
export type JourEN2 = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type VscSchedType = "3" | "4" | "5" | "6" | "11" | "13" | "14";
export type JourValue =
  | JourId
  | JourFR0
  | JourFR1
  | JourFR2
  | JourEN0
  | JourEN1
  | JourEN2
  | VscSchedType;

export class Jour {
  static jourByJourId: { [jourId in JourId]?: Jour };
  static jourIdByJourValue: { [jourValue in JourValue]?: JourId };
  static parseModel: Function;
  serializeModel: Function;
  NUM1: JourId;
  FR0: JourFR0;
  FR1: JourFR1;
  FR2: JourFR2;
  EN0: JourEN0;
  EN1: JourEN1;
  EN2: JourEN2;
  vscSchedType: string;
  constructor(jourValue: Jour | JourValue | { FR0: JourFR0 }) {
    if (jourValue instanceof Jour) {
      return jourValue;
    }
    // console.log(jourValue);
    if (typeof jourValue === "object" && typeof jourValue.FR0 === "string") {
      jourValue = jourValue.FR0;
    }
    // console.log(jourValue);
    const lowerCasedJourValue = jourValue.toString().toLowerCase();
    const jourId = Jour.jourIdByJourValue[lowerCasedJourValue as JourValue];
    if (!jourId) {
      throw new Error(
        `Impossible de construire un jour à partir de cet argument: ${JSON.stringify(
          jourValue
        )}`
      );
    }
    if (Jour.jourByJourId[jourId]) {
      return Jour.jourByJourId[jourId] as Jour;
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
   * @param delta - number of days to add to current day
   */
  getJourAtDelta(delta: number) {
    const newNum = ((this.NUM1 + delta + 6) % 7) + 1;
    return new Jour(newNum as JourId);
  }
}

Jour.jourByJourId = {};

const jourIdByJourValue: { [jourValue in JourValue]?: JourId } = {};
const KEYS_TO_IGNORE = ["vscSchedType"];
Object.keys(ALL_JOUR_VALUE_BY_KEY_BY_ID).forEach((id) => {
  const jourValueByKey: { [key: string]: JourValue } =
    ALL_JOUR_VALUE_BY_KEY_BY_ID[id as unknown as JourId];
  Object.keys(jourValueByKey).forEach((key) => {
    if (!KEYS_TO_IGNORE.includes(key)) {
      const jourValue = jourValueByKey[key];
      // @ts-ignore
      jourIdByJourValue[jourValue] = id;
    }
  });
});

Jour.jourIdByJourValue = jourIdByJourValue;

Object.keys(ALL_JOUR_VALUE_BY_KEY_BY_ID).forEach(
  (id) => new Jour(id as unknown as JourId)
);

Jour.prototype.serializeModel = serializeThis;
Jour.parseModel = parseThis;

export default Jour;
