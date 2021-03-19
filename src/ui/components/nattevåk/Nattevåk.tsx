import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Nattevåksperiode, VurdertNattevåksperiode } from '../../../types/Nattevåksperiode';
import ContainerContext from '../../context/ContainerContext';
import NattevåksperiodeVurderingsdetaljer from '../nattevåksperiode-vurderingsdetaljer/NattevåksperiodeVurderingsdetaljer';
import NavigationWithDetailView from '../navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from '../periodenavigasjon/Periodenavigasjon';
import VurderingAvNattevåksperioderForm from '../vurdering-av-nattevåksperioder-form/VurderingAvNattevåksperioderForm';

const Nattevåk = () => {
    const { nattevåksperioderTilVurdering, vurderteNattevåksperioder } = React.useContext(ContainerContext);
    const [valgtPeriode, setValgtPeriode] = React.useState<Nattevåksperiode | VurdertNattevåksperiode>(null);

    return (
        <>
            <Undertittel>Nattevåk</Undertittel>
            <NavigationWithDetailView
                navigationSection={() => (
                    <Periodenavigasjon
                        perioderTilVurdering={nattevåksperioderTilVurdering}
                        vurdertePerioder={vurderteNattevåksperioder}
                        onPeriodeValgt={setValgtPeriode}
                    />
                )}
                detailSection={() => {
                    if (!valgtPeriode) {
                        return null;
                    }
                    if ((valgtPeriode as VurdertNattevåksperiode).resultat) {
                        return (
                            <NattevåksperiodeVurderingsdetaljer
                                nattevåksperiode={valgtPeriode as VurdertNattevåksperiode}
                            />
                        );
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

export default Nattevåk;
