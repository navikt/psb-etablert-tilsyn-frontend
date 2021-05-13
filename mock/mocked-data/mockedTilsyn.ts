export default {
    etablertTilsynPerioder: [
        {
            periode: {
                fom: '2021-05-11',
                tom: '2021-05-11',
            },
            tidPerDag: 'PT3H',
            kilde: 'SØKER',
        },
    ],
    nattevåk: {
        beskrivelser: [
            {
                periode: {
                    fom: '2021-05-11',
                    tom: '2021-05-11',
                },
                tekst: 'string',
                mottattDato: '2021-05-11',
                kilde: 'SØKER',
            },
        ],
        vurderinger: [
            {
                id: 0,
                periode: {
                    fom: '2021-05-11',
                    tom: '2021-05-11',
                },
                begrunnelse: 'string',
                resultat: 'OPPFYLT',
                kilde: 'SØKER',
            },
            {
                id: 1,
                periode: {
                    fom: '2021-06-11',
                    tom: '2021-06-11',
                },
                begrunnelse: 'streng',
                resultat: 'IKKE_OPPFYLT',
                kilde: 'ANNEN_PART',
            },
            {
                id: 2,
                periode: {
                    fom: '2021-07-11',
                    tom: '2021-07-11',
                },
                begrunnelse: '',
                resultat: 'IKKE_VURDERT',
                kilde: '',
            },
        ],
    },
    beredskap: {
        beskrivelser: [
            {
                periode: {
                    fom: '2021-05-11',
                    tom: '2021-05-11',
                },
                tekst: 'string',
                mottattDato: '2021-05-11',
                kilde: 'SØKER',
            },
        ],
        vurderinger: [
            {
                id: 0,
                periode: {
                    fom: '2021-05-11',
                    tom: '2021-05-11',
                },
                begrunnelse: 'string',
                resultat: 'OPPFYLT',
                kilde: 'SØKER',
            },
            {
                id: 1,
                periode: {
                    fom: '2021-06-11',
                    tom: '2021-06-11',
                },
                begrunnelse: 'streng',
                resultat: 'IKKE_OPPFYLT',
                kilde: 'ANNEN_PART',
            },
            {
                id: 2,
                periode: {
                    fom: '2021-07-11',
                    tom: '2021-07-11',
                },
                begrunnelse: '',
                resultat: 'IKKE_VURDERT',
                kilde: '',
            },
        ],
    },
};
