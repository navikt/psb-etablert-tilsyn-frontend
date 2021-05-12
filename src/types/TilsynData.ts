import { Period } from '@navikt/period-utils';
import Kilde from './Kilde';

export interface Beskrivelser {
    periode: Period;
    tekst: string;
    mottattDato: string;
    kilde: Kilde;
}

export interface EtablertTilsynPerioder {
    periode: Period;
    tidPerDag: string;
}
