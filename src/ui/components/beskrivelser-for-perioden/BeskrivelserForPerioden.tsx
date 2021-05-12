import * as React from 'react';
import Kilde from '../../../types/Kilde';
import { Beskrivelser } from '../../../types/TilsynData';
import { prettifyDate } from '../../../util/formats';
import Box, { Margin } from '../box/Box';
import ContentWithTooltip from '../content-with-tooltip/ContentWithTooltip';
import OnePersonIconGray from '../icons/OnePersonIconGray';
import OnePersonOutlineGray from '../icons/OnePersonOutlineGray';
import LabelledContent from '../labelled-content/LabelledContent';
import styles from './beskrivelserForPerioden.less';

interface BeskrivelserForPeriodenProps {
    periodebeskrivelser: Beskrivelser[];
}

const getLabel = (periodebeskrivelse: Beskrivelser) => {
    const kilde = periodebeskrivelse.kilde === Kilde.ANNEN_PART ? 'annen part' : 'søker';
    return (
        <div className={styles.beskrivelserForPerioden__label}>
            {periodebeskrivelse.kilde === Kilde.ANNEN_PART ? (
                <ContentWithTooltip tooltipText="Annen part">
                    <OnePersonOutlineGray />
                </ContentWithTooltip>
            ) : (
                <ContentWithTooltip tooltipText="Søker">
                    <OnePersonIconGray />
                </ContentWithTooltip>
            )}
            <p className={styles.beskrivelserForPerioden__labelText}>
                {`Beskrivelse fra ${kilde}
                 for perioden ${periodebeskrivelse.periode.prettifyPeriod()} (mottatt ${prettifyDate(
                    periodebeskrivelse.mottattDato
                )}):`}
            </p>
        </div>
    );
};

const BeskrivelserForPerioden = ({ periodebeskrivelser }: BeskrivelserForPeriodenProps): JSX.Element => {
    if (periodebeskrivelser?.length > 0) {
        return (
            <>
                {periodebeskrivelser.map((periodebeskrivelse, index) => (
                    <Box marginBottom={Margin.large} key={index}>
                        <LabelledContent
                            label={getLabel(periodebeskrivelse)}
                            content={periodebeskrivelse.tekst}
                            labelTag="div"
                        />
                    </Box>
                ))}
                <hr className={styles.beskrivelserForPerioden__separator} />
            </>
        );
    }
    return null;
};

export default BeskrivelserForPerioden;
