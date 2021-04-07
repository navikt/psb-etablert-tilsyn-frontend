import Vurderingsresultat from './Vurderingsresultat';
import { Period } from './Period';
import Kilde from './Kilde';
import Periodebeskrivelse from './Periodebeskrivelse';

interface Beredskapsperiode {
    periode: Period;
    kilde: Kilde;
    periodebeskrivelser: Periodebeskrivelse[];
    resultat: Vurderingsresultat | null;
    begrunnelse: string;
}

export default Beredskapsperiode;
