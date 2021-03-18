import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import styles from './detailView.less';

interface DetailViewProps {
    title: string;
    children: React.ReactNode;
}

const DetailView = ({ title, children }: DetailViewProps) => (
    <div className={styles.detailView}>
        <Undertittel>{title}</Undertittel>
        {children}
    </div>
);

export default DetailView;
