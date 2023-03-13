/**
 *
 * @param {object|Map} entityConstructorByEntityClassKey
 * @param {*} [nextId='1']
 */
function resetAllEntitiesNextIds(entityConstructorByEntityClassKey, nextId = '1') {
  const entityConstructorByEntityClassKeyMap = entityConstructorByEntityClassKey instanceof Map
    ? entityConstructorByEntityClassKey : new Map(Object.entries(entityConstructorByEntityClassKey));

  entityConstructorByEntityClassKeyMap.forEach((EntityConstructor, entityClassKey) => {
    if (!entityClassKey.match(/Collection$/)) {
      // eslint-disable-next-line no-param-reassign
      EntityConstructor.nextIdValue = nextId;
    }
  });
}

module.exports = resetAllEntitiesNextIds;
