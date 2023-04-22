import { ExtendedItem, ExtendedItemProps } from "./Item";
import { Collection } from "./Collection";

export function evaluateAdd<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
>({
  item,
  collection,
  propName,
}: {
  item: ItemType;
  collection: Collection<ItemType, ItemProps>;
  propName: string;
}): false | string {
  const value = item[propName];
  const currentItemWithValue = collection.getByPropName(propName, value);
  if (currentItemWithValue) {
    return (
      `Un item a déjà la valeur ${value} pour la propriété ${propName} dans cette collection.\n` +
      `item existant: ${currentItemWithValue.shortLoggingOutput}\n` +
      `nouvel item  : ${item.shortLoggingOutput}`
    );
  }
  return false;
}

export function evaluateDefault<
  ItemType extends ExtendedItem<ItemType>,
  ItemProps extends ExtendedItemProps
>({
  collection,
  propName,
}: {
  collection: Collection<ItemType, ItemProps>;
  propName: string;
}): false | string {
  const takenValues = new Set();
  const itemWithDuplicateValue = collection.items.find((item) => {
    if (!takenValues.has(item[propName])) {
      takenValues.add(item[propName]);
      return false;
    }
    return true;
  });

  if (itemWithDuplicateValue) {
    return `Au moins deux items ont la valeur ${itemWithDuplicateValue[propName]} pour la propriété ${propName} dans cette collection.`;
  }
  return false;
}
