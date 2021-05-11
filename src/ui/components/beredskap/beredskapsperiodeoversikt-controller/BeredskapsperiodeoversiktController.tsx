import * as React from 'react';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import BeredskapsperiodeVurderingsdetaljer from '../beredskapsperiode-vurderingsdetaljer/BeredskapsperiodeVurderingsdetaljer';
import VurderingAvBeredskapsperioderForm from '../vurdering-av-beredskapsperioder-form/VurderingAvBeredskapsperioderForm';

interface BeredskapsperiodeoversiktControllerProps {
    valgtPeriode: Vurderingsperiode;
    editMode: boolean;
    onEditClick: () => void;
    onCancelClick: () => void;
}

const BeredskapsperiodeoversiktController = ({
    valgtPeriode,
    editMode,
    onEditClick,
    onCancelClick,
}: BeredskapsperiodeoversiktControllerProps) => {
    if (!valgtPeriode) {
        return null;
    }
    if (valgtPeriode.resultat && !editMode) {
        return <BeredskapsperiodeVurderingsdetaljer beredskapsperiode={valgtPeriode} onEditClick={onEditClick} />;
    }
    return (
        <VurderingAvBeredskapsperioderForm
            beredskapsperiode={valgtPeriode}
            onSubmit={() => console.log(1)}
            onCancelClick={onCancelClick}
        />
    );
};

export default BeredskapsperiodeoversiktController;
