import React from 'react';
import { VurdertBeredskapsperiode } from '../../../types/Beredskapsperiode';
import Vurderingsresultat from '../../../types/Vurderingsresultat';
import { prettifyPeriod } from '../../../util/formats';
import BeskrivelserForPerioden from '../beskrivelser-for-perioden/BeskrivelserForPerioden';
import Box, { Margin } from '../box/Box';
import DetailView from '../detail-view/DetailView';
import LabelledContent from '../labelled-content/LabelledContent';

interface BeredskapsperiodeVurderingsdetaljerProps {
    beredskapsperiode: VurdertBeredskapsperiode;
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
                    content={prettifyPeriod(beredskapsperiode.periode)}
                />
            </Box>
        </DetailView>
    );
};

export default BeredskapsperiodeVurderingsdetaljer;
