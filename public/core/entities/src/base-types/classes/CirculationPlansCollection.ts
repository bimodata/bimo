import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import {
  CirculationPlan,
  CirculationPlanProps,
} from "./CirculationPlan";
export interface CirculationPlansCollectionProps
  extends ExtendedCollectionProps<CirculationPlan, CirculationPlanProps> {}
export declare class CirculationPlansCollection extends Collection<
  CirculationPlan,
  CirculationPlanProps
> {
  constructor(props?: CirculationPlansCollectionProps);

  // test ajout generateOirStyleData suite au bug d'exécution : "entity.generateOirStyleData n'est pas une fonction"
  static createFromOirStyleData(oirStyleData: any): CirculationPlansCollection;
  generateOirStyleData(): {
    circulation_plan: any[];
  };
}