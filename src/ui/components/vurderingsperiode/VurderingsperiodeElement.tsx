import { Period } from '@navikt/k9-period-utils';
import React from 'react';
import { ContentWithTooltip } from '@navikt/k9-react-components';
import Kilde from '../../../types/Kilde';
import Vurderingsresultat from '../../../types/Vurderingsresultat';
import GreenCheckIconFilled from '../icons/GreenCheckIconFilled';
import OnePersonIconGray from '../icons/OnePersonIconGray';
import OnePersonOutlineGray from '../icons/OnePersonOutlineGray';
import RedCrossIconFilled from '../icons/RedCrossIconFilled';
import TwoPeopleGray from '../icons/TwoPeopleGray';
import styles from './vurderingsperiodeElement.less';

interface VurderingsperiodeElementProps {
    periode: Period;
    resultat: Vurderingsresultat;
    kilde: Kilde;
    renderAfterElement?: () => React.ReactNode;
}

const renderStatusIcon = (resultat: Vurderingsresultat) => {
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

const renderKildeIcon = (kilde: Kilde) => {
    if (kilde === Kilde.ANNEN_PART) {
        return (
            <ContentWithTooltip tooltipText="Annen part">
                <OnePersonOutlineGray />
            </ContentWithTooltip>
        );
    }
    if (kilde === Kilde.SØKER_OG_ANNEN_PART) {
        return (
            <ContentWithTooltip tooltipText="Søker og annen part">
                <TwoPeopleGray />
            </ContentWithTooltip>
        );
    }

    return (
        <ContentWithTooltip tooltipText="Søker">
            <OnePersonIconGray />
        </ContentWithTooltip>
    );
};

const VurderingsperiodeElement = ({
    periode,
    resultat,
    kilde,
    renderAfterElement,
}: VurderingsperiodeElementProps): JSX.Element => {
    return (
        <div className={styles.vurderingsperiodeElement}>
            <span className={styles.visuallyHidden}>Type</span>
            {renderStatusIcon(resultat)}
            <div className={styles.vurderingsperiodeElement__texts}>
                <p className={styles.vurderingsperiodeElement__texts__period}>
                    <span className={styles.visuallyHidden}>Periode</span>
                    {periode.prettifyPeriod()}
                </p>
            </div>
            <div className={styles.vurderingsperiodeElement__texts__kildeIcon}>
                <span className={styles.visuallyHidden}>Kilde</span>
                {renderKildeIcon(kilde)}
            </div>
            {renderAfterElement && renderAfterElement()}
        </div>
    );
};

export default VurderingsperiodeElement;
