import React from 'react';
import classnames from 'classnames';
import styles from './interactiveList.less';

export interface InteractiveListElement {
    content: React.ReactNode;
    onClick: () => void;
    active: boolean;
}

interface InteractiveListProps {
    elements: InteractiveListElement[];
}

const InteractiveListElement = (props: InteractiveListElement) => {
    const { content, active, onClick } = props;
    const cls = classnames(styles.interactiveListElement, {
        [styles['interactiveListElement--active']]: active === true,
    });
    return (
        <li className={cls}>
            <button className={styles.interactiveListElement__button} type="button" onClick={onClick}>
                {content}
            </button>
        </li>
    );
};

const InteractiveList = ({ elements }: InteractiveListProps) => {
    return (
        <ul className={styles.interactiveList}>
            {elements.map((elementProps) => {
                return <InteractiveListElement {...elementProps} />;
            })}
        </ul>
    );
};

export default InteractiveList;
