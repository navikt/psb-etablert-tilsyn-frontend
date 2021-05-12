import * as React from 'react';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import NattevåksperiodeVurderingsdetaljer from '../nattevåksperiode-vurderingsdetaljer/NattevåksperiodeVurderingsdetaljer';
import VurderingAvNattevåksperioderForm from '../vurdering-av-nattevåksperioder-form/VurderingAvNattevåksperioderForm';
import Beskrivelse from '../../../../types/Beskrivelse';

interface NattevåksperiodeoversiktControllerProps {
    valgtPeriode: Vurderingsperiode;
    editMode: boolean;
    onEditClick: () => void;
    onCancelClick: () => void;
    beskrivelser: Beskrivelse[];
}

const NattevåksperiodeoversiktController = ({
    valgtPeriode,
    editMode,
    onEditClick,
    onCancelClick,
    beskrivelser,
}: NattevåksperiodeoversiktControllerProps) => {
    if (!valgtPeriode) {
        return null;
    }
    if (valgtPeriode.resultat && !editMode) {
        return (
            <NattevåksperiodeVurderingsdetaljer
                nattevåksperiode={valgtPeriode}
                onEditClick={onEditClick}
                beskrivelser={beskrivelser}
            />
        );
    }
    return (
        <VurderingAvNattevåksperioderForm
            nattevåksperiode={valgtPeriode}
            onSubmit={() => console.log(1)}
            onCancelClick={onCancelClick}
            beskrivelser={beskrivelser}
        />
    );
};

export default NattevåksperiodeoversiktController;
