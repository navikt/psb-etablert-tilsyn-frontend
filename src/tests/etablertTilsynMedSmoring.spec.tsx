import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EtablertTilsynMedSmoring from '../ui/components/etablertTilsyn/EtablertTilsynMedSmoring';
import { toPerioderSammeUke, treEnkeltdager } from '../mock/etablertTilsynMock';

describe('Etablert tilsyn med smøring', () => {
    test('Kan vise etablert tilsyn med to smøringer', () => {
        const data = toPerioderSammeUke();
        render(
            <EtablertTilsynMedSmoring
                etablertTilsynData={data.etablertTilsynData}
                smurtEtablertTilsynPerioder={data.smurtEtablertTilsynPerioder}
                avslaattePerioder={data.avslaattePerioder}
                innleggelsesperioder={data.innleggelsesperioder}
            />
        );

        expect(screen.getByText('Uke 37 - A')).toBeDefined();
        expect(screen.getByText('Uke 37 - B')).toBeDefined();
    });
    test('Kan vise etablert tilsyn med to smøringer', async () => {
        const data = treEnkeltdager();
        render(
            <EtablertTilsynMedSmoring
                etablertTilsynData={data.etablertTilsynData}
                smurtEtablertTilsynPerioder={data.smurtEtablertTilsynPerioder}
                avslaattePerioder={data.avslaattePerioder}
                innleggelsesperioder={data.innleggelsesperioder}
            />
        );

        expect(screen.getByText('Uke 39 - A')).toBeDefined();
        expect(screen.getByText('Uke 39 - B')).toBeDefined();
        expect(screen.getByText('Uke 39 - C')).toBeDefined();

        expect(screen.getAllByText('= 5.5 t per dag (73%)').length).toEqual(3);
    });
});
