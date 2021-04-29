import { Period } from '@navikt/period-utils';
import Vurderingsresultat from './Vurderingsresultat';
import Kilde from './Kilde';
import Periodebeskrivelse from './Periodebeskrivelse';

class Vurderingsperiode {
    periode: Period;

    kilde: Kilde;

    periodebeskrivelser: Periodebeskrivelse[];

    resultat: Vurderingsresultat | null;

    begrunnelse: string;

    constructor({ periode, kilde, periodebeskrivelser, resultat, begrunnelse }: Vurderingsperiode) {
        this.periode = new Period(periode.fom, periode.fom);
        this.kilde = kilde;
        this.periodebeskrivelser = periodebeskrivelser.map(
            (periodebeskrivelse) => new Periodebeskrivelse(periodebeskrivelse)
        );
        this.resultat = resultat;
        this.begrunnelse = begrunnelse;
    }

    harIngenResultat() {
        return this.resultat === null;
    }

    erVurdert() {
        return this.resultat === Vurderingsresultat.OPPFYLT || this.resultat === Vurderingsresultat.IKKE_OPPFYLT;
    }
}

export default Vurderingsperiode;
