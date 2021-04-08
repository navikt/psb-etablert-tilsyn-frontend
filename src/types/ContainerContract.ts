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
}

export default ContainerContract;
