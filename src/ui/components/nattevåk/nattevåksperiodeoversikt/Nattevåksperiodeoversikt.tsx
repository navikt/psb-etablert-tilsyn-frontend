import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import Vurderingsoversikt from '../../../../types/Vurderingsoversikt';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import NavigationWithDetailView from '../../navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from '../../periodenavigasjon/Periodenavigasjon';
import NattevåksperiodeoversiktController from '../nattevåksperiodeoversikt-controller/NattevåksperiodeoversiktController';
import NattevåksperiodeoversiktMessages from '../nattevåksperiodeoversikt-messages/NattevåksperiodeoversiktMessages';

interface NattevåksperiodeoversiktProps {
    nattevåksperiodeoversikt: Vurderingsoversikt;
}

const Nattevåksperiodeoversikt = ({ nattevåksperiodeoversikt }: NattevåksperiodeoversiktProps) => {
    const [valgtPeriode, setValgtPeriode] = React.useState<Vurderingsperiode>(null);

    const perioderTilVurdering = nattevåksperiodeoversikt.finnPerioderTilVurdering();
    const vurderteNattevåksperioder = nattevåksperiodeoversikt.finnVurdertePerioder();

    return (
        <>
            <NattevåksperiodeoversiktMessages nattevåksperiodeoversikt={nattevåksperiodeoversikt} />
            <Undertittel>Nattevåk</Undertittel>

            <NavigationWithDetailView
                navigationSection={() => (
                    <Periodenavigasjon
                        perioderTilVurdering={perioderTilVurdering}
                        vurdertePerioder={vurderteNattevåksperioder}
                        onPeriodeValgt={setValgtPeriode}
                    />
                )}
                detailSection={() => <NattevåksperiodeoversiktController valgtPeriode={valgtPeriode} />}
            />
        </>
    );
};

export default Nattevåksperiodeoversikt;
