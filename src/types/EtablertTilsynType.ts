import { Period } from '@navikt/period-utils';
import { EtablertTilsynPeriode } from './TilsynResponse';
import { beregnDagerTimer } from '../util/dateUtils';
import Kilde from './Kilde';

class EtablertTilsynType {
    periode: Period;

    tidPerDag: number;

    kilde: Kilde;

    constructor({ periode, tidPerDag, kilde }: EtablertTilsynPeriode) {
        this.periode = new Period(periode.fom, periode.fom);
        this.tidPerDag = beregnDagerTimer(tidPerDag);
        this.kilde = kilde;
    }
}

export default EtablertTilsynType;
