import React from 'react';
import { Undertittel as TitleComponent } from 'nav-frontend-typografi';

interface TitleWithUnderlineProps {
    children: React.ReactNode;
    titleClass?: string;
}

const TitleWithUnderline = ({ children, titleClass }: TitleWithUnderlineProps) => (
    <>
        <TitleComponent className={titleClass}>{children}</TitleComponent>
        <hr style={{ color: '#B7B1A9' }} />
    </>
);

export default TitleWithUnderline;
