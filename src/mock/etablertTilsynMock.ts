import { Period } from '@navikt/k9-period-utils';
import EtablertTilsynType from '../types/EtablertTilsynType';

const mapTilEtablertTilsynType = (v) => new EtablertTilsynType(v);
const mapPeriode = (v) => new Period(v.fom, v.tom);

export const toPerioderSammeUke = () => {
    const etablertTilsynData = [
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

    const avslaattePerioder = [
        {
            fom: '2022-09-08',
            tom: '2022-09-08',
        },
    ].map(mapPeriode);

    const innleggelsesperioder = [
        {
            fom: '2022-09-05',
            tom: '2022-09-05',
        },
        {
            fom: '2022-09-08',
            tom: '2022-09-08',
        },
    ].map(mapPeriode);

    return { etablertTilsynData, smurtEtablertTilsynPerioder, avslaattePerioder, innleggelsesperioder };
};

export const treEnkeltdager = () => {
    const etablertTilsynData = [
        {
            periode: {
                fom: '2022-09-19',
                tom: '2022-09-19',
            },
            tidPerDag: 'PT5H30M',
            kilde: 'SØKER',
        },
        {
            periode: {
                fom: '2022-09-20',
                tom: '2022-09-20',
            },
            tidPerDag: 'PT0H',
            kilde: 'SØKER',
        },
        {
            periode: {
                fom: '2022-09-21',
                tom: '2022-09-21',
            },
            tidPerDag: 'PT5H30M',
            kilde: 'SØKER',
        },
        {
            periode: {
                fom: '2022-09-22',
                tom: '2022-09-22',
            },
            tidPerDag: 'PT0H',
            kilde: 'SØKER',
        },
        {
            periode: {
                fom: '2022-09-23',
                tom: '2022-09-23',
            },
            tidPerDag: 'PT5H30M',
            kilde: 'SØKER',
        },
    ].map(mapTilEtablertTilsynType);

    const smurtEtablertTilsynPerioder = [
        {
            periode: {
                fom: '2022-09-19',
                tom: '2022-09-19',
            },
            tidPerDag: 'PT5H30M',
        },
        {
            periode: {
                fom: '2022-09-20',
                tom: '2022-09-20',
            },
            tidPerDag: 'PT0H',
        },
        {
            periode: {
                fom: '2022-09-21',
                tom: '2022-09-21',
            },
            tidPerDag: 'PT5H30M',
        },
        {
            periode: {
                fom: '2022-09-22',
                tom: '2022-09-22',
            },
            tidPerDag: 'PT0H',
        },
        {
            periode: {
                fom: '2022-09-23',
                tom: '2022-09-23',
            },
            tidPerDag: 'PT5H30M',
        },
    ].map(mapTilEtablertTilsynType);

    const avslaattePerioder = [
        {
            fom: '2022-09-20',
            tom: '2022-09-20',
        },
        {
            fom: '2022-09-22',
            tom: '2022-09-22',
        },
    ].map(mapPeriode);

    return { etablertTilsynData, smurtEtablertTilsynPerioder, avslaattePerioder, innleggelsesperioder: [] };
};
