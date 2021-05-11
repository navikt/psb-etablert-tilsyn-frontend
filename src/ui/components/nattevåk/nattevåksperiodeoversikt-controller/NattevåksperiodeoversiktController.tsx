import * as React from 'react';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import NattevåksperiodeVurderingsdetaljer from '../nattevåksperiode-vurderingsdetaljer/NattevåksperiodeVurderingsdetaljer';
import VurderingAvNattevåksperioderForm from '../vurdering-av-nattevåksperioder-form/VurderingAvNattevåksperioderForm';

interface NattevåksperiodeoversiktControllerProps {
    valgtPeriode: Vurderingsperiode;
    editMode: boolean;
    onEditClick: () => void;
    onCancelClick: () => void;
}

const NattevåksperiodeoversiktController = ({
    valgtPeriode,
    editMode,
    onEditClick,
    onCancelClick,
}: NattevåksperiodeoversiktControllerProps) => {
    if (!valgtPeriode) {
        return null;
    }
    if (valgtPeriode.resultat && !editMode) {
        return <NattevåksperiodeVurderingsdetaljer nattevåksperiode={valgtPeriode} onEditClick={onEditClick} />;
    }
    return (
        <VurderingAvNattevåksperioderForm
            nattevåksperiode={valgtPeriode}
            onSubmit={() => console.log(1)}
            onCancelClick={onCancelClick}
        />
    );
};

export default NattevåksperiodeoversiktController;
