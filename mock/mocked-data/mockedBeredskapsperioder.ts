import Kilde from '../../src/types/Kilde';
import Vurderingsresultat from '../../src/types/Vurderingsresultat';
export default [
    {
        resultat: null,
        begrunnelse: null,
        periode: { fom: '2021-03-18', tom: '2021-03-28' },
        kilde: Kilde.SØKER_OG_ANNEN_PART,
        periodebeskrivelser: [
            {
                begrunnelse: 'Vi må være i beredskap selv om barnet er i barnehage fordi...',
                periode: { fom: '2021-03-23', tom: '2021-03-25' },
                mottatt: '2021-03-25',
                kilde: Kilde.ANNEN_PART,
            },
            {
                begrunnelse: 'Vi må være i beredskap selv om barnet er i barnehage fordi...',
                periode: { fom: '2021-03-23', tom: '2021-03-25' },
                mottatt: '2021-03-25',
                kilde: Kilde.SØKER,
            },
        ],
    },
    {
        resultat: Vurderingsresultat.OPPFYLT,
        periode: { fom: '2021-02-20', tom: '2021-02-25' },
        kilde: Kilde.ANNEN_PART,
        begrunnelse: 'blablabla',
        periodebeskrivelser: [
            {
                begrunnelse: 'En god begrunnelse',
                periode: { fom: '2021-02-20', tom: '2021-02-25' },
                mottatt: '2021-02-25',
                kilde: Kilde.ANNEN_PART,
            },
        ],
    },
    {
        resultat: Vurderingsresultat.OPPFYLT,
        periode: { fom: '2021-01-20', tom: '2021-01-25' },
        kilde: Kilde.SØKER,
        begrunnelse: 'blablabla',
        periodebeskrivelser: [
            {
                begrunnelse: 'Det står sikkert noe her',
                periode: { fom: '2021-01-20', tom: '2021-01-25' },
                mottatt: '2021-01-25',
                kilde: Kilde.SØKER,
            },
        ],
    },
];
