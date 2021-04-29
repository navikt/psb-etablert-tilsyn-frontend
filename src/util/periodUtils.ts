import { Period } from '@navikt/period-utils';
import { prettifyPeriod } from './formats';

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
