import { HttpErrorHandler } from './HttpErrorHandler';
import { Nattevåksperiode, VurdertNattevåksperiode } from './Nattevåksperiode';

interface ContainerContract {
    readOnly: boolean;
    nattevåksperioderTilVurdering: Nattevåksperiode[];
    vurderteNattevåksperioder: VurdertNattevåksperiode[];
    endpoints: {
        etablertTilsyn: string;
        beredskap: string;
        nattevåk: string;
    };
    httpErrorHandler: HttpErrorHandler;
    onFinished: (someProp: any) => void;
}

export default ContainerContract;
