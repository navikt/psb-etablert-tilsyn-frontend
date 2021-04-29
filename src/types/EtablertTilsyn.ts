import { Period } from '@navikt/period-utils';
import Kilde from './Kilde';

class EtablertTilsyn {
    periode: Period;

    timerDag: number;

    kilde: Kilde;

    constructor({ periode, timerDag, kilde }: EtablertTilsyn) {
        this.periode = new Period(periode.fom, periode.fom);
        this.timerDag = timerDag;
        this.kilde = kilde;
    }
}

export default EtablertTilsyn;
