import * as React from 'react';
import Vurderingsoversikt from '../../../../types/Vurderingsoversikt';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import NavigationWithDetailView from '../../navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from '../../periodenavigasjon/Periodenavigasjon';
import BeredskapsperiodeoversiktController from '../beredskapsperiodeoversikt-controller/BeredskapsperiodeoversiktController';
import BeredskapsperiodeoversiktMessages from '../beredskapsperiodeoversikt-messages/BeredskapsperiodeoversiktMessages';

interface BeredskapsperiodeoversiktProps {
    beredskapsperiodeoversikt: Vurderingsoversikt;
}

const Beredskapsperiodeoversikt = ({ beredskapsperiodeoversikt }: BeredskapsperiodeoversiktProps) => {
    const [valgtPeriode, setValgtPeriode] = React.useState<Vurderingsperiode>(null);

    const perioderTilVurdering = beredskapsperiodeoversikt.finnPerioderTilVurdering();
    const vurderteBeredskapsperioder = beredskapsperiodeoversikt.finnVurdertePerioder();

    return (
        <>
            <BeredskapsperiodeoversiktMessages beredskapsperiodeoversikt={beredskapsperiodeoversikt} />
            <NavigationWithDetailView
                navigationSection={() => (
                    <Periodenavigasjon
                        perioderTilVurdering={perioderTilVurdering}
                        vurdertePerioder={vurderteBeredskapsperioder}
                        onPeriodeValgt={setValgtPeriode}
                    />
                )}
                detailSection={() => <BeredskapsperiodeoversiktController valgtPeriode={valgtPeriode} />}
            />
        </>
    );
};

export default Beredskapsperiodeoversikt;
