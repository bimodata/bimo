module.exports = {
  octopus1: `
flowchart TD

rawHastusVscDataFiles[\\"rawHastusVscDataFiles"/]
placesCollection[\\"Jeu de lieux"/]
runTimesCollName[\\"Nom du fichier de versions de temps de parcours"/]
commRtevIdentifier[\\"Nom de la version de lignes commerciales (max 10 car)"/]
techRtevIdentifier[\\"Nom de la version de lignes techniques (max 10 car)"/]
errRtevIdentifier[\\"Nom de la version de lignes d'erreurs (max 10 car)"/]
routesCollName[\\"Nom du fichier de versions de lignes"/]
createRouteVersionsConfigSet[\\"Options de création de versions de lignes"/]
improveRtevCollConfigSet[\\"Options pour amélioration des variantes à partir des versions de lignes modèle"/]
templateRouteVersionsCollection[\\"Jeu de versions de lignes modèle (créées à partir d'Agathe)"/]
createRunTimesConfigSet[\\"Options de création de temps de parcours"/]
createPrefConfigConfigSet[\\"Options d'analyse des voies de préférence"/]
modifyRouteVersionsConfigSet[\\"Options de finalisation des variantes"/]
addPrefPlacesConfigSet[\\"Options d'application de voies de préférence"/]
rteverExportControlFile[\\"Fichier de contrôle pour export des versions de lignes"/]
rtverExportControlFile[\\"Fichier de contrôle pour export des versions de temps"/]

importVscCollections["Import des horaires Hastus<br>CreateEntitiesFromOigDataFiles"]
rawHastusVscDataFiles --> importVscCollections

mergeVscCollections["Fusion des fichiers d'horaires Hastus<br>CreateCollection"]
importVscCollections -----> mergeVscCollections

createRtevColl["Création de versions de lignes<br>CreateRouteVersionsCollectionFromVscCollection"]
mergeVscCollections -----> createRtevColl
routesCollName --> createRtevColl
commRtevIdentifier --> createRtevColl
techRtevIdentifier --> createRtevColl
createRouteVersionsConfigSet --> createRtevColl
placesCollection --> createRtevColl

improveRtev["Projection des variantes à la voie<br>ImproveRtevCollBasedOnTemplates"]
createRtevColl -----> improveRtev
placesCollection --> improveRtev
improveRtevCollConfigSet --> improveRtev
errRtevIdentifier --> improveRtev
templateRouteVersionsCollection --> improveRtev

finalizeVariants["Finalisation des variantes<br>ModifyEntities"]
improveRtev -----> finalizeVariants
modifyRouteVersionsConfigSet --> finalizeVariants
placesCollection --> finalizeVariants

addPrefPlaces["Application des voies de préférence<br>ModifyTripsOrVariants"]
finalizeVariants -----> addPrefPlaces
addPrefPlacesConfigSet --> addPrefPlaces
placesCollection --> addPrefPlaces

exportRouteVersions["Export<br>ExportEntityToUserData"]
addPrefPlaces -----> exportRouteVersions
rteverExportControlFile --> exportRouteVersions

createPrefConfig["Création des voies de préférence<br>CreatePreferredPlaceConfigFromRtevOrVscColl"]
improveRtev -----> createPrefConfig
placesCollection --> createPrefConfig
createPrefConfigConfigSet --> createPrefConfig

createRunTimes["Création des temps de parcours<br>CreateRunTimeVersionsCollectionFromVscCollection"]
placesCollection --> createRunTimes
createRunTimesConfigSet --> createRunTimes
runTimesCollName --> createRunTimes
mergeVscCollections -----> createRunTimes

exportRunTimes["Export<br>ExportEntityToUserData"]
createRunTimes -----> exportRunTimes
rtverExportControlFile --> exportRunTimes

`,
  'octopus-sans-lieux': `
flowchart TD

rawHastusVscDataFiles[\\"rawHastusVscDataFiles"/]
runTimesCollName[\\"Nom du fichier de versions de temps de parcours"/]
commRtevIdentifier[\\"Nom de la version de lignes commerciales (max 10 car)"/]
techRtevIdentifier[\\"Nom de la version de lignes techniques (max 10 car)"/]
errRtevIdentifier[\\"Nom de la version de lignes d'erreurs (max 10 car)"/]
routesCollName[\\"Nom du fichier de versions de lignes"/]
createRouteVersionsConfigSet[\\"Options de création de versions de lignes"/]
improveRtevCollConfigSet[\\"Options pour amélioration des variantes à partir des versions de lignes modèle"/]
templateRouteVersionsCollection[\\"Jeu de versions de lignes modèle (créées à partir d'Agathe)"/]
createRunTimesConfigSet[\\"Options de création de temps de parcours"/]
createPrefConfigConfigSet[\\"Options d'analyse des voies de préférence"/]
modifyRouteVersionsConfigSet[\\"Options de finalisation des variantes"/]
addPrefPlacesConfigSet[\\"Options d'application de voies de préférence"/]
rteverExportControlFile[\\"Fichier de contrôle pour export des versions de lignes"/]
rtverExportControlFile[\\"Fichier de contrôle pour export des versions de temps"/]

importVscCollections["Import des horaires Hastus<br>CreateEntitiesFromOigDataFiles"]
rawHastusVscDataFiles --> importVscCollections

mergeVscCollections["Fusion des fichiers d'horaires Hastus<br>CreateCollection"]
importVscCollections -----> mergeVscCollections

createRtevColl["Création de versions de lignes<br>CreateRouteVersionsCollectionFromVscCollection"]
mergeVscCollections -----> createRtevColl
routesCollName --> createRtevColl
commRtevIdentifier --> createRtevColl
techRtevIdentifier --> createRtevColl
createRouteVersionsConfigSet --> createRtevColl

improveRtev["Projection des variantes à la voie<br>ImproveRtevCollBasedOnTemplates"]
createRtevColl -----> improveRtev
improveRtevCollConfigSet --> improveRtev
errRtevIdentifier --> improveRtev
templateRouteVersionsCollection --> improveRtev

finalizeVariants["Finalisation des variantes<br>ModifyEntities"]
improveRtev -----> finalizeVariants
modifyRouteVersionsConfigSet --> finalizeVariants

addPrefPlaces["Application des voies de préférence<br>ModifyTripsOrVariants"]
finalizeVariants -----> addPrefPlaces
addPrefPlacesConfigSet --> addPrefPlaces

exportRouteVersions["Export<br>ExportEntityToUserData"]
addPrefPlaces -----> exportRouteVersions
rteverExportControlFile --> exportRouteVersions

createPrefConfig["Création des voies de préférence<br>CreatePreferredPlaceConfigFromRtevOrVscColl"]
improveRtev -----> createPrefConfig
createPrefConfigConfigSet --> createPrefConfig

createRunTimes["Création des temps de parcours<br>CreateRunTimeVersionsCollectionFromVscCollection"]
createRunTimesConfigSet --> createRunTimes
runTimesCollName --> createRunTimes
mergeVscCollections -----> createRunTimes

exportRunTimes["Export<br>ExportEntityToUserData"]
createRunTimes -----> exportRunTimes
rtverExportControlFile --> exportRunTimes

`,

  'octopus-bus': `
flowchart TD

rawExcelFiles[\\"rawExcelFiles"/]
excelToServicesConfigSet[\\"Options de conversion Excel -> Voyages régimés"/]
cleanExcelServicesConfigSet[\\"Options de nettoyage des données Excel"/]
rawOctopusDataFiles[\\"rawOctopusDataFiles"/]
octopusToServicesConfigSet[\\"Options de conversion Octopus -> Voyages régimés"/]
servicesToVscsConfigSet[\\"Options de conversion en HM non-datés"/]
codesLignesCommerciales[\\"Codes lignes (séparés par des #quot;;#quot;)"/]
modes[\\"Modes (séparés par des #quot;;#quot;)"/]
lesHallesToHastusConfigSet[\\"Options pour conversion Les Halles vers Hastus"/]
limit[\\"Limite de nb de courses par requête"/]
baseUrl[\\"URL de base"/]
apiKey[\\"API key (pour requêtes via APIMAN)"/]
updatePlacesConfigSet[\\"Options de transcodification des lieux"/]
finalizeTripsConfigSet[\\"Options de finalisation des courses"/]
modifyVscsConfigSet[\\"Options de finalisation des horaires"/]
firstDateToExtract[\\"Date représentative"/]
lastDateToExtract1[\\"Date de fin"/]
lastDateToExtract2[\\"Date de fin"/]
lastDateToExtract3[\\"Date de fin"/]
vscName[\\"Nom de l'horaire"/]
vscScenario[\\"Numéro de scénario"/]
vscScheduleType[\\"Type de jour"/]
fileName[\\"Nom de fichier personnalisé"/]

octopusToServices["Conversion des fichiers Octopus en #quot;Services#quot;<br>OctopusFilesToScheduledServicesCollection"]
rawOctopusDataFiles --> octopusToServices
octopusToServicesConfigSet --> octopusToServices

excelToServices["Conversion des fichiers Excel en #quot;Services#quot;<br>ExcelToScheduledServices"]
rawExcelFiles --> excelToServices
excelToServicesConfigSet --> excelToServices
firstDateToExtract --> excelToServices
lastDateToExtract1 --> excelToServices
lastDateToExtract2 --> excelToServices
lastDateToExtract3 --> excelToServices

cleanExcelServices["Nettoyage des données issues d'Excel<br>ModifyTripsOrVariants"]
excelToServices -----> cleanExcelServices
cleanExcelServicesConfigSet --> cleanExcelServices

mergeServices["Fusion des services issus d'Octopus et Excel<br>CreateCollection"]
octopusToServices -----> mergeServices
cleanExcelServices -----> mergeServices

servicesToVscs["Conversion des services en horaires de véhicules<br>ScheduledServicesCollectionToVscColl"]
mergeServices -----> servicesToVscs
firstDateToExtract --> servicesToVscs
lastDateToExtract --> servicesToVscs
servicesToVscsConfigSet --> servicesToVscs

extract["Extraction et enregistrement des données<br>ExtractAndSaveLesHallesDataFileFromLesHalles"]
codesLignesCommerciales --> extract
modes --> extract
firstDateToExtract --> extract
firstDateToExtract --> extract
limit --> extract
baseUrl --> extract
apiKey --> extract

lesHallesToHastus["Conversion Les Halles vers Hastus<br>LesHallesCoursesToHastusVsc"]
extract -----> lesHallesToHastus
lesHallesToHastusConfigSet --> lesHallesToHastus

mergeVscCollections["Fusion des collections (Octopus + Excel) + (Les Halles)<br>CreateCollection"]
servicesToVscs -----> mergeVscCollections
lesHallesToHastus -----> mergeVscCollections

updatePlaces["Mise à jour des lieux<br>ModifyTripsOrVariants"]
mergeVscCollections -----> updatePlaces
updatePlacesConfigSet --> updatePlaces

finalizeTrips["Finalisation des voyages<br>ModifyTripsOrVariants"]
updatePlaces -----> finalizeTrips
finalizeTripsConfigSet --> finalizeTrips

mergeVscs["Fusion des horaires<br>CreateVscCollFromVscs"]
finalizeTrips -----> mergeVscs

modifyVscs["Finalisation de l'horaire<br>ModifyVscs"]
mergeVscs -----> modifyVscs
vscName --> modifyVscs
vscScenario --> modifyVscs
vscScheduleType --> modifyVscs
modifyVscsConfigSet --> modifyVscs

truncateVscsDescription["Troncature des decriptions pour Hastus<br>ModifyEntities"]
modifyVscs -----> truncateVscsDescription

export["Export<br>ExportEntityToUserData"]
truncateVscsDescription -----> export
fileName --> export

`,
};
