import { HttpErrorHandler } from '@navikt/k9-http-utils';

interface ContainerContract {
    readOnly: boolean;
    endpoints: {
        tilsyn: string;
    };
    httpErrorHandler: HttpErrorHandler;
    beredskapMåVurderes: boolean;
    nattevåkMåVurderes: boolean;
    lagreBeredskapvurdering: (data: any) => void;
    lagreNattevåkvurdering: (data: any) => void;
    harAksjonspunktForBeredskap: boolean;
    harAksjonspunktForNattevåk: boolean;
}

export default ContainerContract;
