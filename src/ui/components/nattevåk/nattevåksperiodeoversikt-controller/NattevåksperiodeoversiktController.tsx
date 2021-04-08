import * as React from 'react';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import NattevåksperiodeVurderingsdetaljer from '../nattevåksperiode-vurderingsdetaljer/NattevåksperiodeVurderingsdetaljer';
import VurderingAvNattevåksperioderForm from '../vurdering-av-nattevåksperioder-form/VurderingAvNattevåksperioderForm';

interface NattevåksperiodeoversiktControllerProps {
    valgtPeriode: Vurderingsperiode;
}

const NattevåksperiodeoversiktController = ({ valgtPeriode }: NattevåksperiodeoversiktControllerProps) => {
    if (!valgtPeriode) {
        return null;
    }
    if (valgtPeriode.resultat) {
        return <NattevåksperiodeVurderingsdetaljer nattevåksperiode={valgtPeriode} />;
    }
    return <VurderingAvNattevåksperioderForm nattevåksperiode={valgtPeriode} onSubmit={() => console.log(1)} />;
};

export default NattevåksperiodeoversiktController;
