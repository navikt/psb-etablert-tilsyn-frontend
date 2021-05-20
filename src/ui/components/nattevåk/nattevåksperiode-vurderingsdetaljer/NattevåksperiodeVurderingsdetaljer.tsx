import React from 'react';
import Beskrivelse from '../../../../types/Beskrivelse';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import Vurderingsresultat from '../../../../types/Vurderingsresultat';
import BeskrivelserForPerioden from '../../beskrivelser-for-perioden/BeskrivelserForPerioden';
import Box, { Margin } from '../../box/Box';
import DetailView from '../../detail-view/DetailView';
import LabelledContent from '../../labelled-content/LabelledContent';
import LinkButton from '../../link-button/LinkButton';
import WriteAccessBoundContent from '../../write-access-bound-content/WriteAccessBoundContent';
import styles from './nattevåksperiodeVurderingsdetaljer.less';

interface NattevåksperiodeVurderingsdetaljerProps {
    nattevåksperiode: Vurderingsperiode;
    onEditClick: () => void;
    beskrivelser: Beskrivelse[];
}

const NattevåksperiodeVurderingsdetaljer = ({
    nattevåksperiode,
    onEditClick,
    beskrivelser,
}: NattevåksperiodeVurderingsdetaljerProps) => {
    return (
        <DetailView
            title="Vurdering av nattevåk"
            contentAfterTitleRenderer={() => (
                <WriteAccessBoundContent
                    contentRenderer={() => (
                        <LinkButton className={styles.endreLink} onClick={onEditClick}>
                            Rediger vurdering
                        </LinkButton>
                    )}
                />
            )}
        >
            <Box marginTop={Margin.xLarge}>
                <BeskrivelserForPerioden periodebeskrivelser={beskrivelser} />
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
                    content={nattevåksperiode.periode.prettifyPeriod()}
                />
            </Box>
        </DetailView>
    );
};

export default NattevåksperiodeVurderingsdetaljer;
