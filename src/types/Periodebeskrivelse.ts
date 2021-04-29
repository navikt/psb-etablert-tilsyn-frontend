import { Period } from '@navikt/period-utils';
import Kilde from './Kilde';

class Periodebeskrivelse {
    begrunnelse: string;

    periode: Period;

    mottatt: string;

    kilde: Kilde;

    constructor({ begrunnelse, periode, mottatt, kilde }: Periodebeskrivelse) {
        this.begrunnelse = begrunnelse;
        this.periode = new Period(periode.fom, periode.tom);
        this.mottatt = mottatt;
        this.kilde = kilde;
    }
}

export default Periodebeskrivelse;
