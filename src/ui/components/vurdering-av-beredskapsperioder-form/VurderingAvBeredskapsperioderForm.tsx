import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Beredskapsperiode } from '../../../types/Beredskapsperiode';
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
    VURDERING_AV_BEREDSKAP = 'vurderBeredskap',
    HAR_BEHOV_FOR_BEREDSKAP = 'erDetBehovForBeredskap',
    PERIODER = 'perioder',
}

interface VurderingAvBeredskapsperioderFormProps {
    onSubmit: () => void;
    beredskapsperiode: Beredskapsperiode;
}

const VurderingAvBeredskapsperioderForm = ({
    beredskapsperiode,
}: VurderingAvBeredskapsperioderFormProps): JSX.Element => {
    const formMethods = useForm({
        defaultValues: {
            [FieldName.PERIODER]: beredskapsperiode?.periode
                ? [new Period(beredskapsperiode.periode.fom, beredskapsperiode.periode.tom)]
                : [new Period('', '')],
            [FieldName.VURDERING_AV_BEREDSKAP]: '',
            [FieldName.HAR_BEHOV_FOR_BEREDSKAP]: undefined,
        },
    });

    return (
        <DetailView title="Vurdering av beredskap">
            <FormProvider {...formMethods}>
                <Form onSubmit={formMethods.handleSubmit} buttonLabel="Bekreft og fortsett">
                    <Box marginTop={Margin.xLarge}>
                        <BeskrivelserForPerioden periodebeskrivelser={beredskapsperiode.periodebeskrivelser} />
                    </Box>
                    <Box marginTop={Margin.xLarge}>
                        <TextArea
                            label="Gjør en vurdering av om det er behov for beredskap"
                            name={FieldName.VURDERING_AV_BEREDSKAP}
                        />
                    </Box>
                    <Box marginTop={Margin.xLarge}>
                        <RadioGroup
                            question="Er det behov for beredskap?"
                            radios={[
                                { value: 'ja', label: 'Ja' },
                                { value: 'deler', label: 'Ja, i deler av perioden' },
                                { value: 'nei', label: 'Nei' },
                            ]}
                            name={FieldName.HAR_BEHOV_FOR_BEREDSKAP}
                        />
                    </Box>
                    <Box marginTop={Margin.xLarge}>
                        <PeriodpickerList
                            name={FieldName.PERIODER}
                            legend="I hvilke perioder er det behov for beredskap?"
                            fromDatepickerProps={{ label: 'Fra', ariaLabel: 'Fra' }}
                            toDatepickerProps={{ label: 'Til', ariaLabel: 'Til' }}
                            defaultValues={[new Period(beredskapsperiode.periode.fom, beredskapsperiode.periode.tom)]}
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

export default VurderingAvBeredskapsperioderForm;
