import Kilde from './Kilde';
import Vurderingsresultat from './Vurderingsresultat';

export interface TilsynResponse {
    etablertTilsynPerioder: EtablertTilsynPeriode[];
    nattevåk: Nattevåk;
    beredskap: Beredskap;
}

export interface Beredskap {
    beskrivelser: Beskrivelse[];
    vurderinger: Vurdering[];
}

export interface Nattevåk {
    beskrivelser: Beskrivelse[];
    vurderinger: Vurdering[];
}

interface Beskrivelse {
    periode: Periode;
    tekst: string;
    mottattDato: string;
    kilde: Kilde;
}

interface Periode {
    fom: string;
    tom: string;
}

export interface Vurdering {
    id: number;
    periode: Periode;
    begrunnelse: string;
    resultat: Vurderingsresultat;
    kilde: Kilde;
}

export interface EtablertTilsynPeriode {
    periode: Periode;
    tidPerDag: string;
    kilde: Kilde;
}
