import React from 'react';
import { render, screen } from '@testing-library/react';
import { Period } from '@navikt/k9-period-utils';
import EtablertTilsynMedSmoring from '../ui/components/etablertTilsyn/EtablertTilsynMedSmoring';
import EtablertTilsynType from '../types/EtablertTilsynType';
const mapTilEtablertTilsynType = (v) => new EtablertTilsynType(v);
const mapPeriode = (v) => new Period(v.fom, v.tom);
const etablertTilsyn = [
    {
        periode: {
            fom: '2022-09-05',
            tom: '2022-09-06',
        },
        tidPerDag: 2,
        kilde: 'SØKER',
    },
    {
        periode: {
            fom: '2022-09-07',
            tom: '2022-09-08',
        },
        tidPerDag: 5,
        kilde: 'SØKER',
    },
    {
        periode: {
            fom: '2022-09-09',
            tom: '2022-09-09',
        },
        tidPerDag: 6,
        kilde: 'SØKER',
    },
].map(mapTilEtablertTilsynType);

const smurtEtablertTilsynPerioder = [
    {
        periode: {
            fom: '2022-09-05',
            tom: '2022-09-05',
        },
        tidPerDag: 2.6,
    },
    {
        periode: {
            fom: '2022-09-06',
            tom: '2022-09-06',
        },
        tidPerDag: 2.6,
    },
    {
        periode: {
            fom: '2022-09-07',
            tom: '2022-09-07',
        },
        tidPerDag: 2.6,
    },
    {
        periode: {
            fom: '2022-09-08',
            tom: '2022-09-08',
        },
        tidPerDag: 2.6,
    },
    {
        periode: {
            fom: '2022-09-09',
            tom: '2022-09-09',
        },
        tidPerDag: 2.6,
    },
].map(mapTilEtablertTilsynType);

const avslag = [
    {
        fom: '2022-09-08',
        tom: '2022-09-08',
    },
].map(mapPeriode);

const innleggelser = [
    {
        fom: '2022-09-05',
        tom: '2022-09-05',
    },
    {
        fom: '2022-09-08',
        tom: '2022-09-08',
    },
].map(mapPeriode);

describe('Etablert tilsyn med smøring', () => {
    test('Kan vise etablert tilsyn med hel uke smøring', () => {
        render(
            <EtablertTilsynMedSmoring
                etablertTilsynData={etablertTilsyn}
                smurtEtablertTilsynPerioder={smurtEtablertTilsynPerioder}
                avslaattePerioder={avslag}
                innleggelsesperioder={innleggelser}
            />
        );

        expect(screen.getByText('Uke 37 - A')).toBeDefined();
        expect(screen.getByText('Uke 37 - B')).toBeDefined();
    });
});
