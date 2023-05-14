import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { ServiceContext as BimoServiceContext } from "../base-types/rawIndex";
export { ServiceContext as BimoServiceContext } from "../base-types/rawIndex";
import { Entity } from "@bimo/core-utils-entity";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";

import { BimoServiceContextParentsCollection } from "./ServiceContextParentsCollection";
import { BimoServiceContextIntervalsCollection } from "./ServiceContextIntervalsCollection";
import { BimoServiceEvolutionPeriodsCollection } from "./ServiceEvolutionPeriodsCollection";

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

export function ServiceContextClassFactory({
  ServiceContextParentsCollection,
  ServiceContextIntervalsCollection,
  ServiceEvolutionPeriodsCollection,
}: EntityConstructorByEntityClassKey): typeof BimoServiceContext {
  const childClasses: (typeof Entity)[] = [
    ServiceContextParentsCollection,
    ServiceContextIntervalsCollection,
    ServiceEvolutionPeriodsCollection,
  ];
  class ServiceContext extends Item<ServiceContext> {
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
    serviceContextParents: BimoServiceContextParentsCollection;
    serviceContextIntervals: BimoServiceContextIntervalsCollection;
    serviceEvolutionPeriods: BimoServiceEvolutionPeriodsCollection;
    constructor(props: ServiceContextProps) {
      super(props);
      this.sctxName = gavpfp("sctxName", props, `string`, "Base");
      this.sctxUserCreated = gavpfp("sctxUserCreated", props, `string`, "1");
      this.sctxIsMainBase = gavpfp("sctxIsMainBase", props, `string`, "1");
      this.sctxIsBase = gavpfp("sctxIsBase", props, "string", "1");
      this.sctxDescription = gavpfp("sctxDescription", props, `string`);
      this.sctxColor = gavpfp("sctxColor", props, "string");
      this.sctxColorInternalNumber = gavpfp("sctxColorInternalNumber", props, "string");
      this.sctxWeekColumns = gavpfp("sctxWeekColumns", props);
      this.sctxIsolatedWeekday = gavpfp("sctxIsolatedWeekday", props);
      this.sctxIntervalSource = gavpfp("sctxIntervalSource", props, "string", "0");
      this.sctxDateFilter = gavpfp("sctxDateFilter", props);
      this.sctxNetworkEventRelated = gavpfp("sctxNetworkEventRelated", props);
      this.sctxOwner = gavpfp("sctxOwner", props, "string", "ADMIN");
      this.sctxPublicAccess = gavpfp("sctxPublicAccess", props, "string", "1");

      this.serviceContextParents = gavpfp(
        "serviceContextParents",
        props,
        ServiceContextParentsCollection,
        new ServiceContextParentsCollection(),
        { altPropName: "service_context_parent", parent: this }
      );

      this.serviceContextIntervals = gavpfp(
        "serviceContextIntervals",
        props,
        ServiceContextIntervalsCollection,
        new ServiceContextIntervalsCollection(),
        { altPropName: "service_context_interval", parent: this }
      );

      this.serviceEvolutionPeriods = gavpfp(
        "serviceEvolutionPeriods",
        props,
        ServiceEvolutionPeriodsCollection,
        new ServiceEvolutionPeriodsCollection(),
        { altPropName: "service_evolution_period", parent: this }
      );
    }
  }

  ServiceContext.allChildClasses = getAllChildClasses(childClasses);

  return ServiceContext;
}

export default ServiceContextClassFactory;
