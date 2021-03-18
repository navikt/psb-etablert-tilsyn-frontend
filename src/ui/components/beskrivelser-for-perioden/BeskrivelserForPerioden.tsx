import * as React from 'react';
import Kilde from '../../../types/Kilde';
import Periodebeskrivelse from '../../../types/Periodebeskrivelse';
import { prettifyDate, prettifyPeriod } from '../../../util/formats';
import Box, { Margin } from '../box/Box';
import OnePersonIconGray from '../icons/OnePersonIconGray';
import OnePersonOutlineGray from '../icons/OnePersonOutlineGray';
import LabelledContent from '../labelled-content/LabelledContent';
import styles from './beskrivelserForPerioden.less';

interface BeskrivelserForPeriodenProps {
    periodebeskrivelser: Periodebeskrivelse[];
}

const label = (periodebeskrivelse: Periodebeskrivelse) => {
    const kilde = periodebeskrivelse.kilde === Kilde.ANNEN_PART ? 'annen part' : 'søker';
    return (
        <div className={styles.beskrivelserForPerioden__label}>
            {periodebeskrivelse.kilde === Kilde.ANNEN_PART ? <OnePersonOutlineGray /> : <OnePersonIconGray />}
            <p className={styles.beskrivelserForPerioden__labelText}>
                {`Beskrivelse fra ${kilde}
                 for perioden ${prettifyPeriod(periodebeskrivelse.periode)} (mottatt ${prettifyDate(
                    periodebeskrivelse.mottatt
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
                            label={label(periodebeskrivelse)}
                            content={periodebeskrivelse.begrunnelse}
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
