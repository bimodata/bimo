import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";
import { getAllChildClasses } from "@bimo/core-utils-serialization";
import gavpfp from "@bimo/core-utils-get-and-validate-prop-from-props";

import { RunTimesCollection, RunTimesCollectionProps } from "./RunTimesCollection";
import { LoadTimesCollection, LoadTimesCollectionProps } from "./LoadTimesCollection";

import { Entity } from "@bimo/core-utils-entity";
const childClasses: (typeof Entity)[] = [RunTimesCollection, LoadTimesCollection];

export interface RunTimeVersionProps extends ExtendedItemProps {
  bimoId?: string;
  rtvIdentifier?: string;
  rtvDescription?: string;
  rtvScheduleType?: string;
  rtvSchedulingUnit?: string;
  rtvEffectiveDate?: string;
  rtvOwner?: string;
  rtvPublicAccess?: string;
  rtvDataGroup?: string;
  rtvAllowsMapBasedRunTimes?: string;
  rtvMapBasedRunTimeFactor?: string;
  runTimes?: RunTimesCollection;
  loadTimes?: LoadTimesCollection;
}

export class RunTimeVersion extends Item<RunTimeVersion> {
  bimoId?: string;
  rtvIdentifier?: string;
  rtvDescription?: string;
  rtvScheduleType?: string;
  rtvSchedulingUnit?: string;
  rtvEffectiveDate?: string;
  rtvOwner?: string;
  rtvPublicAccess?: string;
  rtvDataGroup?: string;
  rtvAllowsMapBasedRunTimes?: string;
  rtvMapBasedRunTimeFactor?: string;
  runTimes: RunTimesCollection;
  loadTimes: LoadTimesCollection;
  constructor(props: RunTimeVersionProps) {
    super(props);
    /** We can't use rtevIdentifier: it has a functional meaning */
    this.bimoId = gavpfp("bimoId", props);
    this.rtvIdentifier = gavpfp("rtvIdentifier", props, `string`);
    this.rtvDescription = gavpfp("rtvDescription", props, `string`);
    this.rtvScheduleType = gavpfp("rtvScheduleType", props, `string`);
    this.rtvSchedulingUnit = gavpfp("rtvSchedulingUnit", props, `string`);
    this.rtvEffectiveDate = gavpfp("rtvEffectiveDate", props, `string`);
    this.rtvOwner = gavpfp("rtvOwner", props, `string`);
    this.rtvPublicAccess = gavpfp("rtvPublicAccess", props, `string`);
    this.rtvDataGroup = gavpfp("rtvDataGroup", props, `string`);
    this.rtvAllowsMapBasedRunTimes = gavpfp(
      "rtvAllowsMapBasedRunTimes",
      props,
      `string`,
      `0`
    );
    this.rtvMapBasedRunTimeFactor = gavpfp(
      "rtvMapBasedRunTimeFactor",
      props,
      `string`,
      `1`
    );

    this.runTimes = gavpfp(
      "runTimes",
      props,
      RunTimesCollection,
      new RunTimesCollection(),
      { altPropName: "run_time", parent: this }
    );

    /** @type {LoadTimesCollection} */
    this.loadTimes = gavpfp(
      "loadTimes",
      props,
      LoadTimesCollection,
      new LoadTimesCollection(),
      { altPropName: "load_time", parent: this }
    );
  }

  /** Creates a new instance of a runTimeVersion. All runtimes are new instances too. */
  copy(newRtvIdentifier: string | undefined) {
    const copiedRunTimeVersion = new RunTimeVersion(this);
    copiedRunTimeVersion.rtvIdentifier = newRtvIdentifier;
    copiedRunTimeVersion.runTimes = new RunTimesCollection({
      items: this.runTimes.map((runTime) => runTime.copy()),
    });
    return copiedRunTimeVersion;
  }

  get shortLoggingOutput() {
    return `${this.rtvIdentifier} - ${this.rtvDescription}`;
  }
}

RunTimeVersion.hastusKeywords = ["runtime_version"];
RunTimeVersion.hastusObject = "runtime_version";

RunTimeVersion.allChildClasses = getAllChildClasses(childClasses);

export default RunTimeVersion;
