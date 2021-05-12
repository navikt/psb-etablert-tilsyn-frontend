import Kilde from './Kilde';
import Vurderingsresultat from './Vurderingsresultat';

export interface TilsynResponse {
    etablertTilsynPerioder: EtablertTilsynPerioder[];
    nattevåk: Nattevåk;
    beredskap: Beredskap;
}

export interface Beredskap {
    beskrivelser: Beskrivelser[];
    vurderinger: Vurderinger[];
}

export interface Nattevåk {
    beskrivelser: Beskrivelser[];
    vurderinger: Vurderinger[];
}

interface Beskrivelser {
    periode: Periode;
    tekst: string;
    mottattDato: string;
    kilde: Kilde;
}

interface Periode {
    fom: string;
    tom: string;
}

export interface Vurderinger {
    id: number;
    periode: Periode;
    begrunnelse: string;
    resultat: Vurderingsresultat;
    kilde: Kilde;
}

export interface EtablertTilsynPerioder {
    periode: Periode;
    tidPerDag: string;
    kilde: Kilde;
}
