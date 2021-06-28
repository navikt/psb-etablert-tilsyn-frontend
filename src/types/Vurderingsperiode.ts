import { Period } from '@navikt/k9-period-utils';
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
        this.periode = new Period(periode.fom, periode.tom);
        this.kilde = kilde;
        this.resultat = resultat;
        this.begrunnelse = begrunnelse;
        this.id = id;
    }

    skalVurderes(): boolean {
        return this.resultat === Vurderingsresultat.IKKE_VURDERT;
    }

    erVurdert(): boolean {
        return this.resultat === Vurderingsresultat.OPPFYLT || this.resultat === Vurderingsresultat.IKKE_OPPFYLT;
    }
}

export default Vurderingsperiode;
