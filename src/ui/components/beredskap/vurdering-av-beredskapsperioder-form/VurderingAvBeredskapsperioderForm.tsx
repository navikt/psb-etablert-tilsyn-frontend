import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import { Period } from '../../../../types/Period';
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
import { getPeriodDifference } from '../../../../util/dateUtils';

export enum FieldName {
    BEGRUNNELSE = 'begrunnelse',
    HAR_BEHOV_FOR_BEREDSKAP = 'harBehovForBeredskap',
    PERIODER = 'perioder',
}

enum RadioOptions {
    JA = 'ja',
    JA_DELER = 'jaDeler',
    NEI = 'nei',
}

const finnResterendePerioder = (perioderFraForm: FormPeriod[], periodeTilVurdering: Period) => {
    const formatertePerioderFraForm = perioderFraForm.map((periode) => periode.period);
    const resterendePerioder =
        formatertePerioderFraForm.length > 0 && getPeriodDifference(periodeTilVurdering, formatertePerioderFraForm);

    return resterendePerioder;
};

interface VurderingAvBeredskapsperioderFormProps {
    onSubmit: () => void;
    beredskapsperiode: Vurderingsperiode;
}

interface FormPeriod {
    period: Period;
}

interface VurderingAvBeredskapsperioderFormState {
    [FieldName.BEGRUNNELSE]: string;
    [FieldName.PERIODER]: FormPeriod[];
    [FieldName.HAR_BEHOV_FOR_BEREDSKAP]: RadioOptions;
}

const VurderingAvBeredskapsperioderForm = ({
    beredskapsperiode,
}: VurderingAvBeredskapsperioderFormProps): JSX.Element => {
    const formMethods = useForm({
        defaultValues: {
            [FieldName.PERIODER]: beredskapsperiode?.periode
                ? [new Period(beredskapsperiode.periode.fom, beredskapsperiode.periode.tom)]
                : [new Period('', '')],
            [FieldName.BEGRUNNELSE]: '',
            [FieldName.HAR_BEHOV_FOR_BEREDSKAP]: undefined,
        },
    });

    const erDetBehovForBeredskap = formMethods.watch(FieldName.HAR_BEHOV_FOR_BEREDSKAP);

    const handleSubmit = (formState: VurderingAvBeredskapsperioderFormState) => {
        const { begrunnelse, perioder, harBehovForBeredskap } = formState;
        const { kilde, periodebeskrivelser } = beredskapsperiode;

        let perioderMedEllerUtenBeredskap;
        let perioderUtenBeredskap = [];
        if (harBehovForBeredskap === RadioOptions.JA_DELER) {
            perioderMedEllerUtenBeredskap = perioder.map(({ period }) => ({
                periode: period,
                resultat: Vurderingsresultat.OPPFYLT,
                begrunnelse,
                kilde,
                periodebeskrivelser,
            }));

            const resterendePerioder = finnResterendePerioder(perioder, beredskapsperiode.periode);
            perioderUtenBeredskap = resterendePerioder.map((periode) => ({
                periode,
                resultat: Vurderingsresultat.IKKE_OPPFYLT,
                begrunnelse: null,
                kilde,
                periodebeskrivelser,
            }));
        } else {
            perioderMedEllerUtenBeredskap = [
                {
                    periode: beredskapsperiode.periode,
                    resultat:
                        harBehovForBeredskap === RadioOptions.JA
                            ? Vurderingsresultat.OPPFYLT
                            : Vurderingsresultat.IKKE_OPPFYLT,
                    begrunnelse,
                    kilde,
                    periodebeskrivelser,
                },
            ];
        }

        const kombinertePerioder = perioderMedEllerUtenBeredskap.concat(perioderUtenBeredskap);
        // onFinished({ beredskapsperioder: kombinertePerioder });
    };

    return (
        <DetailView title="Vurdering av beredskap">
            <FormProvider {...formMethods}>
                <Form onSubmit={formMethods.handleSubmit(handleSubmit)} buttonLabel="Bekreft og fortsett">
                    <Box marginTop={Margin.xLarge}>
                        <BeskrivelserForPerioden periodebeskrivelser={beredskapsperiode.periodebeskrivelser} />
                    </Box>
                    <Box marginTop={Margin.xLarge}>
                        <TextArea
                            label="Gjør en vurdering av om det er behov for beredskap"
                            name={FieldName.BEGRUNNELSE}
                        />
                    </Box>
                    <Box marginTop={Margin.xLarge}>
                        <RadioGroup
                            question="Er det behov for beredskap?"
                            radios={[
                                { value: RadioOptions.JA, label: 'Ja' },
                                { value: RadioOptions.JA_DELER, label: 'Ja, i deler av perioden' },
                                { value: RadioOptions.NEI, label: 'Nei' },
                            ]}
                            name={FieldName.HAR_BEHOV_FOR_BEREDSKAP}
                        />
                    </Box>
                    {erDetBehovForBeredskap === RadioOptions.JA_DELER && (
                        <Box marginTop={Margin.xLarge}>
                            <PeriodpickerList
                                name={FieldName.PERIODER}
                                legend="I hvilke perioder er det behov for beredskap?"
                                fromDatepickerProps={{ label: 'Fra', ariaLabel: 'Fra' }}
                                toDatepickerProps={{ label: 'Til', ariaLabel: 'Til' }}
                                defaultValues={[
                                    new Period(beredskapsperiode.periode.fom, beredskapsperiode.periode.tom),
                                ]}
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

export default VurderingAvBeredskapsperioderForm;
