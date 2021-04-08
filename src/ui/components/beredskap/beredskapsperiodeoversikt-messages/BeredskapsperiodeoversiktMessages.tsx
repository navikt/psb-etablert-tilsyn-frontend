import React from 'react';
import Vurderingsoversikt from '../../../../types/Vurderingsoversikt';
import { getStringMedPerioder } from '../../../../util/periodUtils';
import CustomAlertstripe from '../../alertstripe/Alertstripe';
import Box, { Margin } from '../../box/Box';

interface BeredskapsperiodeoversiktMessagesProps {
    beredskapsperiodeoversikt: Vurderingsoversikt;
}

const BeredskapsperiodeoversiktMessages = ({ beredskapsperiodeoversikt }: BeredskapsperiodeoversiktMessagesProps) => {
    if (!beredskapsperiodeoversikt.harPerioder()) {
        return <p>Søker har ikke oppgitt at det er behov for beredskap.</p>;
    }
    if (beredskapsperiodeoversikt.harPerioderTilVurdering()) {
        const perioderTilVurdering = beredskapsperiodeoversikt.finnPerioderTilVurdering().map(({ periode }) => periode);
        return (
            <Box marginBottom={Margin.large}>
                <CustomAlertstripe type="advarsel">
                    {`Vurder behov for beredskap i ${getStringMedPerioder(perioderTilVurdering)}.`}
                </CustomAlertstripe>
            </Box>
        );
    }
    return null;
};

export default BeredskapsperiodeoversiktMessages;
