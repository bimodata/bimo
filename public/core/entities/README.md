# `@bimo/core-entities`

This package holds the implementation of the entities that constitute the Bimo [Entity-relationship model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model).

In other projects, what we call an _Entity_ here is often called a _Model_.

Anyway, an entity or model or class or object or whatever is a type of thing that we want to be able to represent with data, and want to be able to manipulate through services provided by our software.

In our case, we want to represent and manipulate public transit scheduling data: we need to manipulate trips, trip points, vehicles, places ... so we created entities for all of that, and you will find them in this package !

## Usage

You can create very low level entities if you want:

```javascript
const { TripPoint } = require("@bimo/core-entities");

const myTripPoint = new TripPoint({
  trpptPlace: "Southmost Station",
  trpptInternalArrivalTime: "06:00",
  trpptInternalDepartureTime: "06:40",
});

console.log(myTripPoint.stopDurationInSeconds); // 120
```

... but that's probably not the most useful.

Higher level entities will let you create their children easily:

```javascript
const myTrip = new Trip({
  trpNumber: "1234",
  tripPoints: [
    {
      trpptPlace: "South Station",
      trpptInternalArrivalTime: "07:00",
      trpptInternalDepartureTime: "07:02",
    },
    {
      trpptPlace: "Grand Central",
      trpptInternalArrivalTime: "07:15",
      trpptInternalDepartureTime: "07:16",
    },
    {
      trpptPlace: "North Station",
      trpptInternalArrivalTime: "07:25",
      trpptInternalDepartureTime: "07:30",
    },
  ],
});

myTrip.setStartAndEndAttributesFromPoints();

console.log(myTrip.shortLoggingOutput); // 1234-(South Station|07:00 → 07:25|North Station)
console.log(myTrip.durationInSeconds); // 1500
```

You can also add lower level entities that you created separately and create new ones:

```javascript
myTrip.tripPoints.add(myTripPoint);
myTrip.tripPoints.createNewItem({
  trpptPlace: "Northmost Station",
  trpptInternalArrivalTime: "08:00",
  trpptInternalDepartureTime: "08:05",
});
```

And there are many methods available on all the entities.

```javascript
myTrip.setStartAndEndAttributesFromPoints();
console.log(myTrip.shortLoggingOutput); // 1234-(South Station|07:00 → 08:00|Northmost Station)
myTrip.validateTripPointTimes(); // Error: Problème avec Southmost Station(A:06:00, D:06:02, noStopping:0): Arrivée avant le départ du précédent (North Station(A:07:25, D:07:25, noStopping:0))

myTrip.tripPoints.sortByTime();
myTrip.setStartAndEndAttributesFromPoints();
console.log(myTrip.shortLoggingOutput); // 1234-(Southmost Station|06:02 → 08:00|Northmost Station)
myTrip.validateTripPointTimes(); // No error
```

## Documentation

Extensive documentation of entities' attributes and methods is unfortunately not available as of now ... If you would like to help create it, any contribution is greatly appreciated !

In the meantime, looking at the source code is your best option.

## The Class Factory Pattern

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

Right now, the typescript compiler does not seem to understand that this should all be stripped at compilation, and we end up with references to empty files.

And when the UI imports the ESM version of the entities, and later tries to compile, it does not like that.

So right now, I disabled the ESM compilation of the entities, and pointed the "import" to CJS, and it seems to work.

## Old Typescript issue

https://github.com/microsoft/TypeScript/issues/38484


# ESM does not work !

## Thoughts about specific entities / groupes of entities

### VehicleSchedule vs VehicleSchedulesCollection vs VscInclOir

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
