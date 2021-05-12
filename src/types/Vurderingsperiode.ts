import { Period } from '@navikt/period-utils';
import Kilde from './Kilde';
import { Vurdering } from './TilsynResponse';
import Vurderingsresultat from './Vurderingsresultat';

class Vurderingsperiode {
    periode: Period;

    kilde: Kilde;

    resultat: Vurderingsresultat | null;

    begrunnelse: string;

    id: number;

    constructor({ periode, kilde, resultat, begrunnelse, id }: Vurdering) {
        this.periode = new Period(periode.fom, periode.fom);
        this.kilde = kilde;
        this.resultat = resultat;
        this.begrunnelse = begrunnelse;
        this.id = id;
    }

    skalVurderes() {
        return this.resultat === Vurderingsresultat.IKKE_VURDERT;
    }

    erVurdert() {
        return this.resultat === Vurderingsresultat.OPPFYLT || this.resultat === Vurderingsresultat.IKKE_OPPFYLT;
    }
}

export default Vurderingsperiode;
