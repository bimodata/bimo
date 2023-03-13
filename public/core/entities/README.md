# `@bimo/core-entities`

## VehicleSchedule vs VehicleSchedulesCollection vs VscInclOir

Dans le modèle Hastus (ou plutôt dans les modèle Hastus tel qu'exposé dans les OIG/OIR), un vsc peut en inclure d'autre via les "vscInclOir". On y stock un identifiant correspondant au vscInternalNumber d'un autre vsc du même fichier.

Aujourd'hui dans la plupart des cas nous avons un fichier = un vscCollection. Il est donc tentant de simplement chercher dans les autres vsc de la même collection que celle du blocking schedule un vsc portant le même numéro.

Mais l'équivalence ficher oir = vscCollection est circonstantielle. Et même lorsqu'elle est vraie, il y a la notion de aggregation vs composition qui entre en jeu.

Dans le modèle Hastus en bd (pas dans les OIG/OIR), on peut supposer que les liens d'inclusions sont gérés par des id uniques - l'équivalent dans BIMO serait qu'on pointe vers des repo id

La "contrainte" hastus selon laquelle la voiture d'un voyage d'un HM n'est connue que quand cet HM est ouvert à partir d'un voiturage qui l'inclus semble pertinente et il ne semble pas judicieux d'essayer de la contourner.

On pourrait donc avoir:

- sur un vsc blocking, les vsc scheduling sont chargés via les vscInclOir: déjà fait (via la collection)
- (ajouter d'autres options: permettre de fournir d'autres vsc potentiels via le contexte?)
- sur un vsc scheduling, une nouvelle propriété "blockingVscs" qui serait
  - en cache, donc pas sérialisée
  - renseignée au moment où on rempli les vscInclOir

Gérer explicitement dans VehicleSchedulesCollection.createFromOirStyleData() ?
Gérer explicitement dans addIncludedVsc

(vérifier dans quels cas on produit déjà ajd des vscColl composition)
