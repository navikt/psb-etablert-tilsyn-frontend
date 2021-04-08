import Alertstripe from 'nav-frontend-alertstriper';
import React from 'react';
import Vurderingsoversikt from '../../../../types/Vurderingsoversikt';
import { getStringMedPerioder } from '../../../../util/periodUtils';
import Box, { Margin } from '../../box/Box';
import styles from './beredskapsperiodeoversiktMessages.less';

interface BeredskapsperiodeoversiktMessagesProps {
    beredskapsperiodeoversikt: Vurderingsoversikt;
}

const BeredskapsperiodeoversiktMessages = ({ beredskapsperiodeoversikt }: BeredskapsperiodeoversiktMessagesProps) => {
    if (!beredskapsperiodeoversikt.harBehovForBeredskap()) {
        return <p>Søker har ikke oppgitt at det er behov for beredskap.</p>;
    }
    if (beredskapsperiodeoversikt.harPerioderTilVurdering()) {
        const perioderTilVurdering = beredskapsperiodeoversikt.finnPerioderTilVurdering().map(({ periode }) => periode);
        return (
            <Box marginBottom={Margin.large}>
                <Alertstripe type="advarsel" className={styles.beredskapsperiodeoversiktMessages__alertstripe}>
                    {`Vurder behov for beredskap i ${getStringMedPerioder(perioderTilVurdering)}.`}
                </Alertstripe>
            </Box>
        );
    }
    return null;
};

export default BeredskapsperiodeoversiktMessages;
