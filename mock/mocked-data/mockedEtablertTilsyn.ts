import Kilde from '../../src/types/Kilde';
export default [
    {
        periode: { fom: '2021-03-09', tom: '2021-03-15' },
        timerDag: 5,
        kilde: Kilde.SØKER,
    },
    {
        periode: { fom: '2021-03-01', tom: '2021-03-08' },
        timerDag: 7.5,
        kilde: Kilde.SØKER_OG_ANNEN_PART,
    },
];
