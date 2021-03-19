import AlertStripe from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Beredskapsperiode, VurdertBeredskapsperiode } from '../../../types/Beredskapsperiode';
import { getStringMedPerioder } from '../../../util/periodUtils';
import ContainerContext from '../../context/ContainerContext';
import BeredskapsperiodeVurderingsdetaljer from '../beredskapsperiode-vurderingsdetaljer/BeredskapsperiodeVurderingsdetaljer';
import Box, { Margin } from '../box/Box';
import NavigationWithDetailView from '../navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from '../periodenavigasjon/Periodenavigasjon';
import VurderingAvBeredskapsperioderForm from '../vurdering-av-beredskapsperioder-form/VurderingAvBeredskapsperioderForm';
import styles from './beredskap.less';

const Beredskap = () => {
    const { beredskapsperioderTilVurdering, vurderteBeredskapsperioder } = React.useContext(ContainerContext);
    const [valgtPeriode, setValgtPeriode] = React.useState<Beredskapsperiode | VurdertBeredskapsperiode>(null);

    const harPerioderTilVurdering = beredskapsperioderTilVurdering?.length > 0;
    const beredskapsperioder = harPerioderTilVurdering
        ? beredskapsperioderTilVurdering.map((omsorgsperiode) => omsorgsperiode.periode)
        : [];

    return (
        <>
            {harPerioderTilVurdering && (
                <Box marginBottom={Margin.large}>
                    <AlertStripe type="advarsel" className={styles.beredskap__alertstripe}>
                        {`Vurder behov for beredskap i ${getStringMedPerioder(beredskapsperioder)}.`}
                    </AlertStripe>
                </Box>
            )}

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
