# `@bimo/core-services-get-bbox-for-place`

Returns a bounding box for a place, according to various parameters.

Most importantly, if the place is a reference place, this will look at the coordinates of all places associated to this place, and return a bounding box that includes all these places, with a default padding of 100 units unless otherwise specified.

## Usage

```javascript
const { PlacesCollection } = require("@bimo-hastus/domain-entities");

const placesCollection = new PlacesCollection({
  items: [
    { plcIdentifier: "A" },
    {
      plcIdentifier: "A1",
      plcReferencePlace: "A",
      locaLocMethod: "5",
      locaXCoord: "20",
      locaYCoord: "20",
    },
    {
      plcIdentifier: "A2",
      plcReferencePlace: "A",
      locaLocMethod: "5",
      locaXCoord: "0",
      locaYCoord: "0",
    },
  ],
});

const getBboxForPlace = require("@bimo/core-services-get-bbox-for-place");

const placeA = placesCollection.getByBusinessId("A");
const bBox1 = getBboxForPlace(placeA, { padding: 10 }, { placesCollection });
console.log(typeof bBox1);
// BoundingBox

console.log(bBox1.mapshaperStyleString);
// "-10,-10,30,30"

const bBox2 = getBboxForPlace(
  placeA,
  {
    xPadding: 10,
    yMinPadding: 5,
    yMaxPadding: 0,
  },
  { placesCollection }
);

const { xMin, yMin, xMax, yMax } = bBox2;
console.log({ xMin, yMin, xMax, yMax });
// { xMin: -10, yMin: -5, xMax: 30, yMax: 20 }
```
