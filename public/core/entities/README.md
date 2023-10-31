# `@bimo/core-entities`

# ESM does not work !

I used to be happy documenting types in JSDOC until I switched the entities to the "ClassFactory" pattern.

I think I have written something somewhere else about the switch to this pattern, but basically, it is the way I came up with to allow extending entities (adding props and methods) that are deep down in the hierarchy, like TripPoints, without having to redefine all its parents in the hierarchy (TripPointsCollection, Trip, TripsCollection ...).

It turned out to be much more complicated than I expected, but it kindof works now: at least, VsCode is able to give good autocomplete about entities in most cases.

And the current cases are usually that I consume the actual code in its CJS form, in packages that are still written in plain javascript, and use require.
And I had JSDOC annotations in these packages, and I import the types in these annotations.

When I tried switching the next.js UI to the new version of the entities, the build of the UI started to fail.

All of the entities have the following pattern at the start of the Class Factory:

```
import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { Route as BimoRoute } from "../base-types/rawIndex";
export { Route as BimoRoute } from "../base-types/rawIndex";
```

The important part is the last line from above: we reexport the "base-type" from the Class Factory, under an Alias.
This allows easier imports in other Entities of the hierarchy. For example, in Variant.ts, we have:

```
import { BimoVariantPointsCollection } from "./VariantPointsCollection";
import { BimoVariantPoint, VariantPointProps } from "./VariantPoint";
import { BimoRoute } from "./Route";
import { BimoPlace } from "./Place";
import { BimoVariantItinerariesCollection } from "./VariantItinerariesCollection";
```

All of these are "base types" and could have directly been imported from the "base-types" index as follows:

```
import { Route as BimoRoute, Place as BimoPlace, ... } from "../base-types/index";
```

They are only used in type annotations, and point to files that contain only type declarations. (And that should probably be suffixed as _.d.ts rather than _.ts, I'm not exactly sure why they are not).

Right now, the compiler does not seem to understand that this should all be stripped at compilation, and we and up with references to empty files.

And when the UI imports the ESM version of the entities, and later tries to compile, it does not like that.

So right now, I disabled the ESM compilation of the entities, and pointed the "import" to CJS, and it seems to work.

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
