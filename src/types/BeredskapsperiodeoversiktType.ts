import Beredskapsperiode from './Beredskapsperiode';
import Vurderingsresultat from './Vurderingsresultat';

class BeredskapsperiodeoversiktType {
    perioder: Beredskapsperiode[];

    constructor(perioder: Beredskapsperiode[]) {
        this.perioder = perioder;
    }

    harPerioderTilVurdering() {
        return this.perioder.some(({ resultat }) => resultat === null);
    }

    finnVurdertePerioder() {
        return this.perioder.filter(
            ({ resultat }) => resultat === Vurderingsresultat.OPPFYLT || resultat === Vurderingsresultat.IKKE_OPPFYLT
        );
    }

    finnPerioderTilVurdering() {
        return this.perioder.filter(({ resultat }) => resultat === null);
    }

    harBehovForBeredskap() {
        return this.perioder.length > 0;
    }
}

export default BeredskapsperiodeoversiktType;
