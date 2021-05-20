import { Period } from '@navikt/period-utils';
import { getPeriodDifference } from './dateUtils';

export const getStringMedPerioder = (perioder: Period[]): string => {
    if (perioder.length === 1) {
        return `perioden ${perioder[0].prettifyPeriod()}`;
    }

    let perioderString = '';
    perioder.forEach((periode, index) => {
        const prettyPeriod = periode.prettifyPeriod();
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

export const finnResterendePerioder = (
    perioderFraForm: {
        period: Period;
    }[],
    periodeTilVurdering: Period
): Period[] => {
    const formatertePerioderFraForm = perioderFraForm.map((periode) => periode.period);
    const resterendePerioder =
        formatertePerioderFraForm.length > 0 && getPeriodDifference(periodeTilVurdering, formatertePerioderFraForm);

    return resterendePerioder;
};
