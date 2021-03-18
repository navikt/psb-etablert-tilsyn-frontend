import { Dayjs } from 'dayjs';
import { Period } from '../../../types/Period';
import { dateFromString } from '../../../util/dateUtils';
import { tomorrow } from '../../../constants/dateConstants';

export function required(v: any) {
    if (v === null || v === undefined || v === '') {
        return 'Du må oppgi en verdi';
    }
    return true;
}

export function dateIsNotInTheFuture(dateString: string): string | boolean {
    const date: Dayjs = dateFromString(dateString);
    if (date.isSame(tomorrow) || date.isAfter(tomorrow)) {
        return 'Datoen kan ikke settes senere enn dagens dato';
    }
    return true;
}

export const detErTilsynsbehovPåDatoen = (dato: any, perioderMedTilsynsbehov: Period[]): string | boolean => {
    const detErTilsynsbehovPåDato = perioderMedTilsynsbehov.some((periode) =>
        new Period(periode.fom, periode.tom).includesDate(dato)
    );
    if (detErTilsynsbehovPåDato) {
        return true;
    }
    return 'Dato må være innenfor en periode med tilsynsbehov';
};

export const datoenInngårISøknadsperioden = (dato: any, søknadsperiode: Period): string | boolean => {
    if (søknadsperiode.includesDate(dato)) {
        return true;
    }

    return 'Dato må være innenfor søknadsperioden';
};

export const detErIngenInnleggelsePåDato = (dato: any, innleggelsesperioder: Period[]): string | boolean => {
    const detErInnleggelsePåDato = innleggelsesperioder.some((periode) =>
        new Period(periode.fom, periode.tom).includesDate(dato)
    );
    if (detErInnleggelsePåDato) {
        return 'Dato må være utenfor innleggelsesperioden(e)';
    }
    return true;
};

export const datoErInnenforResterendeVurderingsperioder = (
    dato: any,
    resterendeVurderingsperioder: Period[]
): string | true => {
    const datoErInnenfor = resterendeVurderingsperioder.some((period) =>
        new Period(period.fom, period.tom).includesDate(dato)
    );

    if (datoErInnenfor) {
        return true;
    }

    return 'Dato må være innenfor periodene som vurderes';
};

export const fomDatoErFørTomDato = (periode: Period): string | true => {
    const fom = dateFromString(periode.fom);
    const tom = dateFromString(periode.tom);

    if (fom.isAfter(tom)) {
        return 'Fra-dato må være før til-dato';
    }

    return true;
};
