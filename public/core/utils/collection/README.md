# `@bimo/core-utils-collection`

Abstract collection to be extended to create entities collections.

À creuser:

export class Collection<ItemConstructor extends typeof Item> extends Entity

Ensuite, on peut utiliser:

InstanceType<ItemConstructor> pour obtenir le type des instances

Et éventuellement

ConstructorParameters<ItemConstructor> pour les props
