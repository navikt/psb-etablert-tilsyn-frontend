import React from 'react';
import { EtablertTilsynsperiode } from '../../../types/EtablertTilsynsperiode';
import Kilde from '../../../types/Kilde';
import { prettifyPeriod } from '../../../util/formats';
import OnePersonIconGray from '../icons/OnePersonIconGray';
import OnePersonOutlineGray from '../icons/OnePersonOutlineGray';
import styles from './etablertTilsynsperiodeElement.less';

const renderIcon = (kilde: Kilde) => {
    if (kilde === Kilde.SØKER) {
        return <OnePersonIconGray />;
    }
    return <OnePersonOutlineGray />;
};

interface EtablertTilsynsperiodeElementProps {
    etablertTilsyn: EtablertTilsynsperiode;
}

const EtablertTilsynsperiodeElement = (props: EtablertTilsynsperiodeElementProps): JSX.Element => {
    const {
        etablertTilsyn: { periode, timerDag, kilde },
    } = props;

    return (
        <div className={styles.etablertTilsynsperiodeElement}>
            <div className={styles.etablertTilsynsperiodeElement__texts}>
                <p className={styles.etablertTilsynsperiodeElement__texts__period}>
                    <span className={styles.visuallyHidden}>Periode</span>
                    {prettifyPeriod(periode)}
                </p>
                <p className={styles.etablertTilsynsperiodeElement__texts__hours}>
                    <span className={styles.visuallyHidden}>Timer/dag</span>
                    {timerDag}
                </p>
            </div>
            <div className={styles.etablertTilsynsperiodeElement__icon}>{renderIcon(kilde)}</div>
        </div>
    );
};

export default EtablertTilsynsperiodeElement;
