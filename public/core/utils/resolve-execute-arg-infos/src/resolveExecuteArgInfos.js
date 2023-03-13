/**
 *
 * @param {Object} param
 * @param {Object} param.chainDefinedArgInfoByExecuteArgKey
 * @param {Object} param.userDefinedArgInfoByExecuteArgKey
 * @param {Object} param.defaultValueByExecuteArgKey
 */
function resolveExecuteArgInfos({
  chainDefinedArgInfoByExecuteArgKey = {},
  userDefinedArgInfoByExecuteArgKey = {},
  defaultValueByExecuteArgKey,
}) {
  /** The most common case is to only specify default values. For a more compact definition, we support
   * a defaultValueByExecuteArgKey. This first step will extract default values that were specified this way */
  const resolvedUserDefinedArgInfoByExecuteArgKey = resolveUserDefinedArgInfoByExecuteArgKey(
    defaultValueByExecuteArgKey, userDefinedArgInfoByExecuteArgKey);

  const resolvedExecuteArgInfoByExecuteArgKey = { ...chainDefinedArgInfoByExecuteArgKey };

  Object.entries(
    resolvedUserDefinedArgInfoByExecuteArgKey,
  ).forEach(
    ([executeArgKey, userDefinedArgInfo]) => {
      let resolvedExecuteArgInfo = resolvedExecuteArgInfoByExecuteArgKey[executeArgKey];
      if (!resolvedExecuteArgInfo) {
        resolvedExecuteArgInfo = {};
        resolvedExecuteArgInfoByExecuteArgKey[executeArgKey] = resolvedExecuteArgInfo;
      }
      Object.assign(resolvedExecuteArgInfo, userDefinedArgInfo);
    },
  );
  return resolvedExecuteArgInfoByExecuteArgKey;
}
module.exports = resolveExecuteArgInfos;

function resolveUserDefinedArgInfoByExecuteArgKey(defaultValueByExecuteArgKey, userDefinedArgInfoByExecuteArgKey) {
  const resolvedUserDefinedArgInfoByExecuteArgKey = { ...userDefinedArgInfoByExecuteArgKey };
  if (defaultValueByExecuteArgKey) {
    Object.entries(
      defaultValueByExecuteArgKey,
    ).forEach(
      ([executeArgKey, defaultValue]) => {
        let executeArgInfo = resolvedUserDefinedArgInfoByExecuteArgKey[executeArgKey];
        if (!executeArgInfo) {
          executeArgInfo = {};
          resolvedUserDefinedArgInfoByExecuteArgKey[executeArgKey] = executeArgInfo;
        }
        executeArgInfo.defaultValue = defaultValue;
      },
    );
  }
  return resolvedUserDefinedArgInfoByExecuteArgKey;
}
