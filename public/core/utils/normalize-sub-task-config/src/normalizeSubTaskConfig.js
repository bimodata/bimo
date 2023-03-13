/**
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
          const fallBackMode = Array.isArray(unShortHandedSourceConfig.fallBackMode);
          return fallBackMode ? unShortHandedSourceConfig : { fallBackMode: [unShortHandedSourceConfig] };
        });
        return [executeArgName, { arrayMode, normalizedSourceConfigs }];
      }),
  );
  return { ...subTaskConfig, normalizedConfigByExecuteArgName };
}

module.exports = normalizeSubTaskConfig;
