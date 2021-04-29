import { Period } from '@navikt/period-utils';
import Kilde from './Kilde';

export interface EtablertTilsynsperiode {
    periode: Period;
    timerDag: number;
    kilde: Kilde;
}
