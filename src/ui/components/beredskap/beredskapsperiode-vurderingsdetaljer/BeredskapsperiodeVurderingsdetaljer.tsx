import React from 'react';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import Vurderingsresultat from '../../../../types/Vurderingsresultat';
import BeskrivelserForPerioden from '../../beskrivelser-for-perioden/BeskrivelserForPerioden';
import Box, { Margin } from '../../box/Box';
import DetailView from '../../detail-view/DetailView';
import LabelledContent from '../../labelled-content/LabelledContent';

interface BeredskapsperiodeVurderingsdetaljerProps {
    beredskapsperiode: Vurderingsperiode;
}

const BeredskapsperiodeVurderingsdetaljer = ({ beredskapsperiode }: BeredskapsperiodeVurderingsdetaljerProps) => {
    return (
        <DetailView title="Vurdering av beredskap">
            <Box marginTop={Margin.xLarge}>
                <BeskrivelserForPerioden periodebeskrivelser={beredskapsperiode.periodebeskrivelser} />
            </Box>
            <Box marginTop={Margin.xLarge}>
                <LabelledContent
                    label="Vurdering av om det er behov for beredskap"
                    content={beredskapsperiode.begrunnelse}
                />
            </Box>
            <Box marginTop={Margin.xLarge}>
                <LabelledContent
                    label="Er det behov for beredskap?"
                    content={beredskapsperiode.resultat === Vurderingsresultat.OPPFYLT ? 'Ja' : 'Nei'}
                />
            </Box>
            <Box marginTop={Margin.xLarge}>
                <LabelledContent
                    label="I hvilken periode er det behov for beredskap?"
                    content={beredskapsperiode.periode.prettifyPeriod()}
                />
            </Box>
        </DetailView>
    );
};

export default BeredskapsperiodeVurderingsdetaljer;
