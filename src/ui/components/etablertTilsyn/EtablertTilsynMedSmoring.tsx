import React from 'react';
import { Table } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { uniq } from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import { isDayAfter } from '@navikt/k9-date-utils';
import { Period } from '@navikt/k9-period-utils';
import EtablertTilsynType from '../../../types/EtablertTilsynType';
import Kilde from '../../../types/Kilde';
import EtablertTilsynRowContent from './EtablertTilsynRowContent';
import styles from './etablertTilsynMedSmoring.css';
import PartIkon from './PartIkon';

interface EtablertTilsynProps {
    etablertTilsynData: EtablertTilsynType[];
    smurtEtablertTilsynPerioder: EtablertTilsynType[];
}

interface EtablertTilsynMappet {
    etablertTilsyn: EtablertTilsynType[];
    etablertTilsynSmurt: EtablertTilsynType[];
    uke: number;
    delAvUke?: number;
}

const ukeVisning = (uke, delAvUke) => {
    if (delAvUke) {
        return `Uke ${uke} - ${delAvUke === 1 ? 'A' : 'B'}`;
    }
    return `Uke ${uke}`;
};

const periodeVisning = (usmurtePerioder, smurtePerioder) => {
    if (smurtePerioder.length) {
        return new Period(
            smurtePerioder[0].periode.fom,
            smurtePerioder[smurtePerioder.length - 1].periode.tom
        ).prettifyPeriod();
    }
    return new Period(
        usmurtePerioder[0].periode.fom,
        usmurtePerioder[usmurtePerioder.length - 1].periode.tom
    ).prettifyPeriod();
};

const EtablertTilsyn = ({ etablertTilsynData, smurtEtablertTilsynPerioder }: EtablertTilsynProps): JSX.Element => {
    const harVurderinger = etablertTilsynData.length > 0;

    const uker = uniq(etablertTilsynData.map((data) => dayjs(data.periode.fom).week()));
    const tilsynPerUke = uker.map((uke) => ({
        etablertTilsyn: etablertTilsynData.filter((v) => dayjs(v.periode.fom).week() === uke),
        etablertTilsynSmurt: smurtEtablertTilsynPerioder.filter((v) => dayjs(v.periode.fom).week() === uke),
        uke,
    }));
    const tilsynPerUkeOppdeltSmoering = [];
    const tilsynPerUkeUtenOppdeltSmoering = tilsynPerUke
        .map((v) => {
            const smurtePerioder = [] as EtablertTilsynType[][];
            v.etablertTilsynSmurt.forEach((smurtPeriode) => {
                const usmurtPeriode = v.etablertTilsyn.find((etablertTilsyn) =>
                    smurtPeriode.periode.includesDate(etablertTilsyn.periode.fom)
                );
                if (usmurtPeriode.tidPerDag !== smurtPeriode.tidPerDag) {
                    const sammenhengendePeriode = smurtePerioder.find((periodeArray) =>
                        periodeArray.find(
                            (periode) =>
                                periode.tidPerDag === smurtPeriode.tidPerDag &&
                                isDayAfter(dayjs(periode.periode.tom), dayjs(smurtPeriode.periode.fom))
                        )
                    );
                    if (sammenhengendePeriode) {
                        sammenhengendePeriode.push(smurtPeriode);
                    } else {
                        smurtePerioder.push([smurtPeriode]);
                    }
                }
            });
            smurtePerioder.forEach((smurtPeriode, index) =>
                tilsynPerUkeOppdeltSmoering.push({
                    etablertTilsyn: v.etablertTilsyn,
                    etablertTilsynSmurt: smurtPeriode,
                    uke: v.uke,
                    delAvUke: index === 0 ? 1 : 2,
                })
            );
            return smurtePerioder.length ? null : v;
        })
        .filter(Boolean);

    const etablertTilsynMappet = [...tilsynPerUkeUtenOppdeltSmoering, ...tilsynPerUkeOppdeltSmoering]
        .sort((a, b) => a.uke - b.uke)
        .sort((a, b) => a.delAvUke - b.delAvUke) as EtablertTilsynMappet[];

    if (!harVurderinger) {
        return <p className={styles.etablertTilsyn__ingenTilsyn}>Søker har ikke oppgitt etablert tilsyn</p>;
    }

    return (
        <div className={styles.etablertTilsynMedSmoringTabell}>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell scope="col">Uke</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">% tilsyn i periode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Part</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {etablertTilsynMappet.map((tilsyn) => {
                        const tidPerDagArray = tilsyn.etablertTilsynSmurt?.map((v) => v.tidPerDag).filter(Boolean);
                        const tidPerDag = tidPerDagArray[0] || 0;
                        const tilsynIPeriodeProsent = ((tidPerDag / 7.5) * 100).toFixed(2).replace(/[.,]00$/, '');

                        const parter = tilsyn.etablertTilsyn.map((v) => v.kilde);

                        return (
                            <Table.ExpandableRow
                                key={ukeVisning(tilsyn.uke, tilsyn.delAvUke)}
                                content={
                                    <EtablertTilsynRowContent
                                        etablertTilsyn={tilsyn.etablertTilsyn}
                                        etablertTilsynSmurt={tilsyn.etablertTilsynSmurt}
                                        tilsynProsent={tilsynIPeriodeProsent}
                                        skalViseIkoner={!!uniq(parter).length}
                                    />
                                }
                            >
                                <Table.DataCell scope="row">{ukeVisning(tilsyn.uke, tilsyn.delAvUke)}</Table.DataCell>
                                <Table.DataCell>
                                    {periodeVisning(tilsyn.etablertTilsyn, tilsyn.etablertTilsynSmurt)}
                                </Table.DataCell>
                                <Table.DataCell>{`${tilsynIPeriodeProsent}%`}</Table.DataCell>
                                <Table.DataCell>
                                    <span className={styles.visuallyHidden}>Kilde</span>
                                    <PartIkon parter={parter} />
                                </Table.DataCell>
                            </Table.ExpandableRow>
                        );
                    })}
                </Table.Body>
            </Table>
        </div>
    );
};

export default EtablertTilsyn;
