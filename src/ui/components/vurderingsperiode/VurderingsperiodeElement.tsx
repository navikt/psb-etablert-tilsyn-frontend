import React from 'react';
import { Period } from '../../../types/Period';
import Vurderingsresultat from '../../../types/Vurderingsresultat';
import { prettifyPeriod } from '../../../util/formats';
import ContentWithTooltip from '../content-with-tooltip/ContentWithTooltip';
import GreenCheckIconFilled from '../icons/GreenCheckIconFilled';
import RedCrossIconFilled from '../icons/RedCrossIconFilled';
import styles from './vurderingsperiodeElement.less';

interface VurderingsperiodeElementProps {
    periode: Period;
    resultat: Vurderingsresultat;
    renderAfterElement?: () => React.ReactNode;
}

const renderIcon = (resultat: Vurderingsresultat) => {
    if (resultat === Vurderingsresultat.OPPFYLT) {
        return (
            <ContentWithTooltip tooltipText="Vilkåret er oppfylt">
                <GreenCheckIconFilled />
            </ContentWithTooltip>
        );
    }
    if (resultat === Vurderingsresultat.IKKE_OPPFYLT) {
        return (
            <ContentWithTooltip tooltipText="Vilkåret er ikke oppfylt">
                <RedCrossIconFilled />
            </ContentWithTooltip>
        );
    }
    return null;
};

const VurderingsperiodeElement = ({
    periode,
    resultat,
    renderAfterElement,
}: VurderingsperiodeElementProps): JSX.Element => {
    return (
        <div className={styles.vurderingsperiodeElement}>
            <span className={styles.visuallyHidden}>Type</span>
            {renderIcon(resultat)}
            <div className={styles.vurderingsperiodeElement__texts}>
                <p className={styles.vurderingsperiodeElement__texts__period}>
                    <span className={styles.visuallyHidden}>Periode</span>
                    {prettifyPeriod(periode)}
                </p>
            </div>
            {renderAfterElement && renderAfterElement()}
        </div>
    );
};

export default VurderingsperiodeElement;
