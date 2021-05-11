import * as React from 'react';
import { useEffect } from 'react';
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
    const [editMode, setEditMode] = React.useState(false);

    const perioderTilVurdering = beredskapsperiodeoversikt.finnPerioderTilVurdering();
    const vurderteBeredskapsperioder = beredskapsperiodeoversikt.finnVurdertePerioder();

    const velgPeriode = (periode: Vurderingsperiode) => {
        setValgtPeriode(periode);
        setEditMode(false);
    };

    useEffect(() => {
        if (beredskapsperiodeoversikt.harPerioderTilVurdering()) {
            setValgtPeriode(perioderTilVurdering[0]);
        }
    }, []);

    return (
        <>
            <BeredskapsperiodeoversiktMessages beredskapsperiodeoversikt={beredskapsperiodeoversikt} />
            <NavigationWithDetailView
                navigationSection={() => (
                    <Periodenavigasjon
                        perioderTilVurdering={perioderTilVurdering}
                        vurdertePerioder={vurderteBeredskapsperioder}
                        onPeriodeValgt={velgPeriode}
                        harValgtPeriode={valgtPeriode !== null}
                    />
                )}
                detailSection={() => (
                    <BeredskapsperiodeoversiktController
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

export default Beredskapsperiodeoversikt;
