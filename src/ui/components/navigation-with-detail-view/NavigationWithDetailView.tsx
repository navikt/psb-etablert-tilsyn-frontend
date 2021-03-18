import React from 'react';
import styles from './navigationWithDetailView.less';

interface NavigationWithDetailViewProps {
    navigationSection: () => React.ReactNode;
    detailSection: () => React.ReactNode;
}

const NavigationWithDetailView = ({ navigationSection, detailSection }: NavigationWithDetailViewProps) => (
    <div className={styles.navigationWithDetailView}>
        <div className={styles.navigationWithDetailView__navigationSection}>{navigationSection()}</div>
        <div className={styles.navigationWithDetailView__detailSection}>{detailSection()}</div>
    </div>
);

export default NavigationWithDetailView;
