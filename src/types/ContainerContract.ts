import { HttpErrorHandler } from '@navikt/k9-http-utils';
import Saksbehandlere from './Saksbehandlere';

interface ContainerContract {
    readOnly: boolean;
    endpoints: {
        tilsyn: string;
        sykdom: string;
        sykdomInnleggelse: string
    };
    httpErrorHandler: HttpErrorHandler;
    beredskapMåVurderes: boolean;
    nattevåkMåVurderes: boolean;
    lagreBeredskapvurdering: (data: any) => void;
    lagreNattevåkvurdering: (data: any) => void;
    harAksjonspunktForBeredskap: boolean;
    harAksjonspunktForNattevåk: boolean;
    saksbehandlere: Saksbehandlere;
    smoeringErTilgjengelig: boolean;
}

export default ContainerContract;
