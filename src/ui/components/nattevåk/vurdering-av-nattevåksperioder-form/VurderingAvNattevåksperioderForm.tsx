import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Period } from '@navikt/period-utils';
import { Nattevåksperiode } from '../../../../types/Nattevåksperiode';
import PeriodpickerList from '../../../form/wrappers/PeriodpickerList';
import RadioGroup from '../../../form/wrappers/RadioGroup';
import TextArea from '../../../form/wrappers/TextArea';
import AddButton from '../../add-button/AddButton';
import BeskrivelserForPerioden from '../../beskrivelser-for-perioden/BeskrivelserForPerioden';
import Box, { Margin } from '../../box/Box';
import DeleteButton from '../../delete-button/DeleteButton';
import DetailView from '../../detail-view/DetailView';
import Form from '../../form/Form';
import Vurderingsresultat from '../../../../types/Vurderingsresultat';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';

export enum FieldName {
    VURDERING_AV_NATTEVÅK = 'vurderNattevåk',
    HAR_BEHOV_FOR_NATTEVÅK = 'erDetBehovForNattevåk',
    PERIODER = 'perioder',
}

enum RadioOptions {
    JA = 'ja',
    JA_DELER = 'jaDeler',
    NEI = 'nei',
}

interface VurderingAvNattevåksperioderFormProps {
    onSubmit: () => void;
    nattevåksperiode: Vurderingsperiode;
    onCancelClick: () => void;
}

const VurderingAvNattevåksperioderForm = ({
    nattevåksperiode,
    onCancelClick,
}: VurderingAvNattevåksperioderFormProps): JSX.Element => {
    const defaultBehovForNattevåk = () => {
        if (nattevåksperiode.resultat === Vurderingsresultat.OPPFYLT) {
            return RadioOptions.JA;
        }
        if (nattevåksperiode.resultat === Vurderingsresultat.IKKE_OPPFYLT) {
            return RadioOptions.NEI;
        }
        return null;
    };
    const formMethods = useForm({
        defaultValues: {
            [FieldName.PERIODER]: nattevåksperiode?.periode
                ? [new Period(nattevåksperiode.periode.fom, nattevåksperiode.periode.tom)]
                : [new Period('', '')],
            [FieldName.VURDERING_AV_NATTEVÅK]: nattevåksperiode.begrunnelse || '',
            [FieldName.HAR_BEHOV_FOR_NATTEVÅK]: defaultBehovForNattevåk(),
        },
    });

    const erDetBehovForNattevåk = formMethods.watch(FieldName.HAR_BEHOV_FOR_NATTEVÅK);

    return (
        <DetailView title="Vurdering av nattevåk">
            <FormProvider {...formMethods}>
                <Form onSubmit={formMethods.handleSubmit} buttonLabel="Bekreft og fortsett" onCancel={onCancelClick}>
                    <Box marginTop={Margin.xLarge}>
                        <BeskrivelserForPerioden periodebeskrivelser={nattevåksperiode.periodebeskrivelser} />
                    </Box>
                    <Box marginTop={Margin.xLarge}>
                        <TextArea
                            label="Gjør en vurdering av om det er behov for nattevåk"
                            name={FieldName.VURDERING_AV_NATTEVÅK}
                        />
                    </Box>
                    <Box marginTop={Margin.xLarge}>
                        <RadioGroup
                            question="Er det behov for nattevåk?"
                            radios={[
                                { value: RadioOptions.JA, label: 'Ja' },
                                { value: RadioOptions.JA_DELER, label: 'Ja, i deler av perioden' },
                                { value: RadioOptions.NEI, label: 'Nei' },
                            ]}
                            name={FieldName.HAR_BEHOV_FOR_NATTEVÅK}
                        />
                    </Box>
                    {erDetBehovForNattevåk === RadioOptions.JA_DELER && (
                        <Box marginTop={Margin.xLarge}>
                            <PeriodpickerList
                                name={FieldName.PERIODER}
                                legend="I hvilke perioder er det behov for nattevåk?"
                                fromDatepickerProps={{ label: 'Fra', ariaLabel: 'Fra' }}
                                toDatepickerProps={{ label: 'Til', ariaLabel: 'Til' }}
                                defaultValues={[new Period(nattevåksperiode.periode.fom, nattevåksperiode.periode.tom)]}
                                renderContentAfterElement={(index, numberOfItems, fieldArrayMethods) => {
                                    return (
                                        <>
                                            {numberOfItems > 1 && (
                                                <DeleteButton
                                                    onClick={() => {
                                                        fieldArrayMethods.remove(index);
                                                    }}
                                                />
                                            )}
                                        </>
                                    );
                                }}
                                renderAfterFieldArray={(fieldArrayMethods) => (
                                    <Box marginTop={Margin.large}>
                                        <AddButton
                                            label="Legg til periode"
                                            onClick={() => fieldArrayMethods.append({ fom: '', tom: '' })}
                                            id="leggTilPeriodeKnapp"
                                        />
                                    </Box>
                                )}
                            />
                        </Box>
                    )}
                </Form>
            </FormProvider>
        </DetailView>
    );
};

export default VurderingAvNattevåksperioderForm;
