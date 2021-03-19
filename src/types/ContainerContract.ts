import { EtablertTilsynsperiode } from './EtablertTilsynsperiode';
import { VurdertBeredskapsperiode, Beredskapsperiode } from './Beredskapsperiode';
import { Nattevåksperiode, VurdertNattevåksperiode } from './Nattevåksperiode';

interface ContainerContract {
    readOnly: boolean;
    etablertTilsyn: EtablertTilsynsperiode[];
    beredskapsperioderTilVurdering: Beredskapsperiode[];
    vurderteBeredskapsperioder: VurdertBeredskapsperiode[];
    nattevåksperioderTilVurdering: Nattevåksperiode[];
    vurderteNattevåksperioder: VurdertNattevåksperiode[];
}

export default ContainerContract;
