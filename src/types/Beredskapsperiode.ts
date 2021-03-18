import Vurderingsresultat from './Vurderingsresultat';
import { Period } from './Period';
import Kilde from './Kilde';
import Periodebeskrivelse from './Periodebeskrivelse';

export interface Beredskapsperiode {
    periode: Period;
    kilde: Kilde;
    periodebeskrivelser: Periodebeskrivelse[];
}

export interface VurdertBeredskapsperiode extends Beredskapsperiode {
    resultat: Vurderingsresultat;
    begrunnelse: string;
}
