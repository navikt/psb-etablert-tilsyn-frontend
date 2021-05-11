import React from 'react';
import TitleWithUnderline from '../title-with-underline/TitleWithUnderline';
import styles from './detailView.less';

interface DetailViewProps {
    title: string;
    children: React.ReactNode;
    contentAfterTitleRenderer?: () => React.ReactNode;
}

const DetailView = ({ title, children, contentAfterTitleRenderer }: DetailViewProps) => (
    <div className={styles.detailView}>
        <div className={styles.detailView__titleContainer}>
            <TitleWithUnderline>{title}</TitleWithUnderline>
            {contentAfterTitleRenderer && (
                <div className={styles.detailView__nextToTitle}>{contentAfterTitleRenderer()}</div>
            )}
        </div>
        {children}
    </div>
);

export default DetailView;
