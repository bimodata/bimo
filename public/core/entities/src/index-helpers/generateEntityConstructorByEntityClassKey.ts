import { DefaultClassFactoryByEntityClassKey } from "./DefaultClassFactoryByEntityClassKey";
import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";

export function generateEntityConstructorByEntityClassKey({
  CustomClassFactoryByEntityClassKey = {},
}: any = {}): EntityConstructorByEntityClassKey {
  const entityConstructorByEntityClassKey: any = Object.fromEntries(
    Object.entries(DefaultClassFactoryByEntityClassKey).map(
      ([entityClassKey, DefaultClassFactory]) => {
        const ClassFactory =
          CustomClassFactoryByEntityClassKey[entityClassKey] ?? DefaultClassFactory;
        return [entityClassKey, ClassFactory(entityConstructorByEntityClassKey)];
      }
    )
  );

  return entityConstructorByEntityClassKey;
}
