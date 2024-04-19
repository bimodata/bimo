/* eslint-disable global-require */
const { expect } = require('chai');

describe('Bimo Entities Readme Examples', () => {
  it(`works as expected`, () => {
    const { TripPoint } = require('..');

    const myTripPoint = new TripPoint({
      trpptPlace: 'Southmost Station',
      trpptInternalArrivalTime: '06:00',
      trpptInternalDepartureTime: '06:02',
    });

    expect(myTripPoint.stopDurationInSeconds).to.equal(120);

    const { Trip } = require('..');

    const myTrip = new Trip({
      trpNumber: '1234',
      tripPoints: [
        { trpptPlace: 'South Station', trpptInternalArrivalTime: '07:00', trpptInternalDepartureTime: '07:00' },
        { trpptPlace: 'Grand Central', trpptInternalArrivalTime: '07:15', trpptInternalDepartureTime: '07:16' },
        { trpptPlace: 'North Station', trpptInternalArrivalTime: '07:25', trpptInternalDepartureTime: '07:25' },
      ],
    });

    myTrip.setStartAndEndAttributesFromPoints();

    expect(myTrip.shortLoggingOutput).to.equal('1234-(South Station|07:00 → 07:25|North Station)');
    expect(myTrip.durationInSeconds).to.equal(1500);

    myTrip.tripPoints.add(myTripPoint);
    myTrip.tripPoints.createNewItem({
      trpptPlace: 'Northmost Station',
      trpptInternalArrivalTime: '08:00',
      trpptInternalDepartureTime: '08:05',
    });

    myTrip.setStartAndEndAttributesFromPoints();

    expect(myTrip.shortLoggingOutput).to.equal('1234-(South Station|07:00 → 08:00|Northmost Station)');
    expect(() => myTrip.validateTripPointTimes()).to.throw(
      'Problème avec Southmost Station(A:06:00, D:06:02, noStopping:0): Arrivée avant le départ du précédent'
      + ' (North Station(A:07:25, D:07:25, noStopping:0))',
    );

    myTrip.tripPoints.sortByTime();
    myTrip.setStartAndEndAttributesFromPoints();

    expect(myTrip.shortLoggingOutput).to.equal('1234-(Southmost Station|06:02 → 08:00|Northmost Station)');
    expect(() => myTrip.validateTripPointTimes()).to.not.throw();
  });
});
