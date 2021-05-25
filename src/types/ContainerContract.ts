import { HttpErrorHandler } from './HttpErrorHandler';

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
