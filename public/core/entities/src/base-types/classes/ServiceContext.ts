import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { ServiceContextParentsCollection } from "./ServiceContextParentsCollection";
import { ServiceContextIntervalsCollection } from "./ServiceContextIntervalsCollection";
import { ServiceEvolutionPeriodsCollection } from "./ServiceEvolutionPeriodsCollection";
export interface ServiceContextProps extends ExtendedItemProps {
  sctxName?: string;
  sctxUserCreated?: string;
  sctxIsMainBase?: string;
  sctxIsBase?: string;
  sctxDescription?: string;
  sctxColor?: string;
  sctxColorInternalNumber?: string;
  sctxWeekColumns?: string;
  sctxIsolatedWeekday?: string;
  sctxIntervalSource?: string;
  sctxDateFilter?: string;
  sctxNetworkEventRelated?: string;
  sctxOwner?: string;
  sctxPublicAccess?: string;
  serviceContextParents?: string;
  serviceContextIntervals?: string;
  serviceEvolutionPeriods?: string;
}
export declare class ServiceContext extends Item<ServiceContext> {
  sctxName?: string;
  sctxUserCreated?: string;
  sctxIsMainBase?: string;
  sctxIsBase?: string;
  sctxDescription?: string;
  sctxColor?: string;
  sctxColorInternalNumber?: string;
  sctxWeekColumns?: string;
  sctxIsolatedWeekday?: string;
  sctxIntervalSource?: string;
  sctxDateFilter?: string;
  sctxNetworkEventRelated?: string;
  sctxOwner?: string;
  sctxPublicAccess?: string;
  serviceContextParents: ServiceContextParentsCollection;
  serviceContextIntervals: ServiceContextIntervalsCollection;
  serviceEvolutionPeriods: ServiceEvolutionPeriodsCollection;
  constructor(props: ServiceContextProps);
}
