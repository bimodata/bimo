# `@bimo/core-utils-normalize-sub-task-config`

This function evaluates all the shorthands and various modes that are supported in sub task config, and returns a normalizedSubTaskConfig that always has the same structure and is easier to parse.

## Examples

From this:

```javascript
 {
      taskConstructorKey: 'ImproveRtevCollBasedOnTemplates',
      taskName: 'Projection des variantes à la voie',
      pathAndDefaultValueByExecuteArgName: {
        sourceRtevColl: { path: 'resultBySubTaskKey.createRtevColl' },
        placesCollection: { path: 'mainExecuteArgs.placesCollection' },
        configSet: { path: 'mainExecuteArgs.improveRtevCollConfigSet' },
        errRtevIdentifier: { path: 'mainExecuteArgs.errRtevIdentifier' },
        templateRouteVersionsCollection: { path: 'mainExecuteArgs.templateRouteVersionsCollection' },
      },
    }
```

To this:

```javascript
{
      taskConstructorKey: 'ImproveRtevCollBasedOnTemplates',
      taskName: 'Projection des variantes à la voie',
      normalizedSourceConfigsByExecuteArgName: {
        sourceRtevColl: [{ fallBackMode: [{ path: 'resultBySubTaskKey.createRtevColl' }] }],
        placesCollection: [{ fallBackMode: [{ path: 'mainExecuteArgs.placesCollection' }] }],
        configSet: [{ fallBackMode: [{ path: 'mainExecuteArgs.improveRtevCollConfigSet' }] }],
        errRtevIdentifier: [{ fallBackMode: [{ path: 'mainExecuteArgs.errRtevIdentifier' }] }],
        templateRouteVersionsCollection: [{ fallBackMode: [{ path: 'mainExecuteArgs.templateRouteVersionsCollection' }] }],
      },
    }
```
