import AlertStripe from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Nattevåksperiode, VurdertNattevåksperiode } from '../../../types/Nattevåksperiode';
import { getStringMedPerioder } from '../../../util/periodUtils';
import ContainerContext from '../../context/ContainerContext';
import Box, { Margin } from '../box/Box';
import NattevåksperiodeVurderingsdetaljer from './nattevåksperiode-vurderingsdetaljer/NattevåksperiodeVurderingsdetaljer';
import NavigationWithDetailView from '../navigation-with-detail-view/NavigationWithDetailView';
import Periodenavigasjon from '../periodenavigasjon/Periodenavigasjon';
import VurderingAvNattevåksperioderForm from './vurdering-av-nattevåksperioder-form/VurderingAvNattevåksperioderForm';
import styles from './nattevåk.less';

const Nattevåk = () => {
    const { nattevåksperioderTilVurdering, vurderteNattevåksperioder } = React.useContext(ContainerContext);
    const [valgtPeriode, setValgtPeriode] = React.useState<Nattevåksperiode | VurdertNattevåksperiode>(null);

    const harPerioderTilVurdering = nattevåksperioderTilVurdering?.length > 0;
    const nattevåksperioder = harPerioderTilVurdering
        ? nattevåksperioderTilVurdering.map((omsorgsperiode) => omsorgsperiode.periode)
        : [];

    const ikkeBehovForNattevåk =
        (!nattevåksperioderTilVurdering || nattevåksperioderTilVurdering.length === 0) &&
        (!vurderteNattevåksperioder || vurderteNattevåksperioder.length === 0);

    if (ikkeBehovForNattevåk) {
        return (
            <>
                <Undertittel>Nattevåk</Undertittel>
                <p>Søker har ikke oppgitt at det er behov for nattevåk.</p>
            </>
        );
    }

    return (
        <>
            {harPerioderTilVurdering && (
                <Box marginBottom={Margin.large}>
                    <AlertStripe type="advarsel" className={styles.beredskap__alertstripe}>
                        {`Vurder behov for nattevåk i ${getStringMedPerioder(nattevåksperioder)}.`}
                    </AlertStripe>
                </Box>
            )}
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
