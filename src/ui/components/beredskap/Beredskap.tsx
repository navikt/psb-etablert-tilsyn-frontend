import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Beredskapsperiode, VurdertBeredskapsperiode } from '../../../types/Beredskapsperiode';
import ContainerContext from '../../context/ContainerContext';
import NavigationWithDetailView from '../navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from '../periodenavigasjon/Periodenavigasjon';
import VurderingAvBeredskapsperioderForm from '../vurdering-av-beredskapsperioder-form/VurderingAvBeredskapsperioderForm';
import BeredskapsperiodeVurderingsdetaljer from '../beredskapsperiode-vurderingsdetaljer/BeredskapsperiodeVurderingsdetaljer';

const Beredskap = () => {
    const { beredskapsperioderTilVurdering, vurderteBeredskapsperioder } = React.useContext(ContainerContext);
    const [valgtPeriode, setValgtPeriode] = React.useState<Beredskapsperiode | VurdertBeredskapsperiode>(null);

    return (
        <>
            <Undertittel>Beredskap</Undertittel>
            <NavigationWithDetailView
                navigationSection={() => (
                    <Periodenavigasjon
                        perioderTilVurdering={beredskapsperioderTilVurdering}
                        vurdertePerioder={vurderteBeredskapsperioder}
                        onPeriodeValgt={setValgtPeriode}
                    />
                )}
                detailSection={() => {
                    if (!valgtPeriode) {
                        return null;
                    }
                    if ((valgtPeriode as VurdertBeredskapsperiode).resultat) {
                        return (
                            <BeredskapsperiodeVurderingsdetaljer
                                beredskapsperiode={valgtPeriode as VurdertBeredskapsperiode}
                            />
                        );
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

export default Beredskap;
