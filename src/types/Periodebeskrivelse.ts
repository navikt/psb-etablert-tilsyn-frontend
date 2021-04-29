import { Period } from '@navikt/period-utils';
import Kilde from './Kilde';

interface Periodebeskrivelse {
    begrunnelse: string;
    periode: Period;
    mottatt: string;
    kilde: Kilde;
}

export default Periodebeskrivelse;
