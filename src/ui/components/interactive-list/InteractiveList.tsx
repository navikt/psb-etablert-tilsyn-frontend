import React from 'react';
import classnames from 'classnames';
import styles from './interactiveList.less';
import ChevronIconBlack from '../icons/ChevronIconBlack';
import ChevronIconGray from '../icons/ChevronIconGray';

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
                <span className={styles.interactiveListElement__button__contentContainer}>
                    {content}
                    <span className={styles.interactiveListElement__chevron}>
                        {active ? <ChevronIconBlack /> : <ChevronIconGray />}
                    </span>
                </span>
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
