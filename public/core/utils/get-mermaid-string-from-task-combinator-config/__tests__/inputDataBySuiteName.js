const octopusToHastusRtevColl = {
  taskCombinatorConfig: {
    customActionKey: `octopusToHastusRtevColl`,
    taskConstructorKey: `TaskCombinator`,
    targetEntityClassKeys: [`VehicleSchedulesCollection`],
    static: false,
    displayValueByDisplayKeyByLanguageCode: {
      fr: {
        shortName: `Créer Versions`,
        longName: `Création de versions de lignes et de temps de parcours à partir de courses Octopus`,
      },
    },
    subTaskConfigBySubTaskKey: {
      importVscCollections: {
        taskConstructorKey: 'CreateEntitiesFromOigDataFiles',
        taskName: 'Import des horaires Hastus',
        pathAndDefaultValueByExecuteArgName: {
          dataFilesAsObjects: { path: 'mainExecuteArgs.rawHastusVscDataFiles' },
          entityClassKey: { defaultValue: 'VehicleSchedulesCollection' },
          oirControlFile: { defaultValue: 'vsc_moulinette_benoit' },
        },
      },
      mergeVscCollections: {
        taskConstructorKey: 'CreateCollection',
        taskName: `Fusion des fichiers d'horaires Hastus`,
        pathAndDefaultValueByExecuteArgName: { arrayOfCollections: { path: 'resultBySubTaskKey.importVscCollections' } },
      },
      createRtevColl: {
        taskConstructorKey: 'CreateRouteVersionsCollectionFromVscCollection',
        taskName: `Création de versions de lignes`,
        pathAndDefaultValueByExecuteArgName: {
          sourceVehicleSchedulesCollection: { path: 'resultBySubTaskKey.mergeVscCollections' },
          collectionName: { path: 'mainExecuteArgs.routesCollName' },
          commRtevIdentifier: { path: 'mainExecuteArgs.commRtevIdentifier' },
          techRtevIdentifier: { path: 'mainExecuteArgs.techRtevIdentifier' },
          configSet: { path: 'mainExecuteArgs.createRouteVersionsConfigSet' },
          placesCollection: { path: 'mainExecuteArgs.placesCollection' },
        },
      },
      improveRtev: {
        taskConstructorKey: 'ImproveRtevCollBasedOnTemplates',
        taskName: 'Projection des variantes à la voie',
        pathAndDefaultValueByExecuteArgName: {
          sourceRtevColl: { path: 'resultBySubTaskKey.createRtevColl' },
          placesCollection: { path: 'mainExecuteArgs.placesCollection' },
          configSet: { path: 'mainExecuteArgs.improveRtevCollConfigSet' },
          errRtevIdentifier: { path: 'mainExecuteArgs.errRtevIdentifier' },
          templateRouteVersionsCollection: { path: 'mainExecuteArgs.templateRouteVersionsCollection' },
        },
      },
      finalizeVariants: {
        taskConstructorKey: 'ModifyEntities',
        taskName: 'Finalisation des variantes',
        pathAndDefaultValueByExecuteArgName: {
          entity: { path: 'resultBySubTaskKey.improveRtev' },
          entityClassKey: { defaultValue: 'RouteVersionsCollection' },
          configSet: { path: 'mainExecuteArgs.modifyRouteVersionsConfigSet' },
          context_placesCollection: { path: `mainExecuteArgs.placesCollection` },
        },
      },
      addPrefPlaces: {
        taskConstructorKey: 'ModifyTripsOrVariants',
        taskName: 'Application des voies de préférence',
        pathAndDefaultValueByExecuteArgName: {
          entity: { path: 'resultBySubTaskKey.finalizeVariants' },
          entityClassKey: { defaultValue: 'RouteVersionsCollection' },
          configSet: { path: 'mainExecuteArgs.addPrefPlacesConfigSet' },
          context_placesCollection: { path: `mainExecuteArgs.placesCollection` },
        },
      },
      exportRouteVersions: {
        taskConstructorKey: 'ExportEntityToUserData',
        taskName: 'Export',
        pathAndDefaultValueByExecuteArgName: {
          entity: { path: 'resultBySubTaskKey.addPrefPlaces' },
          exportedDataDataName: { defaultValue: 'NewRouteVersions' },
          oirControlFile: { path: 'mainExecuteArgs.rteverExportControlFile' },
        },
      },
      createPrefConfig: {
        taskConstructorKey: 'CreatePreferredPlaceConfigFromRtevOrVscColl',
        taskName: 'Création des voies de préférence',
        pathAndDefaultValueByExecuteArgName: {
          sourceRtevColl: { path: 'resultBySubTaskKey.improveRtev' },
          placesCollection: { path: 'mainExecuteArgs.placesCollection' },
          configSet: { path: 'mainExecuteArgs.createPrefConfigConfigSet' },
        },
      },
      createRunTimes: {
        taskConstructorKey: `CreateRunTimeVersionsCollectionFromVscCollection`,
        taskName: `Création des temps de parcours`,
        pathAndDefaultValueByExecuteArgName: {
          placesCollection: { path: `mainExecuteArgs.placesCollection` },
          configSet: { path: `mainExecuteArgs.createRunTimesConfigSet` },
          collectionName: { path: `mainExecuteArgs.runTimesCollName` },
          sourceVehicleSchedulesCollection: { path: `resultBySubTaskKey.mergeVscCollections` },
        },
      },
      exportRunTimes: {
        taskConstructorKey: `ExportEntityToUserData`,
        taskName: `Export`,
        pathAndDefaultValueByExecuteArgName: {
          entity: { path: `resultBySubTaskKey.createRunTimes` },
          exportedDataDataName: { defaultValue: `NewRunTimeVersions` },
          oirControlFile: { path: 'mainExecuteArgs.rtverExportControlFile' },
        },
      },
    },
    executeArgInfos: [
      {
        name: 'rawHastusVscDataFiles',
        type: 'object[]',
      },
      {
        name: `placesCollection`,
        labelByLanguageCode: { fr: `Jeu de lieux` },
        type: `Entity`,
        entityClassKey: 'OscarPlacesCollection',
        defaultValue: `filteredBasWithCoord`,
      },
      {
        name: `runTimesCollName`,
        labelByLanguageCode: { fr: `Nom du fichier de versions de temps de parcours` },
        defaultValue: `Nouveau`,
      },
      {
        name: 'commRtevIdentifier',
        optional: true,
        labelByLanguageCode: { fr: 'Nom de la version de lignes commerciales (max 10 car)' },
        type: 'string',
        defaultValue: 'laur_comm',
      },
      {
        name: 'techRtevIdentifier',
        optional: true,
        labelByLanguageCode: { fr: 'Nom de la version de lignes techniques (max 10 car)' },
        type: 'string',
        defaultValue: 'laur_tech',
      },
      {
        name: 'errRtevIdentifier',
        optional: true,
        labelByLanguageCode: { fr: `Nom de la version de lignes d'erreurs (max 10 car)` },
        type: 'string',
        defaultValue: 'laur_err',
      },
      {
        name: 'routesCollName',
        optional: true,
        labelByLanguageCode: { fr: 'Nom du fichier de versions de lignes' },
        type: 'string',
        defaultValue: 'Nouveau',
      },
      {
        name: 'createRouteVersionsConfigSet',
        labelByLanguageCode: { fr: 'Options de création de versions de lignes' },
        entityClassKey: 'ConfigSet',
        taskConstructorKey: 'CreateRouteVersionsCollectionFromVscCollection',
        type: 'Entity',
        defaultValue: 'create-route-versions-hors-infra',
      },
      {
        name: 'improveRtevCollConfigSet',
        labelByLanguageCode: { fr: `Options pour amélioration des variantes à partir des versions de lignes modèle` },
        entityClassKey: 'ConfigSet',
        taskConstructorKey: 'ImproveRtevCollBasedOnTemplates',
        type: 'Entity',
        optional: true,
        defaultValue: 'improve-rtev-coll-insert-no-stopping',
      },
      {
        name: 'templateRouteVersionsCollection',
        labelByLanguageCode: { fr: `Jeu de versions de lignes modèle (créées à partir d'Agathe)` },
        type: 'Entity',
        entityClassKey: 'RouteVersionsCollection',
        defaultValue: '',
        optional: true,
      },
      {
        name: `createRunTimesConfigSet`,
        labelByLanguageCode: { fr: `Options de création de temps de parcours` },
        entityClassKey: `ConfigSet`,
        taskConstructorKey: `CreateRunTimeVersionsCollectionFromVscCollection`,
        type: `Entity`,
        defaultValue: `create-run-times-versions-do-nothing`,
      },
      {
        name: `createPrefConfigConfigSet`,
        labelByLanguageCode: { fr: `Options d'analyse des voies de préférence` },
        entityClassKey: `ConfigSet`,
        taskConstructorKey: `CreatePreferredPlaceConfigFromRtevOrVscColl`,
        type: `Entity`,
        defaultValue: `create-pref-place-config-do-nothing`,
      },
      {
        name: `modifyRouteVersionsConfigSet`,
        labelByLanguageCode: { fr: `Options de finalisation des variantes` },
        entityClassKey: `ConfigSet`,
        taskConstructorKey: `ModifyEntities`,
        type: `Entity`,
        defaultValue: `modify-rtev-minimaliste`,
      },
      {
        name: `addPrefPlacesConfigSet`,
        labelByLanguageCode: { fr: `Options d'application de voies de préférence` },
        entityClassKey: `ConfigSet`,
        taskConstructorKey: `ModifyTripsOrVariants`,
        type: `Entity`,
        defaultValue: `modify-trips-or-variants-do-nothing`,
      },
      {
        name: 'rteverExportControlFile',
        labelByLanguageCode: { fr: 'Fichier de contrôle pour export des versions de lignes' },
        entityClassKey: 'OirControlFile',
        targetEntityClassKey: 'RouteVersionsCollection',
        type: 'Entity',
        defaultValue: 'default_rtever',
      },
      {
        name: 'rtverExportControlFile',
        labelByLanguageCode: { fr: 'Fichier de contrôle pour export des versions de temps' },
        entityClassKey: 'OirControlFile',
        targetEntityClassKey: 'RunTimeVersionsCollection',
        type: 'Entity',
        defaultValue: 'default_rtver',
      },
    ],
    uiSteps: [
      {
        stepTitle: `Sélectionner des fichiers Octopus (après conversion par l'utilitaire "ExportOffre")`,
        formKey: `select-data-and-control-files`,
        formConfig: {
          entityClassKey: 'VehicleSchedulesCollection',
          dataFilesExecuteArgName: 'rawHastusVscDataFiles',
          encoding: 'latin1',
        },
        uiStepClassName: `mb-3 col-12`,
      },
      {
        stepTitle: `Sélectionner des versions de lignes modèle, les options pour les utiliser et le nom du fichier à produire`,
        formKey: `default`,
        formConfig: {
          executeArgsNames: [
            'templateRouteVersionsCollection',
            'improveRtevCollConfigSet',
            'modifyRouteVersionsConfigSet',
            'addPrefPlacesConfigSet',
            'commRtevIdentifier',
            'techRtevIdentifier',
            'errRtevIdentifier',
            'routesCollName',
          ],
        },
        uiStepClassName: `mb-3 col-12`,
      },
      {
        stepTitle: `Sélectionner des options avancées`,
        formKey: `default`,
        initiallyClosed: true,
        formConfig: {
          executeArgsNames: [
            'placesCollection',
            'createRouteVersionsConfigSet',
            'createRunTimesConfigSet',
            'createPrefConfigConfigSet',
            'runTimesCollName',
            'rteverExportControlFile',
            'rtverExportControlFile',
          ],
        },
        uiStepClassName: `mb-3 col-12`,
      },
    ],
    globalResultPathAndDefaultValue: { path: `resultBySubTaskKey.export` },
  },
};

