import React from 'react';
import NattevåkType from '../../../../types/NattevåkType';
import { getStringMedPerioder } from '../../../../util/periodUtils';
import CustomAlertstripe from '../../alertstripe/Alertstripe';
import Box, { Margin } from '../../box/Box';

interface NattevåksperiodeoversiktMessagesProps {
    nattevåkData: NattevåkType;
}

const NattevåksperiodeoversiktMessages = ({ nattevåkData }: NattevåksperiodeoversiktMessagesProps) => {
    if (nattevåkData.harPerioderTilVurdering()) {
        const perioderTilVurdering = nattevåkData.finnPerioderTilVurdering().map(({ periode }) => periode);
        return (
            <Box marginBottom={Margin.large}>
                <CustomAlertstripe type="advarsel">
                    {`Vurder behov for nattevåk i ${getStringMedPerioder(perioderTilVurdering)}.`}
                </CustomAlertstripe>
            </Box>
        );
    }
    return null;
};

export default NattevåksperiodeoversiktMessages;
