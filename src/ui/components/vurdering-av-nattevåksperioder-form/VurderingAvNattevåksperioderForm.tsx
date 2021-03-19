import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Nattevåksperiode } from '../../../types/Nattevåksperiode';
import { Period } from '../../../types/Period';
import PeriodpickerList from '../../form/wrappers/PeriodpickerList';
import RadioGroup from '../../form/wrappers/RadioGroup';
import TextArea from '../../form/wrappers/TextArea';
import AddButton from '../add-button/AddButton';
import BeskrivelserForPerioden from '../beskrivelser-for-perioden/BeskrivelserForPerioden';
import Box, { Margin } from '../box/Box';
import DeleteButton from '../delete-button/DeleteButton';
import DetailView from '../detail-view/DetailView';
import Form from '../form/Form';

export enum FieldName {
    VURDERING_AV_NATTEVÅK = 'vurderNattevåk',
    HAR_BEHOV_FOR_NATTEVÅK = 'erDetBehovForNattevåk',
    PERIODER = 'perioder',
}

interface VurderingAvNattevåksperioderFormProps {
    onSubmit: () => void;
    nattevåksperiode: Nattevåksperiode;
}

const VurderingAvNattevåksperioderForm = ({ nattevåksperiode }: VurderingAvNattevåksperioderFormProps): JSX.Element => {
    const formMethods = useForm({
        defaultValues: {
            [FieldName.PERIODER]: nattevåksperiode?.periode
                ? [new Period(nattevåksperiode.periode.fom, nattevåksperiode.periode.tom)]
                : [new Period('', '')],
            [FieldName.VURDERING_AV_NATTEVÅK]: '',
            [FieldName.HAR_BEHOV_FOR_NATTEVÅK]: undefined,
        },
    });

    return (
        <DetailView title="Vurdering av nattevåk">
            <FormProvider {...formMethods}>
                <Form onSubmit={formMethods.handleSubmit} buttonLabel="Bekreft og fortsett">
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
                                { value: 'ja', label: 'Ja' },
                                { value: 'deler', label: 'Ja, i deler av perioden' },
                                { value: 'nei', label: 'Nei' },
                            ]}
                            name={FieldName.HAR_BEHOV_FOR_NATTEVÅK}
                        />
                    </Box>
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
                </Form>
            </FormProvider>
        </DetailView>
    );
};

export default VurderingAvNattevåksperioderForm;
