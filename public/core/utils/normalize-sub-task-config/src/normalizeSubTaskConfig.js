/**
 * See README.md
 * @param {object} subTaskConfig
 */
function normalizeSubTaskConfig(subTaskConfig) {
  const { sourceConfigByExecuteArgName, pathAndDefaultValueByExecuteArgName } = subTaskConfig;

  const normalizedConfigByExecuteArgName = Object.fromEntries(
    Object.entries({ ...sourceConfigByExecuteArgName, ...pathAndDefaultValueByExecuteArgName })
      .map(([executeArgName, sourceConfigOrConfigs]) => {
        const arrayMode = Array.isArray(sourceConfigOrConfigs);
        const sourceConfigs = arrayMode ? sourceConfigOrConfigs : [sourceConfigOrConfigs];

        const normalizedSourceConfigs = sourceConfigs.map((rawSourceConfig) => {
          const unShortHandedSourceConfig = typeof rawSourceConfig === 'string' ? { defaultValue: rawSourceConfig } : rawSourceConfig;
          if (Array.isArray(unShortHandedSourceConfig?.fallBackMode)) {
            return unShortHandedSourceConfig;
          }
          if (!unShortHandedSourceConfig) {
            return { fallBackMode: [] };
          }
          return { fallBackMode: [unShortHandedSourceConfig] };
        });
        return [executeArgName, { arrayMode, normalizedSourceConfigs }];
      }),
  );
  return { ...subTaskConfig, normalizedConfigByExecuteArgName };
}

module.exports = normalizeSubTaskConfig;
