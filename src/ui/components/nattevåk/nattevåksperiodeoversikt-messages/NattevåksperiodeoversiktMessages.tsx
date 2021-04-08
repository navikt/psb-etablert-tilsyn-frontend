import Alertstripe from 'nav-frontend-alertstriper';
import React from 'react';
import Vurderingsoversikt from '../../../../types/Vurderingsoversikt';
import { getStringMedPerioder } from '../../../../util/periodUtils';
import Box, { Margin } from '../../box/Box';
import styles from './nattevåksperiodeoversiktMessages.less';

interface NattevåksperiodeoversiktMessagesProps {
    nattevåksperiodeoversikt: Vurderingsoversikt;
}

const NattevåksperiodeoversiktMessages = ({ nattevåksperiodeoversikt }: NattevåksperiodeoversiktMessagesProps) => {
    if (nattevåksperiodeoversikt.harPerioderTilVurdering()) {
        const perioderTilVurdering = nattevåksperiodeoversikt.finnPerioderTilVurdering().map(({ periode }) => periode);
        return (
            <Box marginBottom={Margin.large}>
                <Alertstripe type="advarsel" className={styles.nattevåksperiodeoversiktMessages__alertstripe}>
                    {`Vurder behov for nattevåk i ${getStringMedPerioder(perioderTilVurdering)}.`}
                </Alertstripe>
            </Box>
        );
    }
    return null;
};

export default NattevåksperiodeoversiktMessages;
