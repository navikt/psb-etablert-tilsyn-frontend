import React from 'react';
import { Period } from '../../../types/Period';
import { prettifyPeriod } from '../../../util/formats';
import ContentWithTooltip from '../content-with-tooltip/ContentWithTooltip';
import WarningIcon from '../icons/WarningIcon';
import styles from './periodeSomSkalVurderes.less';
import OnePersonIconGray from '../icons/OnePersonIconGray';

interface PeriodeSomSkalVurderesProps {
    periode: Period;
}

const PeriodeSomSkalVurderes = ({ periode }: PeriodeSomSkalVurderesProps) => {
    return (
        <div className={styles.periodeSomSkalVurderes} id="periodeSomSkalVurderes">
            <span className={styles.visuallyHidden}>Type</span>
            <ContentWithTooltip tooltipText="Perioden må vurderes">
                <WarningIcon />
            </ContentWithTooltip>
            <div className={styles.periodeSomSkalVurderes__texts}>
                <div>
                    <p key={`${periode.fom}_${periode.tom}`} className={styles.periodeSomSkalVurderes__texts__period}>
                        {prettifyPeriod(periode)}
                    </p>
                </div>
                <div className={styles.periodeSomSkalVurderes__texts__kildeIcon}>
                    <span className={styles.visuallyHidden}>Kilde</span>
                    <ContentWithTooltip tooltipText="Søker">
                        <OnePersonIconGray />
                    </ContentWithTooltip>
                </div>
            </div>
        </div>
    );
};

export default PeriodeSomSkalVurderes;
