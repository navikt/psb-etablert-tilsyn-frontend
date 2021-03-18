import * as React from 'react';
import BucketIcon from '../icons/BucketIcon';
import styles from './deleteButton.less';

const DeleteButton = ({ onClick }) => (
    <div className={styles.deleteButton__container}>
        <button className={styles.deleteButton__button} type="button" onClick={onClick} aria-label="Fjern periode">
            <BucketIcon />
        </button>
    </div>
);

export default DeleteButton;
