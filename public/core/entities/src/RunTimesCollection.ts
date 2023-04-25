import { getAllChildClasses } from '@bimo/core-utils-serialization';
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";


import { RunTime, RunTimeProps } from "./RunTime";

const childClasses = [RunTime];



export interface RunTimesCollectionProps extends ExtendedCollectionProps<RunTime, RunTimeProps> {
}

export class RunTimesCollection extends Collection<RunTime, RunTimeProps> {
  constructor(props: RunTimesCollectionProps = {}) {
    super({
      itemName: 'RunTime',
      ItemConstructor: RunTime,
      idPropName: `bimoId`,
      labelPropName: `od`,
      ...props,
    });
  }
}


RunTimesCollection.allChildClasses = getAllChildClasses(childClasses);



export default RunTimesCollection;
