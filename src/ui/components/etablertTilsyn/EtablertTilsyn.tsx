import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { EtablertTilsynsperiode } from '../../../types/EtablertTilsynsperiode';
import Kilde from '../../../types/Kilde';
import { prettifyPeriod } from '../../../util/formats';
import OnePersonIconGray from '../icons/OnePersonIconGray';
import OnePersonOutlineGray from '../icons/OnePersonOutlineGray';
import styles from './etablertTilsyn.less';

const renderIcon = (kilde: Kilde) => {
    if (kilde === Kilde.SØKER) {
        return <OnePersonIconGray />;
    }
    return <OnePersonOutlineGray />;
};

interface PeriodenavigasjonProps {
    etablertTilsyn: EtablertTilsynsperiode[];
}

const EtablertTilsynTabell = ({ etablertTilsyn }: PeriodenavigasjonProps): JSX.Element => {
    const antallPerioder = etablertTilsyn.length;

    return (
        <div className={styles.etablertTilsyn}>
            {antallPerioder === 0 && <p>Ingen vurderinger å vise</p>}
            {antallPerioder > 0 && (
                <table className={styles.etablertTilsynTabell}>
                    <thead>
                        <tr className={styles.etablertTilsynTabell__columnHeadings}>
                            <th>
                                <Element className={styles['etablertTilsynTabell__columnHeading--first']}>
                                    Periode
                                </Element>
                            </th>
                            <th>
                                <Element className={styles['etablertTilsynTabell__columnHeading--second']}>
                                    Timer/dag
                                </Element>
                            </th>
                            <th>
                                <Element className={styles['etablertTilsynTabell__columnHeading--third']}>
                                    Kilde
                                </Element>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {etablertTilsyn.map((tilsyn, index) => (
                            <tr key={index}>
                                <td className={styles.etablertTilsynTabell__period}>
                                    <span className={styles.visuallyHidden}>Periode</span>
                                    {prettifyPeriod(tilsyn.periode)}
                                </td>
                                <td className={styles.etablertTilsynTabell__hours}>
                                    <span className={styles.visuallyHidden}>Timer/dag</span>
                                    {tilsyn.timerDag}
                                </td>

                                <td className={styles.etablertTilsynTabell__icon}>{renderIcon(tilsyn.kilde)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EtablertTilsynTabell;
