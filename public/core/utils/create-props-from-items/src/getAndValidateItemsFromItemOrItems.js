module.exports = (itemOrItems) => {
  const items = Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
  if (items.some((item) => typeof item !== `object`)) throw new Error('Items must be an object or an array of objects');
  return items;
};
