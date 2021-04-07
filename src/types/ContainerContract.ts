import { Beredskapsperiode, VurdertBeredskapsperiode } from './Beredskapsperiode';
import { HttpErrorHandler } from './HttpErrorHandler';
import { Nattevåksperiode, VurdertNattevåksperiode } from './Nattevåksperiode';

interface ContainerContract {
    readOnly: boolean;
    beredskapsperioderTilVurdering: Beredskapsperiode[];
    vurderteBeredskapsperioder: VurdertBeredskapsperiode[];
    nattevåksperioderTilVurdering: Nattevåksperiode[];
    vurderteNattevåksperioder: VurdertNattevåksperiode[];
    endpoints: {
        etablertTilsyn: string;
    };
    httpErrorHandler: HttpErrorHandler;
}

export default ContainerContract;
