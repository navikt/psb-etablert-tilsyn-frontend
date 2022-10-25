import { ContentWithTooltip, OnePersonIconGray, OnePersonOutlineGray } from '@navikt/ft-plattform-komponenter';
import { Table } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { uniq } from 'lodash';
import { Element, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { isDayAfter } from '@navikt/k9-date-utils';
import EtablertTilsynType from '../../../types/EtablertTilsynType';
import Kilde from '../../../types/Kilde';
import styles from './etablertTilsynMedSmoring.css';

const renderIcon = (kilde: Kilde) => {
    if (kilde === Kilde.SØKER) {
        return (
            <ContentWithTooltip tooltipText="Søker">
                <OnePersonIconGray />
            </ContentWithTooltip>
        );
    }
    return (
        <ContentWithTooltip tooltipText="Annen part">
            <OnePersonOutlineGray />
        </ContentWithTooltip>
    );
};

interface EtablertTilsynProps {
    etablertTilsynData: EtablertTilsynType[];
    smortEtablertTilsynPerioder: EtablertTilsynType[];
}

interface EtablertTilsynMappet {
    etablertTilsyn: EtablertTilsynType[];
    etablertTilsynSmort: EtablertTilsynType[];
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
        return `${smurtePerioder[0].periode.fom} - ${smurtePerioder[smurtePerioder.length - 1].periode.tom}`;
    }
    return `${usmurtePerioder[0].periode.fom} - ${usmurtePerioder[smurtePerioder.length - 1].periode.tom}`;
};

const EtablertTilsyn = ({ etablertTilsynData, smortEtablertTilsynPerioder }: EtablertTilsynProps): JSX.Element => {
    const harVurderinger = etablertTilsynData.length > 0;

    const uker = uniq(etablertTilsynData.map((data) => dayjs(data.periode.fom).week()));
    const tilsynPerUke = uker.map((uke) => ({
        etablertTilsyn: etablertTilsynData.filter((v) => dayjs(v.periode.fom).week() === uke),
        etablertTilsynSmort: smortEtablertTilsynPerioder.filter((v) => dayjs(v.periode.fom).week() === uke),
        uke,
    }));
    const tilsynPerUkeOppdeltSmoering = [];
    const tilsynPerUkeUtenOppdeltSmoering = tilsynPerUke
        .map((v) => {
            const smurtePerioder = [] as EtablertTilsynType[][];
            v.etablertTilsynSmort.forEach((smortPeriode) => {
                const usmurtPeriode = v.etablertTilsyn.find((etablertTilsyn) =>
                    smortPeriode.periode.includesDate(etablertTilsyn.periode.fom)
                );
                if (usmurtPeriode.tidPerDag !== smortPeriode.tidPerDag) {
                    const sammenhengendePeriode = smurtePerioder.find((periodeArray) =>
                        periodeArray.find(
                            (v) =>
                                v.tidPerDag === smortPeriode.tidPerDag &&
                                isDayAfter(dayjs(v.periode.tom), dayjs(smortPeriode.periode.fom))
                        )
                    );
                    if (sammenhengendePeriode) {
                        sammenhengendePeriode.push(smortPeriode);
                    } else {
                        smurtePerioder.push([smortPeriode]);
                    }
                }
            });
            smurtePerioder.forEach((smurtPeriode, index) =>
                tilsynPerUkeOppdeltSmoering.push({
                    etablertTilsyn: v.etablertTilsyn,
                    etablertTilsynSmort: smurtPeriode,
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

    console.log(etablertTilsynMappet);
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
                    {etablertTilsynMappet.map((tilsyn) => (
                        <Table.ExpandableRow
                            key={ukeVisning(tilsyn.uke, tilsyn.delAvUke)}
                            content="Innhold i ekspanderbar rad"
                        >
                            <Table.DataCell scope="row">{ukeVisning(tilsyn.uke, tilsyn.delAvUke)}</Table.DataCell>
                            <Table.DataCell>
                                {periodeVisning(tilsyn.etablertTilsyn, tilsyn.etablertTilsynSmort)}
                            </Table.DataCell>
                            <Table.DataCell>30%</Table.DataCell>
                            <Table.DataCell>
                                <span className={styles.visuallyHidden}>Kilde</span>
                                {renderIcon(Kilde.SØKER)}
                            </Table.DataCell>
                        </Table.ExpandableRow>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default EtablertTilsyn;
