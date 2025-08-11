export default function getAllChildClasses(childClasses: any[]) {
  const allChildClasses = new Set(childClasses);
  childClasses.forEach((linkedClass) => {
    if (linkedClass.allChildClasses) {
      linkedClass.allChildClasses.forEach((level2LinkedClass: any) => {
        allChildClasses.add(level2LinkedClass);
      });
    }
  });
  return allChildClasses;
}


