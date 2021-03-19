import React from 'react';
import { VurdertNattevåksperiode } from '../../../../types/Nattevåksperiode';
import Vurderingsresultat from '../../../../types/Vurderingsresultat';
import { prettifyPeriod } from '../../../../util/formats';
import BeskrivelserForPerioden from '../../beskrivelser-for-perioden/BeskrivelserForPerioden';
import Box, { Margin } from '../../box/Box';
import DetailView from '../../detail-view/DetailView';
import LabelledContent from '../../labelled-content/LabelledContent';

interface NattevåksperiodeVurderingsdetaljerProps {
    nattevåksperiode: VurdertNattevåksperiode;
}

const NattevåksperiodeVurderingsdetaljer = ({ nattevåksperiode }: NattevåksperiodeVurderingsdetaljerProps) => {
    return (
        <DetailView title="Vurdering av nattevåk">
            <Box marginTop={Margin.xLarge}>
                <BeskrivelserForPerioden periodebeskrivelser={nattevåksperiode.periodebeskrivelser} />
            </Box>
            <Box marginTop={Margin.xLarge}>
                <LabelledContent
                    label="Vurdering av om det er behov for nattevåk"
                    content={nattevåksperiode.begrunnelse}
                />
            </Box>
            <Box marginTop={Margin.xLarge}>
                <LabelledContent
                    label="Er det behov for nattevåk?"
                    content={nattevåksperiode.resultat === Vurderingsresultat.OPPFYLT ? 'Ja' : 'Nei'}
                />
            </Box>
            <Box marginTop={Margin.xLarge}>
                <LabelledContent
                    label="I hvilken periode er det behov for nattevåk?"
                    content={prettifyPeriod(nattevåksperiode.periode)}
                />
            </Box>
        </DetailView>
    );
};

export default NattevåksperiodeVurderingsdetaljer;
