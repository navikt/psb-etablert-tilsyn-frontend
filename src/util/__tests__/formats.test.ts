import { Period } from '../../types/Period';
import { convertToInternationalPeriod, prettifyDate, prettifyPeriod } from '../formats';

test('prettifyDate', () => {
    const expectedEqual = '10.09.2020';
    expect(prettifyDate('2020-09-10')).toBe(expectedEqual);

    const expectedNotEqual = '10.9.2020';
    expect(prettifyDate('2020-09-10')).not.toBe(expectedNotEqual);
});

test('prettifyPeriod', () => {
    const period = new Period('2020-09-09', '2020-09-15');
    const expectedEqual = '09.09.2020 - 15.09.2020';
    expect(prettifyPeriod(period)).toBe(expectedEqual);
});

test('convertToInternationalPeriod', () => {
    const period = new Period('2020-09-10', '2020-09-15');

    const expectedEqual = {
        from: '2020-09-10',
        to: '2020-09-15',
    };

    expect(convertToInternationalPeriod(period)).toEqual(expectedEqual);
});
