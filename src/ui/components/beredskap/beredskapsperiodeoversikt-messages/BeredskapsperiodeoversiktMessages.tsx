import React from 'react';
import BeredskapType from '../../../../types/BeredskapType';
import { getStringMedPerioder } from '../../../../util/periodUtils';
import CustomAlertstripe from '../../alertstripe/Alertstripe';
import Box, { Margin } from '../../box/Box';

interface BeredskapsperiodeoversiktMessagesProps {
    beredskapData: BeredskapType;
}

const BeredskapsperiodeoversiktMessages = ({ beredskapData }: BeredskapsperiodeoversiktMessagesProps) => {
    if (!beredskapData.harPerioder()) {
        return <p>Søker har ikke oppgitt at det er behov for beredskap.</p>;
    }
    if (beredskapData.harPerioderTilVurdering()) {
        const perioderTilVurdering = beredskapData.finnPerioderTilVurdering().map(({ periode }) => periode);
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
