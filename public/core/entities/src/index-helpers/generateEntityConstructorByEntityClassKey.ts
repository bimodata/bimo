import { DefaultClassFactoryByEntityClassKey } from "./DefaultClassFactoryByEntityClassKey";
import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";

export function generateEntityConstructorByEntityClassKey({
  CustomClassFactoryByEntityClassKey = {},
}: any = {}): EntityConstructorByEntityClassKey {
  const entityConstructorByEntityClassKey: any = {};
  Object.entries(DefaultClassFactoryByEntityClassKey).forEach(
    ([entityClassKey, DefaultClassFactory]) => {
      const ClassFactory =
        CustomClassFactoryByEntityClassKey[entityClassKey] ?? DefaultClassFactory;
      entityConstructorByEntityClassKey[entityClassKey] = ClassFactory(
        entityConstructorByEntityClassKey
      );
    }
  );
  return entityConstructorByEntityClassKey;
}
