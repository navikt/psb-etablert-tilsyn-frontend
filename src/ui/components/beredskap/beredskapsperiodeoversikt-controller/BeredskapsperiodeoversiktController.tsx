import * as React from 'react';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import BeredskapsperiodeVurderingsdetaljer from '../beredskapsperiode-vurderingsdetaljer/BeredskapsperiodeVurderingsdetaljer';
import VurderingAvBeredskapsperioderForm from '../vurdering-av-beredskapsperioder-form/VurderingAvBeredskapsperioderForm';

interface BeredskapsperiodeoversiktControllerProps {
    valgtPeriode: Vurderingsperiode;
}

const BeredskapsperiodeoversiktController = ({ valgtPeriode }: BeredskapsperiodeoversiktControllerProps) => {
    if (!valgtPeriode) {
        return null;
    }
    if (valgtPeriode.resultat) {
        return <BeredskapsperiodeVurderingsdetaljer beredskapsperiode={valgtPeriode} />;
    }
    return <VurderingAvBeredskapsperioderForm beredskapsperiode={valgtPeriode} onSubmit={() => console.log(1)} />;
};

export default BeredskapsperiodeoversiktController;
