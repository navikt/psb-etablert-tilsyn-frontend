import { Period } from '@navikt/period-utils';
import { prettifyDate, prettifyPeriod } from '../formats';

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
