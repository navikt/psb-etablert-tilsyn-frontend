import dayjs from 'dayjs';
import { Period } from '../../types/Period';
import { getPeriodAsListOfDays, isValidDate, isValidPeriod } from '../dateUtils';

test('getPeriodAsListOfDays', () => {
    const period = new Period('2020-09-10', '2020-09-15');
    const expectedEqual = ['2020-09-10', '2020-09-11', '2020-09-12', '2020-09-13', '2020-09-14', '2020-09-15'];
    const expectedNotEqual = ['2020-09-10', '2020-09-11', '2020-09-13', '2020-09-14', '2020-09-15'];
    expect(getPeriodAsListOfDays(period)).toEqual(expectedEqual);
    expect(getPeriodAsListOfDays(period)).not.toEqual(expectedNotEqual);
});

test('isValidDate', () => {
    const validDate = dayjs();
    expect(isValidDate(validDate)).toBe(true);

    const invalidDate = 'torsdag';
    expect(isValidDate(invalidDate)).toBe(false);
});

test('isValidPeriod', () => {
    const validPeriod = new Period('2020-09-10', '2020-09-15');
    expect(isValidPeriod(validPeriod)).toBe(true);

    const invalidPeriod = new Period('dato', 'dato');
    expect(isValidPeriod(invalidPeriod)).toBe(false);
});
