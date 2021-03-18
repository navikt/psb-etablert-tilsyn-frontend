import { Element } from 'nav-frontend-typografi';
import React from 'react';
import styles from './labelledContent.less';

interface LabelledContentProps {
    label: string | React.ReactNode;
    content: React.ReactNode;
    labelTag?: string;
}

const LabelledContent = ({ label, content, labelTag }: LabelledContentProps) => (
    <div className={styles.labelledContent}>
        <Element className={styles.labelledContent__label} tag={labelTag || 'p'}>
            {label}
        </Element>
        <div className={styles.labelledContent__content}>{content}</div>
    </div>
);

export default LabelledContent;
