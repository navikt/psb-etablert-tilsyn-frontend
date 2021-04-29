import { Period } from '@navikt/period-utils';
import Vurderingsresultat from './Vurderingsresultat';
import Kilde from './Kilde';
import Periodebeskrivelse from './Periodebeskrivelse';

export interface Nattevåksperiode {
    periode: Period;
    kilde: Kilde;
    periodebeskrivelser: Periodebeskrivelse[];
}

export interface VurdertNattevåksperiode extends Nattevåksperiode {
    resultat: Vurderingsresultat;
    begrunnelse: string;
}
