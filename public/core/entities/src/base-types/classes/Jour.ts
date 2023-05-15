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
export declare class Jour {
  static jourByJourId: {
    [jourId in JourId]?: Jour;
  };
  static jourIdByJourValue: {
    [jourValue in JourValue]?: JourId;
  };
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
  constructor(
    jourValue:
      | Jour
      | JourValue
      | {
          FR0: JourFR0;
        }
  );
  getNextJour(): Jour;
  getPreviousJour(): Jour;
  /**
   * @param delta - number of days to add to current day
   */
  getJourAtDelta(delta: number): Jour;
}
