import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './box.less';

const cx = classNames.bind(styles);

export enum Margin {
    small = 'small',
    medium = 'medium',
    large = 'large',
    xLarge = 'xLarge',
    xxLarge = 'xxLarge',
}

interface BoxProps {
    children: React.ReactNode;
    marginBottom?: Margin;
    marginTop?: Margin;
}

const Box = ({ children, marginBottom, marginTop }: BoxProps): JSX.Element => {
    const marginTopClass = `${marginTop}MarginTop`;
    const marginBottomClass = `${marginBottom}MarginBottom`;
    const boxClassnames = cx({
        [marginTopClass]: marginTop,
        [marginBottomClass]: marginBottom,
    });
    return <div className={boxClassnames}>{children}</div>;
};

export default Box;
