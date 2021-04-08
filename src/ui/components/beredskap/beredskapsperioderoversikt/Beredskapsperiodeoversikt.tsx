import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import Vurderingsoversikt from '../../../../types/Vurderingsoversikt';
import NavigationWithDetailView from '../../navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from '../../periodenavigasjon/Periodenavigasjon';
import BeredskapsperiodeVurderingsdetaljer from '../beredskapsperiode-vurderingsdetaljer/BeredskapsperiodeVurderingsdetaljer';
import BeredskapsperiodeoversiktMessages from '../beredskapsperiodeoversikt-messages/BeredskapsperiodeoversiktMessages';
import VurderingAvBeredskapsperioderForm from '../vurdering-av-beredskapsperioder-form/VurderingAvBeredskapsperioderForm';

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
            <Undertittel>Beredskap</Undertittel>

            <NavigationWithDetailView
                navigationSection={() => (
                    <Periodenavigasjon
                        perioderTilVurdering={perioderTilVurdering}
                        vurdertePerioder={vurderteBeredskapsperioder}
                        onPeriodeValgt={setValgtPeriode}
                    />
                )}
                detailSection={() => {
                    if (!valgtPeriode) {
                        return null;
                    }
                    if (valgtPeriode.resultat) {
                        return <BeredskapsperiodeVurderingsdetaljer beredskapsperiode={valgtPeriode} />;
                    }
                    return (
                        <VurderingAvBeredskapsperioderForm
                            beredskapsperiode={valgtPeriode}
                            onSubmit={() => console.log(1)}
                        />
                    );
                }}
            />
        </>
    );
};

export default Beredskapsperiodeoversikt;
