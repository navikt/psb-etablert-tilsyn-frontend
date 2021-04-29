import Vurderingsperiode from './Vurderingsperiode';

class Vurderingsoversikt {
    perioder: Vurderingsperiode[];

    constructor(perioder: Vurderingsperiode[]) {
        this.perioder = perioder.map((periode) => new Vurderingsperiode(periode));
    }

    harPerioderTilVurdering() {
        return this.perioder.some((periode) => periode.harIngenResultat());
    }

    finnVurdertePerioder() {
        return this.perioder.filter((periode) => periode.erVurdert());
    }

    finnPerioderTilVurdering() {
        return this.perioder.filter((periode) => periode.harIngenResultat());
    }

    harPerioder() {
        return this.perioder.length > 0;
    }
}

export default Vurderingsoversikt;
