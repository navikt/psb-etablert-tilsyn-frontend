import { Period } from '@navikt/period-utils';
import Vurderingsresultat from './Vurderingsresultat';
import Kilde from './Kilde';
import Periodebeskrivelse from './Periodebeskrivelse';

interface Vurderingsperiode {
    periode: Period;
    kilde: Kilde;
    periodebeskrivelser: Periodebeskrivelse[];
    resultat: Vurderingsresultat | null;
    begrunnelse: string;
}

export default Vurderingsperiode;
