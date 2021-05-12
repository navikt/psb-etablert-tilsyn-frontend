import { Period } from '@navikt/period-utils';
import { Beskrivelser } from './TilsynData';
import Vurderingsperiode from './Vurderingsperiode';
import { Nattevåk } from './TilsynResponse';

class NattevåkType {
    beskrivelser: Beskrivelser[];

    vurderinger: Vurderingsperiode[];

    constructor({ beskrivelser, vurderinger }: Nattevåk) {
        this.beskrivelser = beskrivelser.map((beskrivelse) => ({
            ...beskrivelse,
            periode: new Period(beskrivelse.periode.fom, beskrivelse.periode.tom),
        }));

        this.vurderinger = vurderinger.map((vurdering) => new Vurderingsperiode(vurdering));
    }

    finnPerioderTilVurdering() {
        return this.vurderinger.filter((vurdering) => vurdering.skalVurderes());
    }

    finnVurdertePerioder() {
        return this.vurderinger.filter((vurdering) => vurdering.erVurdert());
    }

    harPerioderTilVurdering() {
        return this.vurderinger.some((vurdering) => vurdering.skalVurderes());
    }

    harPerioder() {
        return this.vurderinger.length > 0;
    }
}

export default NattevåkType;
