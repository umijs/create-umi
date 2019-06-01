const filterPkg = (pkgObject, ignoreList) => {
  const devObj = {};
  Object.keys(pkgObject).forEach(key => {
    const isIgnore = ignoreList.some(reg => {
      return new RegExp(reg).test(key);
    });
    if (isIgnore) {
      return;
    }
    devObj[key] = pkgObject[key];
  });
  return devObj;
};

module.exports = filterPkg;
