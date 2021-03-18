import { EtablertTilsynsperiode } from './EtablertTilsynsperiode';
import { VurdertBeredskapsperiode, Beredskapsperiode } from './Beredskapsperiode';
export interface ContainerContract {
    readOnly: boolean;
    etablertTilsyn: EtablertTilsynsperiode[];
    beredskapsperioderTilVurdering: Beredskapsperiode[];
    vurderteBeredskapsperioder: VurdertBeredskapsperiode[];
}