const octopusBusToHastusVscColl = {
  taskCombinatorConfig: {
    customActionKey: 'octopusBusToHastusVscColl',
    taskConstructorKey: 'TaskCombinator',
    targetEntityClassKeys: [],
    static: true,
    displayValueByDisplayKeyByLanguageCode: {
      fr: {
        shortName: 'Convertir',
        longName: 'Import de courses Octopus, Excel ou Les Halles pour GENTRA',
      },
    },
    subTaskConfigBySubTaskKey: {
      octopusToServices: {
        taskConstructorKey: 'OctopusFilesToScheduledServicesCollection',
        taskName: 'Conversion des fichiers Octopus en "Services"',
        pathAndDefaultValueByExecuteArgName: {
          dataFilesAsObjects: { path: 'mainExecuteArgs.rawOctopusDataFiles' },
          configSet: { path: 'mainExecuteArgs.octopusToServicesConfigSet' },
        },
      },
      excelToServices: {
        taskConstructorKey: 'ExcelToScheduledServices',
        taskName: 'Conversion des fichiers Excel en "Services"',
        pathAndDefaultValueByExecuteArgName: {
          dataFilesAsObjects: { path: 'mainExecuteArgs.rawExcelFiles' },
          configSet: { path: 'mainExecuteArgs.excelToServicesConfigSet' },
          firstDateToExtract: { path: 'mainExecuteArgs.firstDateToExtract' },
          lastDateToExtract: {
            fallBackMode: [
              { path: 'mainExecuteArgs.lastDateToExtract1' },
              { path: 'mainExecuteArgs.lastDateToExtract2' },
              { path: 'mainExecuteArgs.lastDateToExtract3' },
            ],
          },
        },
      },
      cleanExcelServices: {
        taskConstructorKey: 'ModifyTripsOrVariants',
        taskName: 'Nettoyage des données issues d\'Excel',
        pathAndDefaultValueByExecuteArgName: {
          entity: { path: 'resultBySubTaskKey.excelToServices' },
          entityClassKey: { defaultValue: 'ScheduledServicesCollection' },
          configSet: { path: 'mainExecuteArgs.cleanExcelServicesConfigSet' },
        },
      },
      mergeServices: {
        taskConstructorKey: 'CreateCollection',
        taskName: 'Fusion des services issus d\'Octopus et Excel',
        sourceConfigByExecuteArgName: {
          arrayOfCollections: [
            { path: 'resultBySubTaskKey.octopusToServices' },
            { path: 'resultBySubTaskKey.cleanExcelServices' },
          ],
          itemEntityClassKey: 'ScheduledService',
        },
      },
      servicesToVscs: {
        taskConstructorKey: 'ScheduledServicesCollectionToVscColl',
        taskName: 'Conversion des services en horaires de véhicules',
        pathAndDefaultValueByExecuteArgName: {
          servicesCollection: { path: 'resultBySubTaskKey.mergeServices' },
          firstDateToExtract: { path: 'mainExecuteArgs.firstDateToExtract' },
          lastDateToExtract: { path: 'mainExecuteArgs.lastDateToExtract' },
          configSet: { path: 'mainExecuteArgs.servicesToVscsConfigSet' },
        },
      },
      extract: {
        taskConstructorKey: 'ExtractAndSaveLesHallesDataFileFromLesHalles',
        taskName: 'Extraction et enregistrement des données',
        pathAndDefaultValueByExecuteArgName: {
          extractionModeKey: { defaultValue: 'schedulingVsc' },
          saveToRepo: { defaultValue: false },
          returnCollection: { defaultValue: true },
          codesLignesCommerciales: { path: 'mainExecuteArgs.codesLignesCommerciales' },
          modes: { path: 'mainExecuteArgs.modes' },
          startDate: { path: 'mainExecuteArgs.firstDateToExtract' },
          endDate: { path: 'mainExecuteArgs.firstDateToExtract' },
          limit: { path: 'mainExecuteArgs.limit' },
          baseUrl: { path: 'mainExecuteArgs.baseUrl' },
          apiKey: { path: 'mainExecuteArgs.apiKey' },
        },
      },
      lesHallesToHastus: {
        taskConstructorKey: 'LesHallesCoursesToHastusVsc',
        taskName: 'Conversion Les Halles vers Hastus',
        pathAndDefaultValueByExecuteArgName: {
          lesHallesExtractDataFilesCollection: { path: 'resultBySubTaskKey.extract' },
          placesCollection: { path: 'mainExecuteArgs.placesCollection' },
          configSet: { path: 'mainExecuteArgs.lesHallesToHastusConfigSet' },
        },
      },
      mergeVscCollections: {
        taskConstructorKey: 'CreateCollection',
        taskName: 'Fusion des collections (Octopus + Excel) + (Les Halles)',
        sourceConfigByExecuteArgName: {
          arrayOfCollections: [
            { path: 'resultBySubTaskKey.servicesToVscs' },
            { path: 'resultBySubTaskKey.lesHallesToHastus' },
          ],
          itemEntityClassKey: 'VehicleSchedule',
        },
      },
      updatePlaces: {
        taskConstructorKey: 'ModifyTripsOrVariants',
        taskName: 'Mise à jour des lieux',
        pathAndDefaultValueByExecuteArgName: {
          entity: { path: 'resultBySubTaskKey.mergeVscCollections' },
          entityClassKey: { defaultValue: 'VehicleSchedulesCollection' },
          configSet: { path: 'mainExecuteArgs.updatePlacesConfigSet' },
          context_placesCollection: { path: 'mainExecuteArgs.placesCollection' },
          context_newPlaceIdByOldPlaceIdCache: { defaultValue: {} },
        },
      },
      finalizeTrips: {
        taskConstructorKey: 'ModifyTripsOrVariants',
        taskName: 'Finalisation des voyages',
        pathAndDefaultValueByExecuteArgName: {
          entity: { path: 'resultBySubTaskKey.updatePlaces' },
          entityClassKey: { defaultValue: 'VehicleSchedulesCollection' },
          configSet: { path: 'mainExecuteArgs.finalizeTripsConfigSet' },
          context_placesCollection: { path: 'mainExecuteArgs.placesCollection' },
        },
      },
      mergeVscs: {
        taskConstructorKey: 'CreateVscCollFromVscs',
        taskName: 'Fusion des horaires',
        pathAndDefaultValueByExecuteArgName: {
          vscOrArrayOfVscsOrVscColl: { path: 'resultBySubTaskKey.finalizeTrips' },
          configSet: { defaultValue: { configObject: { configObjectsByServiceName: { mergeVscsInVscCollection: true } } } },
        },
      },
      modifyVscs: {
        taskConstructorKey: 'ModifyVscs',
        taskName: 'Finalisation de l\'horaire',
        pathAndDefaultValueByExecuteArgName: {
          entity: { path: 'resultBySubTaskKey.mergeVscs' },
          vscName: { path: 'mainExecuteArgs.vscName' },
          vscScenario: { path: 'mainExecuteArgs.vscScenario' },
          vscScheduleType: { path: 'mainExecuteArgs.vscScheduleType' },
          configSet: { path: 'mainExecuteArgs.modifyVscsConfigSet' },
          context_placesCollection: { path: 'mainExecuteArgs.placesCollection' },
        },
      },
      truncateVscsDescription: {
        taskConstructorKey: 'ModifyEntities',
        taskName: 'Troncature des decriptions pour Hastus',
        pathAndDefaultValueByExecuteArgName: {
          entity: { path: 'resultBySubTaskKey.modifyVscs' },
          configSet: {
            defaultValue: {
              configObject: {
                sourceItemEntityClassKey: 'VehicleSchedulesCollection',
                stepConfigObjects: [
                  {
                    stepName: 'Application des paramètres du jeu de configuration',
                    pathToItems: 'items',
                    configObjectsByServiceName: {
                      modifyItemProps: {
                        propConfigByPropName: {
                          vscDescription: {
                            createConfig: {
                              sourcePropPath: 'vscDescription',
                              regexAndReplacePairs: [
                                [
                                  '/(^.{30}).*/',
                                  '$1 (...)',
                                ],
                              ],
                            },
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      export: {
        taskConstructorKey: 'ExportEntityToUserData',
        taskName: 'Export',
        pathAndDefaultValueByExecuteArgName: {
          entity: { path: 'resultBySubTaskKey.truncateVscsDescription' },
          exportedDataDataName: { defaultValue: 'output_vsc' },
          oirControlFile: { defaultValue: 'default_vsc' },
          fileName: { path: 'mainExecuteArgs.fileName' },
        },
      },
    },
    executeArgInfos: [
      {
        name: 'rawExcelFiles',
        type: 'Buffer[]',
        optional: true,
      },
      {
        name: 'excelToServicesConfigSet',
        labelByLanguageCode: { fr: 'Options de conversion Excel -> Voyages régimés' },
        entityClassKey: 'ConfigSet',
        taskConstructorKey: 'ExcelToScheduledServices',
        type: 'Entity',
        defaultValue: 'excel-to-scheduled-services-base',
      },
      {
        name: 'cleanExcelServicesConfigSet',
        labelByLanguageCode: { fr: 'Options de nettoyage des données Excel' },
        entityClassKey: 'ConfigSet',
        taskConstructorKey: 'ModifyTripsOrVariants',
        type: 'Entity',
        defaultValue: 'modify-trips-or-variants-clean-excel-data-base',
      },
      {
        name: 'rawOctopusDataFiles',
        type: 'Buffer[]',
        optional: true,
      },
      {
        name: 'octopusToServicesConfigSet',
        labelByLanguageCode: { fr: 'Options de conversion Octopus -> Voyages régimés' },
        entityClassKey: 'ConfigSet',
        taskConstructorKey: 'OctopusFilesToScheduledServicesCollection',
        type: 'Entity',
        defaultValue: 'octopus-to-scheduled-services-base',
      },
      {
        name: 'servicesToVscsConfigSet',
        labelByLanguageCode: { fr: 'Options de conversion en HM non-datés' },
        entityClassKey: 'ConfigSet',
        taskConstructorKey: 'ScheduledServicesCollectionToVscColl',
        type: 'Entity',
        defaultValue: 'scheduled-services-to-vscs-base',
      },
      {
        name: 'codesLignesCommerciales',
        labelByLanguageCode: { fr: 'Codes lignes (séparés par des ";")' },
        type: 'string',
        defaultValue: '',
        optional: true,
      },
      {
        name: 'modes',
        labelByLanguageCode: { fr: 'Modes (séparés par des ";")' },
        toolTipByLanguageCode: { fr: 'Modes disponibles: TRAIN;BUS;TRAMTRAIN' },
        type: 'string',
        defaultValue: 'TRAIN',
        optional: true,
      },
      {
        name: 'lesHallesToHastusConfigSet',
        labelByLanguageCode: { fr: 'Options pour conversion Les Halles vers Hastus' },
        type: 'Entity',
        entityClassKey: 'ConfigSet',
        taskConstructorKey: 'LesHallesCoursesToHastusVsc',
        defaultValue: 'les-halles-to-orion-1',
      },
      {
        name: 'limit',
        labelByLanguageCode: { fr: 'Limite de nb de courses par requête' },
        type: 'string',
        defaultValue: '2000',
      },
      {
        name: 'baseUrl',
        labelByLanguageCode: { fr: 'URL de base' },
        type: 'string',
        defaultValue: 'http://leshallesproduction.prod.siv.sncf.fr/v5/courses?',
      },
      {
        name: 'apiKey',
        labelByLanguageCode: { fr: 'API key (pour requêtes via APIMAN)' },
        type: 'string',
        defaultValue: '',
        optional: true,
      },
      {
        name: 'updatePlacesConfigSet',
        labelByLanguageCode: { fr: 'Options de transcodification des lieux' },
        entityClassKey: 'ConfigSet',
        taskConstructorKey: 'ModifyTripsOrVariants',
        type: 'Entity',
        defaultValue: 'modify-trips-or-variants-update-places-base',
      },
      {
        name: 'finalizeTripsConfigSet',
        labelByLanguageCode: { fr: 'Options de finalisation des courses' },
        entityClassKey: 'ConfigSet',
        taskConstructorKey: 'ModifyTripsOrVariants',
        type: 'Entity',
        defaultValue: 'modify-trips-or-variants-finalize-octopus-trips-base',
      },
      {
        name: 'modifyVscsConfigSet',
        labelByLanguageCode: { fr: 'Options de finalisation des horaires' },
        entityClassKey: 'ConfigSet',
        taskConstructorKey: 'ModifyVscs',
        type: 'Entity',
        defaultValue: 'modify-vscs-finalize-octopus-bus-AURA',
      },
      {
        name: 'firstDateToExtract',
        labelByLanguageCode: { fr: 'Date représentative' },
        type: 'date',
        defaultValue: '2021-08-03',
      },
      {
        name: 'lastDateToExtract1',
        optional: true,
        labelByLanguageCode: { fr: 'Date de fin' },
        type: 'date',
        defaultValue: '',
      },
      {
        name: 'lastDateToExtract2',
        optional: true,
        labelByLanguageCode: { fr: 'Date de fin' },
        type: 'date',
        defaultValue: '',
      },
      {
        name: 'lastDateToExtract3',
        optional: true,
        labelByLanguageCode: { fr: 'Date de fin' },
        type: 'date',
        defaultValue: '',
      },
      {
        name: 'vscName',
        labelByLanguageCode: { fr: 'Nom de l\'horaire' },
        type: 'string',
        defaultValue: 'Base',
      },
      {
        name: 'vscScenario',
        labelByLanguageCode: { fr: 'Numéro de scénario' },
        type: 'string',
        defaultValue: '00',
      },
      {
        name: 'vscScheduleType',
        labelByLanguageCode: { fr: 'Type de jour' },
        type: 'HastusScheduleType',
        defaultValue: 'sem',
      },
      {
        name: 'fileName',
        optional: true,
        labelByLanguageCode: { fr: 'Nom de fichier personnalisé' },
        type: 'string',
        defaultValue: '',
      },
      {
        name: 'placesCollection',
        labelByLanguageCode: { fr: 'Jeu de lieux' },
        type: 'Entity',
        entityClassKey: 'PlacesCollection',
        defaultValue: 'filteredBasWithCoord',
        optional: true,
      },
    ],
    uiSteps: [
      {
        stepTitle: 'Sélectionner des fichiers Octopus',
        formKey: 'select-data-and-control-files',
        uiStepClassName: 'mb-3 col-6',
        formConfig: {
          entityClassKey: 'OctopusFile',
          dataFilesExecuteArgName: 'rawOctopusDataFiles',
          encoding: 'bin',
        },
      },
      {
        stepTitle: 'Sélectionner des fichiers Excel',
        formKey: 'select-data-and-control-files',
        uiStepClassName: 'mb-3 col-6',
        formConfig: {
          entityClassKey: 'DataFile',
          dataFilesExecuteArgName: 'rawExcelFiles',
          encoding: 'bin',
        },
      },
      {
        stepTitle: 'Sélectionner des données TN à extraire des Halles',
        formKey: 'default',
        uiStepClassName: 'mb-3 col-12',
        initiallyClosed: true,
        formConfig: {
          executeArgsNames: [
            'codesLignesCommerciales',
            'modes',
          ],
        },
      },
      {
        stepTitle: 'Sélectionner des options de base',
        formKey: 'default',
        formConfig: {
          executeArgsNames: [
            'firstDateToExtract',
            'vscScheduleType',
            'vscName',
            'vscScenario',
            'modifyVscsConfigSet',
            'fileName',
          ],
        },
        uiStepClassName: 'mb-3 col-12',
      },
      {
        stepTitle: 'Sélectionner des options avancées (communes)',
        formKey: 'default',
        formConfig: {
          executeArgsNames: [
            'servicesToVscsConfigSet',
            'finalizeTripsConfigSet',
            'updatePlacesConfigSet',
            'lastDateToExtract',
            'placesCollection',
          ],
        },
        initiallyClosed: true,
        uiStepClassName: 'mb-3 col-6',
      },
      {
        stepTitle: 'Sélectionner des options avancées (Octopus)',
        formKey: 'default',
        formConfig: {
          executeArgsNames: [
            'octopusToServicesConfigSet',
          ],
        },
        initiallyClosed: true,
        uiStepClassName: 'mb-3 col-6',
      },
      {
        stepTitle: 'Sélectionner des options avancées (Excel)',
        formKey: 'default',
        formConfig: {
          executeArgsNames: [
            'excelToServicesConfigSet',
            'cleanExcelServicesConfigSet',
          ],
        },
        initiallyClosed: true,
        uiStepClassName: 'mb-3 col-6',
      },
      {
        stepTitle: 'Sélectionner des options avancées (Les Halles)',
        formKey: 'default',
        formConfig: {
          executeArgsNames: [
            'lesHallesToHastusConfigSet',
            'limit',
            'baseUrl',
            'apiKey',
          ],
        },
        initiallyClosed: true,
        uiStepClassName: 'mb-3 col-6',
      },
    ],
    globalResultPathAndDefaultValue: { path: 'resultBySubTaskKey.export' },
  },
};

module.exports = {
  octopus1: octopusToHastusRtevColl,
  'octopus-sans-lieux': octopusToHastusRtevColl,
  'octopus-bus': octopusBusToHastusVscColl,
};
