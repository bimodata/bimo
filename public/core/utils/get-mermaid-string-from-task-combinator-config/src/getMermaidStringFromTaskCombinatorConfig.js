const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const normalizeSubTaskConfig = require('@bimo/core-utils-normalize-sub-task-config');

const defaultLinkByType = {
  resultBySubTaskKey: '----->',
  mainExecuteArgs: '-->',
};

/**
 *
 * @param {object} taskCombinatorConfig
 * @param {getMermaidStringFromTaskCombinatorConfigConfig} config
 * @param {*} context
 */
function getMermaidStringFromTaskCombinatorConfig(taskCombinatorConfig, config = {}, context) {
  const logger = getAndAddLoggerToServiceOptions(context, { serviceName: `getMermaidStringFromTaskCombinatorConfig` });
  const { subTaskConfigBySubTaskKey = {}, executeArgInfos = [], diagramRenderingConfig = {} } = taskCombinatorConfig;
  const { executeArgNamesToIgnore = [], linkByType = {} } = { ...config, ...diagramRenderingConfig };
  const executeArgNamesToIgnoreSet = new Set(executeArgNamesToIgnore);
  const enhancedServiceConfig = { ...config, executeArgNamesToIgnoreSet, linkByType: { ...defaultLinkByType, ...linkByType } };
  return `
flowchart TD

${executeArgInfos.map(
    (executeArgInfo) => {
      if (executeArgNamesToIgnoreSet.has(executeArgInfo.name)) return null;
      return `${executeArgInfo.name}[\\${encodeString(executeArgInfo?.labelByLanguageCode?.fr ?? executeArgInfo.name)}/]`;
    },
  ).filter(Boolean).join('\n')}

${Object.entries(subTaskConfigBySubTaskKey).map(([subTaskKey, subTaskConfig]) => {
    const {
      taskConstructorKey, taskName,
      normalizedConfigByExecuteArgName,
    } = normalizeSubTaskConfig(subTaskConfig);

    return `${subTaskKey}[${encodeString(`${taskName}<br>${taskConstructorKey}`)}]\n`
      + `${Object.values(normalizedConfigByExecuteArgName).map(
        ({ normalizedSourceConfigs }) => normalizedSourceConfigs.map(
          (normalizedSourceConfig) => normalizedSourceConfig.fallBackMode.map(
            (sourceConfig) => {
              const { id, link } = getIdAndLinkIfApplicable(sourceConfig, enhancedServiceConfig, context);
              if (!id || !link) {
                logger.trace(`No id or link retrieved for ${JSON.stringify(sourceConfig)}`);
                return null;
              }
              return `${id} ${link} ${subTaskKey}`;
            },
          ).filter(Boolean).join('\n'),
        ).filter(Boolean).join('\n'),
      ).filter(Boolean).join('\n')}
`;
  }).join('\n')}
`;
}

module.exports = getMermaidStringFromTaskCombinatorConfig;

const idMatcher = /^(resultBySubTaskKey|mainExecuteArgs)\.(.*)$/;
function getIdAndLinkIfApplicable(sourceConfig, serviceConfig) {
  const { path = '' } = sourceConfig;
  const matches = idMatcher.exec(path);
  if (!matches) return {};

  const { linkByType, executeArgNamesToIgnoreSet } = serviceConfig;

  const [, type, id] = matches;
  if (executeArgNamesToIgnoreSet.has(id)) return {};

  const link = linkByType[type];
  return { id, link };
}

function encodeString(string) {
  return `"${string.replace(/"/g, '#quot;')}"`;
}

/**
 * @typedef {Object} getMermaidStringFromTaskCombinatorConfigConfig
 */
