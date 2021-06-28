import { HttpErrorHandler } from '@navikt/k9-http-utils';
import { Period } from '@navikt/k9-period-utils';
import Kilde from './Kilde';
import Vurderingsresultat from './Vurderingsresultat';

interface VurderingData {
    vurderinger: { periode: Period; resultat: Vurderingsresultat; begrunnelse: string; kilde: Kilde };
}

interface ContainerContract {
    readOnly: boolean;
    endpoints: {
        tilsyn: string;
    };
    httpErrorHandler: HttpErrorHandler;
    beredskapMåVurderes: boolean;
    nattevåkMåVurderes: boolean;
    lagreBeredskapvurdering: (data: VurderingData) => void;
    lagreNattevåkvurdering: (data: VurderingData) => void;
    harAksjonspunktForBeredskap: boolean;
    harAksjonspunktForNattevåk: boolean;
}

export default ContainerContract;
