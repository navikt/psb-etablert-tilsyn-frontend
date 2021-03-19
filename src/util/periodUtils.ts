import { Period } from '../types/Period';
import { dateFromString, isSameOrBefore } from './dateUtils';
import { prettifyPeriod } from './formats';

export const sortPeriodsByFomDate = (period1: Period, period2: Period): number => {
    if (period1.startsBefore(period2)) {
        return -1;
    }
    if (period2.startsBefore(period1)) {
        return 1;
    }
    return 0;
};

const checkIfPeriodsAreEdgeToEdge = (period, otherPeriod) => {
    const dayAfterPeriod = dateFromString(period.tom).add(1, 'day');
    const startOfNextPeriod = dateFromString(otherPeriod.fom);
    return dayAfterPeriod.isSame(startOfNextPeriod);
};

export const slåSammenSammenhengendePerioder = (periods: Period[]): Period[] => {
    if (!periods || periods.length === 0) {
        return [];
    }

    const sortedPeriods = periods.sort((p1, p2) => sortPeriodsByFomDate(p1, p2));
    const combinedPeriods: Period[] = [];

    const getFirstDate = (date1: string, date2: string) => {
        if (isSameOrBefore(date1, date2)) {
            return date1;
        }

        return date2;
    };

    const getLastDate = (date1: string, date2: string) => {
        if (isSameOrBefore(date1, date2)) {
            return date2;
        }

        return date1;
    };

    const checkIfPeriodCanBeCombinedWithPreviousPeriod = (period: Period, previousPeriod?: Period) => {
        if (!previousPeriod) {
            return false;
        }
        const hasOverlapWithPreviousPeriod = previousPeriod.includesDate(period.fom);
        const periodsAreEdgeToEdge = checkIfPeriodsAreEdgeToEdge(previousPeriod, period);
        return hasOverlapWithPreviousPeriod || periodsAreEdgeToEdge;
    };

    const combinePeriods = (period, otherPeriod) => {
        const firstFom = getFirstDate(period.fom, otherPeriod.fom);
        const lastTom = getLastDate(period.tom, otherPeriod.tom);
        const combinedPeriod = new Period(firstFom, lastTom);
        return combinedPeriod;
    };

    const addToListIfNotAdded = (period: Period) => {
        const previousPeriod = combinedPeriods[combinedPeriods.length - 1];
        const canBeCombinedWithPreviousPeriod = checkIfPeriodCanBeCombinedWithPreviousPeriod(period, previousPeriod);

        if (canBeCombinedWithPreviousPeriod) {
            const combinedPeriod = combinePeriods(period, previousPeriod);
            combinedPeriods[combinedPeriods.length - 1] = combinedPeriod;
        } else {
            combinedPeriods.push(period);
        }
    };

    let skipNextPeriod = false;

    sortedPeriods.forEach((period, index, array) => {
        if (!skipNextPeriod) {
            const nextPeriod = array[index + 1];
            if (nextPeriod) {
                const hasOverlapWithNextPeriod = nextPeriod.includesDate(period.tom);
                const periodsAreEdgeToEdge = checkIfPeriodsAreEdgeToEdge(period, nextPeriod);

                if (hasOverlapWithNextPeriod || periodsAreEdgeToEdge) {
                    const combinedPeriod = combinePeriods(period, nextPeriod);
                    combinedPeriods.push(combinedPeriod);
                    skipNextPeriod = true;
                } else {
                    addToListIfNotAdded(period);
                }
            } else {
                addToListIfNotAdded(period);
            }
        } else {
            skipNextPeriod = false;
        }
    });
    return combinedPeriods;
};

export const finnHullIPerioder = (periode: Period[]) => {
    const hull: Period[] = [];
    const sortedPeriods = periode.sort((p1, p2) => sortPeriodsByFomDate(p1, p2));

    sortedPeriods.forEach((period, index, array) => {
        const nextPeriod = array[index + 1];
        if (nextPeriod) {
            if (!checkIfPeriodsAreEdgeToEdge(period, nextPeriod) && !nextPeriod.includesDate(period.tom)) {
                const dayAfterPeriod = dateFromString(period.tom).add(1, 'day').format('YYYY-MM-DD');
                const dayBeforeStartOfNextPeriod = dateFromString(nextPeriod.fom)
                    .subtract(1, 'day')
                    .format('YYYY-MM-DD');
                const nyttHull = new Period(dayAfterPeriod, dayBeforeStartOfNextPeriod);
                hull.push(nyttHull);
            }
        }
    });
    return hull;
};

export const finnMaksavgrensningerForPerioder = (perioder: Period[]): Period => {
    let maksimalSøknadsperiode: Period;

    perioder.forEach((periode) => {
        let nyFom;
        let nyTom;
        if (!maksimalSøknadsperiode) {
            maksimalSøknadsperiode = new Period(periode.fom, periode.tom);
        } else {
            if (periode.startsBefore(maksimalSøknadsperiode)) {
                nyFom = periode.fom;
            }

            if (periode.endsAfter(maksimalSøknadsperiode)) {
                nyTom = periode.tom;
            }

            if (nyFom || nyTom) {
                maksimalSøknadsperiode = new Period(
                    nyFom || maksimalSøknadsperiode.fom,
                    nyTom || maksimalSøknadsperiode.tom
                );
            }
        }
    });

    return maksimalSøknadsperiode;
};

export const getStringMedPerioder = (perioder: Period[]): string => {
    if (perioder.length === 1) {
        return `perioden ${prettifyPeriod(perioder[0])}`;
    }

    let perioderString = '';
    perioder.forEach((periode, index) => {
        const prettyPeriod = prettifyPeriod(periode);
        if (index === 0) {
            perioderString = prettyPeriod;
        } else if (index === perioder.length - 1) {
            perioderString = `${perioderString} og ${prettyPeriod}`;
        } else {
            perioderString = `${perioderString}, ${prettyPeriod}`;
        }
    });

    return `periodene ${perioderString}`;
};
