import React from 'react';
import { VurdertNattevåksperiode } from '../../../../types/Nattevåksperiode';
import Vurderingsresultat from '../../../../types/Vurderingsresultat';
import BeskrivelserForPerioden from '../../beskrivelser-for-perioden/BeskrivelserForPerioden';
import Box, { Margin } from '../../box/Box';
import DetailView from '../../detail-view/DetailView';
import LabelledContent from '../../labelled-content/LabelledContent';
import WriteAccessBoundContent from '../../write-access-bound-content/WriteAccessBoundContent';
import LinkButton from '../../link-button/LinkButton';
import styles from './nattevåksperiodeVurderingsdetaljer.less';

interface NattevåksperiodeVurderingsdetaljerProps {
    nattevåksperiode: VurdertNattevåksperiode;
    onEditClick: () => void;
}

const NattevåksperiodeVurderingsdetaljer = ({
    nattevåksperiode,
    onEditClick,
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
                    content={nattevåksperiode.periode.prettifyPeriod()}
                />
            </Box>
        </DetailView>
    );
};

export default NattevåksperiodeVurderingsdetaljer;
