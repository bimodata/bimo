function getAllChildClasses(childClasses) {
  const allChildClasses = new Set(childClasses);
  childClasses.forEach((linkedClass) => {
    if (linkedClass.allChildClasses) {
      linkedClass.allChildClasses.forEach((level2LinkedClass) => {
        allChildClasses.add(level2LinkedClass);
      });
    }
  });
  return allChildClasses;
}

module.exports = getAllChildClasses;
