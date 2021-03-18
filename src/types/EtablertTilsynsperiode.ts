import { Period } from './Period';
import Kilde from './Kilde';

export interface EtablertTilsynsperiode {
    periode: Period;
    timerDag: number;
    kilde: Kilde;
}
