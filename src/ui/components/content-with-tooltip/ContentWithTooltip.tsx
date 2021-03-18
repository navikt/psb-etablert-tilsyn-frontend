import * as React from 'react';
import classnames from 'classnames';
import styles from './contentWithTooltip.less';

interface ContentWithTooltipProps {
    tooltipText: string;
    tooltipDirectionRight?: boolean;
    children?: React.ReactNode;
    inline?: boolean;
}

const ContentWithTooltip = ({
    tooltipText,
    tooltipDirectionRight,
    children,
    inline,
}: ContentWithTooltipProps): JSX.Element => {
    const tooltipCls = classnames(styles.contentWithTooltip__tooltipText, {
        [styles['contentWithTooltip__tooltipText--right']]: tooltipDirectionRight,
    });
    const containerCls = classnames(styles.contentWithTooltip, {
        [styles['contentWithTooltip--inline']]: inline,
    });
    return (
        <div className={containerCls}>
            {children}
            <div className={tooltipCls}>{tooltipText}</div>
        </div>
    );
};

export default ContentWithTooltip;
