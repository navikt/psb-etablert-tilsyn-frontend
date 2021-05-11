import * as React from 'react';
import { useEffect } from 'react';
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
    const [editMode, setEditMode] = React.useState(false);

    const perioderTilVurdering = nattevåksperiodeoversikt.finnPerioderTilVurdering();
    const vurderteNattevåksperioder = nattevåksperiodeoversikt.finnVurdertePerioder();

    const velgPeriode = (periode: Vurderingsperiode) => {
        setValgtPeriode(periode);
        setEditMode(false);
    };

    useEffect(() => {
        if (nattevåksperiodeoversikt.harPerioderTilVurdering()) {
            setValgtPeriode(perioderTilVurdering[0]);
        }
    }, []);

    return (
        <>
            <NattevåksperiodeoversiktMessages nattevåksperiodeoversikt={nattevåksperiodeoversikt} />
            <NavigationWithDetailView
                navigationSection={() => (
                    <Periodenavigasjon
                        perioderTilVurdering={perioderTilVurdering}
                        vurdertePerioder={vurderteNattevåksperioder}
                        onPeriodeValgt={velgPeriode}
                        harValgtPeriode={valgtPeriode !== null}
                    />
                )}
                detailSection={() => (
                    <NattevåksperiodeoversiktController
                        valgtPeriode={valgtPeriode}
                        editMode={editMode}
                        onEditClick={() => setEditMode(true)}
                        onCancelClick={() => velgPeriode(null)}
                    />
                )}
            />
        </>
    );
};

export default Nattevåksperiodeoversikt;
