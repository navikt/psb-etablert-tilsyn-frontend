import * as React from 'react';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import BeredskapsperiodeVurderingsdetaljer from '../beredskapsperiode-vurderingsdetaljer/BeredskapsperiodeVurderingsdetaljer';
import VurderingAvBeredskapsperioderForm from '../vurdering-av-beredskapsperioder-form/VurderingAvBeredskapsperioderForm';
import { Beskrivelser } from '../../../../types/TilsynData';

interface BeredskapsperiodeoversiktControllerProps {
    valgtPeriode: Vurderingsperiode;
    editMode: boolean;
    onEditClick: () => void;
    onCancelClick: () => void;
    beskrivelser: Beskrivelser[];
}

const BeredskapsperiodeoversiktController = ({
    valgtPeriode,
    editMode,
    onEditClick,
    onCancelClick,
    beskrivelser,
}: BeredskapsperiodeoversiktControllerProps) => {
    if (!valgtPeriode) {
        return null;
    }
    if (valgtPeriode.resultat && !editMode) {
        return (
            <BeredskapsperiodeVurderingsdetaljer
                beredskapsperiode={valgtPeriode}
                onEditClick={onEditClick}
                beskrivelser={beskrivelser}
            />
        );
    }
    return (
        <VurderingAvBeredskapsperioderForm
            beredskapsperiode={valgtPeriode}
            onSubmit={() => console.log(1)}
            onCancelClick={onCancelClick}
            beskrivelser={beskrivelser}
        />
    );
};

export default BeredskapsperiodeoversiktController;
