import { Period } from '@navikt/k9-period-utils';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Beskrivelse from '../../../../types/Beskrivelse';
import Vurderingsperiode from '../../../../types/Vurderingsperiode';
import Vurderingsresultat from '../../../../types/Vurderingsresultat';
import { finnResterendePerioder } from '../../../../util/periodUtils';
import ContainerContext from '../../../context/ContainerContext';
import PeriodpickerList from '../../../form/wrappers/PeriodpickerList';
import RadioGroup from '../../../form/wrappers/RadioGroup';
import TextArea from '../../../form/wrappers/TextArea';
import AddButton from '../../add-button/AddButton';
import BeskrivelserForPerioden from '../../beskrivelser-for-perioden/BeskrivelserForPerioden';
import Box, { Margin } from '../../box/Box';
import DeleteButton from '../../delete-button/DeleteButton';
import DetailView from '../../detail-view/DetailView';
import Form from '../../form/Form';

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

interface VurderingAvBeredskapsperioderFormProps {
    beredskapsperiode: Vurderingsperiode;
    onCancelClick: () => void;
    beskrivelser: Beskrivelse[];
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
    onCancelClick,
    beskrivelser,
}: VurderingAvBeredskapsperioderFormProps): JSX.Element => {
    const { lagreBeredskapvurdering } = React.useContext(ContainerContext);
    const defaultBehovForBeredeskap = () => {
        if (beredskapsperiode.resultat === Vurderingsresultat.OPPFYLT) {
            return RadioOptions.JA;
        }
        if (beredskapsperiode.resultat === Vurderingsresultat.IKKE_OPPFYLT) {
            return RadioOptions.NEI;
        }
        return null;
    };

    const formMethods = useForm({
        defaultValues: {
            [FieldName.PERIODER]: beredskapsperiode?.periode
                ? [new Period(beredskapsperiode.periode.fom, beredskapsperiode.periode.tom)]
                : [new Period('', '')],
            [FieldName.BEGRUNNELSE]: beredskapsperiode.begrunnelse || '',
            [FieldName.HAR_BEHOV_FOR_BEREDSKAP]: defaultBehovForBeredeskap(),
        },
    });

    const erDetBehovForBeredskap = formMethods.watch(FieldName.HAR_BEHOV_FOR_BEREDSKAP);

    const handleSubmit = (formState: VurderingAvBeredskapsperioderFormState) => {
        const { begrunnelse, perioder, harBehovForBeredskap } = formState;
        const { kilde } = beredskapsperiode;

        let perioderMedEllerUtenBeredskap;
        let perioderUtenBeredskap = [];
        if (harBehovForBeredskap === RadioOptions.JA_DELER) {
            perioderMedEllerUtenBeredskap = perioder.map(({ period }) => ({
                periode: period,
                resultat: Vurderingsresultat.OPPFYLT,
                begrunnelse,
                kilde,
            }));

            const resterendePerioder = finnResterendePerioder(perioder, beredskapsperiode.periode);
            perioderUtenBeredskap = resterendePerioder.map((periode) => ({
                periode,
                resultat: Vurderingsresultat.IKKE_OPPFYLT,
                begrunnelse: null,
                kilde,
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
                },
            ];
        }

        const kombinertePerioder = perioderMedEllerUtenBeredskap.concat(perioderUtenBeredskap);
        lagreBeredskapvurdering({ vurderinger: kombinertePerioder });
    };

    return (
        <DetailView title="Vurdering av beredskap">
            <FormProvider {...formMethods}>
                <Form
                    onSubmit={formMethods.handleSubmit(handleSubmit)}
                    buttonLabel="Bekreft og fortsett"
                    onCancel={onCancelClick}
                >
                    <Box marginTop={Margin.xLarge}>
                        <BeskrivelserForPerioden periodebeskrivelser={beskrivelser} />
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
