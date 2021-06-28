import { Period } from '@navikt/k9-period-utils';
import Beskrivelse from './Beskrivelse';
import Vurderingsperiode from './Vurderingsperiode';
import { Beredskap } from './TilsynResponse';

class BeredskapType {
    beskrivelser: Beskrivelse[];

    vurderinger: Vurderingsperiode[];

    constructor({ beskrivelser, vurderinger }: Beredskap) {
        this.beskrivelser = beskrivelser.map((beskrivelse) => ({
            ...beskrivelse,
            periode: new Period(beskrivelse.periode.fom, beskrivelse.periode.tom),
        }));

        this.vurderinger = vurderinger.map((vurdering) => new Vurderingsperiode(vurdering));
    }

    finnPerioderTilVurdering(): Vurderingsperiode[] {
        return this.vurderinger.filter((vurdering) => vurdering.skalVurderes());
    }

    finnVurdertePerioder(): Vurderingsperiode[] {
        return this.vurderinger.filter((vurdering) => vurdering.erVurdert());
    }

    harPerioderTilVurdering(): boolean {
        return this.vurderinger.some((vurdering) => vurdering.skalVurderes());
    }

    harPerioder(): boolean {
        return this.vurderinger.length > 0;
    }
}

export default BeredskapType;
