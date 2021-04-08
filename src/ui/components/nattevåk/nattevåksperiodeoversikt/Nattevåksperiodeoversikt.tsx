import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import Vurderingsoversikt from '../../../../types/Vurderingsoversikt';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import NavigationWithDetailView from '../../navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from '../../periodenavigasjon/Periodenavigasjon';
import NattevåksperiodeVurderingsdetaljer from '../nattevåksperiode-vurderingsdetaljer/NattevåksperiodeVurderingsdetaljer';
import NattevåksperiodeoversiktMessages from '../nattevåksperiodeoversikt-messages/NattevåksperiodeoversiktMessages';
import VurderingAvNattevåksperioderForm from '../vurdering-av-nattevåksperioder-form/VurderingAvNattevåksperioderForm';

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
                detailSection={() => {
                    if (!valgtPeriode) {
                        return null;
                    }
                    if (valgtPeriode.resultat) {
                        return <NattevåksperiodeVurderingsdetaljer nattevåksperiode={valgtPeriode} />;
                    }
                    return (
                        <VurderingAvNattevåksperioderForm
                            nattevåksperiode={valgtPeriode}
                            onSubmit={() => console.log(1)}
                        />
                    );
                }}
            />
        </>
    );
};

export default Nattevåksperiodeoversikt;
