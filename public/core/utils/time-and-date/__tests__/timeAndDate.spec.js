const { expect } = require('chai');

const {
  hastusExtendedHoursToDuration, durationToHastusExtendedHoursString,
  getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings,
  getDifferenceInSecondsBetweenTwoHastusMinutesAndSecondsStrings,
  hastusMinutesAndSecondsToDuration,
  numberOfSecondsToHastusMinutesAndSecondsString,
  numberOfSecondsToHastusHoursAndMinutesString,
  isoTimeStringToDuration, durationToIsoTimeString,
  arrayOfIsoDateStringsFromStartAndEndIsoDateStrings,
  numberOfSecondsToHastusExtendedHoursString,
  isoDateStringToHastusDateString,
  Duration,
  DateTime,
} = require('..');

describe('timeAndDate utils', () => {
  describe(`# hastusExtendedHoursToDuration and reverse`, () => {
    context(`on a duration that has a fractional number of seconds`, () => {
      const duration = hastusExtendedHoursToDuration('05:45;05').plus(500);
      it(`ignores the fractional number of seconds`, () => {
        expect(durationToHastusExtendedHoursString(duration)).to.equal('05:45;05');
      });
    });
    context(`when given a simple valid extendedHoursString`, () => {
      const extendedHoursString = '05:45;05';
      it(`returns a duration`, () => {
        const duration = hastusExtendedHoursToDuration(extendedHoursString);
        expect(Duration.isDuration(duration)).to.equal(true);
      });
      it(`parses the data correctly`, () => {
        const duration = hastusExtendedHoursToDuration(extendedHoursString);
        expect(duration.hours).to.equal(5);
        expect(duration.minutes).to.equal(45);
        expect(duration.seconds).to.equal(5);
      });
      it(`formats the data correctly`, () => {
        const newText = durationToHastusExtendedHoursString(hastusExtendedHoursToDuration(extendedHoursString));
        expect(newText).to.equal(extendedHoursString);
      });
    });
    context(`on an extended hour`, () => {
      const extendedHoursString = '25:10;12';
      it(`parses the data correctly`, () => {
        const duration = hastusExtendedHoursToDuration(extendedHoursString).shiftTo('days', 'hours', 'minutes', 'seconds');
        expect(duration.days).to.equal(1);
        expect(duration.hours).to.equal(1);
        expect(duration.minutes).to.equal(10);
        expect(duration.seconds).to.equal(12);
      });
      it(`formats the data correctly`, () => {
        const newText = durationToHastusExtendedHoursString(hastusExtendedHoursToDuration(extendedHoursString));
        expect(newText).to.equal(extendedHoursString);
      });
    });
  });
  describe(`# isoDateStringToHastusDateString`, () => {
    context(`on a valid iso date string`, () => {
      it(`returns the right hastus date string`, () => {
        expect(isoDateStringToHastusDateString('2022-03-07')).to.equal('07/03/2022');
      });
    });
  });
  describe(`# numberOfSecondsToHastusMinutesAndSecondsString`, () => {
    context(`when given a valid numbers of seconds as string or numbers`, () => {
      it(`returns them in hastus format`, () => {
        expect(numberOfSecondsToHastusMinutesAndSecondsString(65)).to.equal(`1;05`);
        expect(numberOfSecondsToHastusMinutesAndSecondsString(27)).to.equal(`0;27`);
        expect(numberOfSecondsToHastusMinutesAndSecondsString(60)).to.equal(`1;00`);
        expect(numberOfSecondsToHastusMinutesAndSecondsString('120')).to.equal(`2;00`);
        expect(numberOfSecondsToHastusMinutesAndSecondsString(135)).to.equal(`2;15`);
        expect(numberOfSecondsToHastusMinutesAndSecondsString(3605)).to.equal(`60;05`);
      });
    });
  });
  describe(`# hastusMinutesAndSecondsToDuration`, () => {
    context(`when given a valid numbers of seconds as string or numbers`, () => {
      it(`parses the data correctly`, () => {
        expect(hastusMinutesAndSecondsToDuration('12;30').shiftTo('seconds').seconds).to.equal(12 * 60 + 30);
        expect(hastusMinutesAndSecondsToDuration('12;50').shiftTo('seconds').seconds).to.equal(12 * 60 + 50);
        expect(hastusMinutesAndSecondsToDuration('12').shiftTo('seconds').seconds).to.equal(12 * 60);
        expect(hastusMinutesAndSecondsToDuration('0;30').shiftTo('seconds').seconds).to.equal(30);
      });
    });
  });
  describe(`# numberOfSecondsToHastusHoursAndMinutesString`, () => {
    describe(`when given a valid numbers of seconds as string or numbers, and no options`, () => {
      it(`returns them in hastus format`, () => {
        expect(numberOfSecondsToHastusHoursAndMinutesString(65)).to.equal(`0h01`);
        expect(numberOfSecondsToHastusHoursAndMinutesString(29)).to.equal(`0h00`);
        expect(numberOfSecondsToHastusHoursAndMinutesString(120)).to.equal(`0h02`);
        expect(numberOfSecondsToHastusHoursAndMinutesString(3600)).to.equal(`1h00`);
        expect(numberOfSecondsToHastusHoursAndMinutesString(36060)).to.equal(`10h01`);
      });
    });
    describe(`when given a valid numbers of seconds as string or numbers, and options to allow seconds`, () => {
      const options = { allowSeconds: true };
      it(`returns them in hastus format`, () => {
        expect(numberOfSecondsToHastusHoursAndMinutesString(65, options)).to.equal(`0h01;05`);
        expect(numberOfSecondsToHastusHoursAndMinutesString(29, options)).to.equal(`0h00;29`);
        expect(numberOfSecondsToHastusHoursAndMinutesString(120, options)).to.equal(`0h02;00`);
        expect(numberOfSecondsToHastusHoursAndMinutesString(3611, options)).to.equal(`1h00;11`);
        expect(numberOfSecondsToHastusHoursAndMinutesString(36060, options)).to.equal(`10h01;00`);
      });
    });
  });
  describe(`#getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings`, () => {
    context(`given two valid hastus extended hours strings`, () => {
      it(`if returns the difference, positive if 2 is bigger than 1, negative otherwise`, () => {
        expect(getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings(`09:00`, `10:00`)).to.equal(3600);
        expect(getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings(`10:00`, `09:00`)).to.equal(-3600);
        expect(getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings(`23:00`, `25:00`)).to.equal(7200);
        expect(getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings(`25:00`, `23:00`)).to.equal(-7200);
        expect(getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings(`01:00;30`, `01:01;00`)).to.equal(30);
        expect(getDifferenceInSecondsBetweenTwoHastusExtendedHoursStrings(`01:01;00`, `01:00;30`)).to.equal(-30);
      });
    });
  });
  describe(`#getDifferenceInSecondsBetweenTwoHastusMinutesAndSecondsStrings`, () => {
    context(`given two valid hastus minutes and seconds strings`, () => {
      it(`if returns the difference, positive if 2 is bigger than 1, negative otherwise`, () => {
        expect(getDifferenceInSecondsBetweenTwoHastusMinutesAndSecondsStrings(`120;05`, `119;55`)).to.equal(-10);
        expect(getDifferenceInSecondsBetweenTwoHastusMinutesAndSecondsStrings(`0;00`, `5`)).to.equal(300);
      });
    });
  });
  describe(`#isoTimeStringToDuration`, () => {
    context(`Given a valid iso formatted time string (HH:mm:ss)`, () => {
      it(`Returns a duration that corresponds`, () => {
        expect(isoTimeStringToDuration('23:34:15').as('second')).to.equal(84855);
        expect(isoTimeStringToDuration('23:34').as('second')).to.equal(84840);
        expect(isoTimeStringToDuration('23').as('second')).to.equal(82800);
        expect(isoTimeStringToDuration('00:05:00').as('second')).to.equal(300);
      });
    });
    context(`Given an extended hours timestring (>24h)`, () => {
      it(`throws an error`, () => {
        expect(
          () => isoTimeStringToDuration('25:34:15').as('second'),
        ).to.throw();
      });
    });
  });
  describe(`#durationToIsoTimeString`, () => {
    context(`Given a valid duration of less than 24hrs`, () => {
      it(`returns the corresponding iso timestring`, () => {
        expect(durationToIsoTimeString(Duration.fromObject({ hour: 23, minute: 34, second: 15 }))).to.equal('23:34:15');
        expect(durationToIsoTimeString(Duration.fromMillis(84855000))).to.equal('23:34:15');
        expect(durationToIsoTimeString(Duration.fromObject({ hour: 23, minute: 2, second: 3 }))).to.equal('23:02:03');
      });
    });
    context(`Given a valid duration of more than 24hrs`, () => {
      it(`returns the corresponding iso timestring. Full 24hrs periods are ignored.`, () => {
        // expect(durationToIsoTimeString(Duration.fromObject({ hour: 24, minute: 34, second: 15 }))).to.equal('00:34:15');
        expect(durationToIsoTimeString(Duration.fromObject({ hour: 49, minute: 2, second: 3 }))).to.equal('01:02:03');
      });
    });
  });
  describe(`#arrayOfIsoDateStringsFromStartAndEndIsoDateStrings`, () => {
    context(`given two valid isoDateStrings and eventually options`, () => {
      it(`returns an array of isoDateStrings with all the dates between and including the two given dates`, () => {
        expect(arrayOfIsoDateStringsFromStartAndEndIsoDateStrings('2020-09-11', '2020-09-11')).to.eql(['2020-09-11']);
        expect(arrayOfIsoDateStringsFromStartAndEndIsoDateStrings('2020-09-11', '2020-09-12')).to.eql(['2020-09-11', '2020-09-12']);
        expect(arrayOfIsoDateStringsFromStartAndEndIsoDateStrings('2020-08-28', '2020-09-02')).to.eql(
          ['2020-08-28', '2020-08-29', '2020-08-30', '2020-08-31', '2020-09-01', '2020-09-02'],
        );
      });
      it(`considers the options`, () => {
        expect(arrayOfIsoDateStringsFromStartAndEndIsoDateStrings('2020-09-11', '2020-09-11', { endDelta: 1 }))
          .to.eql(['2020-09-11', '2020-09-12']);
        expect(arrayOfIsoDateStringsFromStartAndEndIsoDateStrings('2020-09-11', '2020-09-12', { endDelta: -1 }))
          .to.eql(['2020-09-11']);
        expect(arrayOfIsoDateStringsFromStartAndEndIsoDateStrings('2020-08-28', '2020-09-02', { startDelta: -2, endDelta: 3 }))
          .to.eql(['2020-08-26', '2020-08-27', '2020-08-28', '2020-08-29', '2020-08-30',
            '2020-08-31', '2020-09-01', '2020-09-02', '2020-09-03', '2020-09-04', '2020-09-05']);
      });
    });
  });

  describe(`#numberOfSecondsToHastusExtendedHoursString`, () => {
    context(`when given a valid numbers of seconds as string or numbers`, () => {
      it(`returns them in hastus extended hours format`, () => {
        expect(numberOfSecondsToHastusExtendedHoursString(65)).to.equal(`00:01;05`);
        expect(numberOfSecondsToHastusExtendedHoursString(27)).to.equal(`00:00;27`);
        expect(numberOfSecondsToHastusExtendedHoursString(60)).to.equal(`00:01;00`);
        expect(numberOfSecondsToHastusExtendedHoursString(120)).to.equal(`00:02;00`);
        expect(numberOfSecondsToHastusExtendedHoursString(135)).to.equal(`00:02;15`);
        expect(numberOfSecondsToHastusExtendedHoursString('3605')).to.equal(`01:00;05`);
        expect(numberOfSecondsToHastusExtendedHoursString(30605)).to.equal(`08:30;05`);
        expect(numberOfSecondsToHastusExtendedHoursString('95600')).to.equal(`26:33;20`);
        expect(numberOfSecondsToHastusExtendedHoursString(129600)).to.equal(`36:00;00`);
      });
    });
    context(`when given a number of seconds that is too high `, () => {
      it(`throws an error`, () => {
        expect(() => numberOfSecondsToHastusExtendedHoursString(129601)).to.throw(`La valeur 36:00;01 dépasse`);
      });
    });
  });

  describe(`issue #124`, () => {
    const problematicIsoTimeString = `16:00:40`;
    const problematicSequenceOfOperations = (isoTimeString) => {
      const heureSimpleAsDuration = isoTimeStringToDuration(isoTimeString);
      const heureFin = durationToHastusExtendedHoursString(heureSimpleAsDuration);
      const heureDebut = durationToHastusExtendedHoursString(heureSimpleAsDuration.minus({ minute: 2 }));
      return { heureDebut, heureFin };
    };
    it('should work with the given data and sequence of operations', () => {
      const { heureDebut, heureFin } = problematicSequenceOfOperations(problematicIsoTimeString);
      expect(heureDebut).to.equal('15:58;40');
      expect(heureFin).to.equal('16:00;40');
    });
  });

  describe(`luxon v2 migration issue`, () => {
    const dateTimeConversionFromIsoTimeString = (isoString, dateToExtract) => {
      const baseDateAsDt = DateTime.fromISO(`${dateToExtract}T00:00:00`);
      const asDt = DateTime.fromISO(isoString);
      const asHastus = numberOfSecondsToHastusExtendedHoursString(asDt.diff(baseDateAsDt).as('second'));
      return asHastus;
    };

    it('should work', () => {
      expect(dateTimeConversionFromIsoTimeString('2020-09-04T23:02:00.000Z', '2020-09-04')).to.equal('25:02;00');
    });
  });
});
