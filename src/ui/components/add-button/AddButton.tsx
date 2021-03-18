import React from 'react';
import PlusIcon from '../icons/PlusIcon';
import styles from './addButton.less';

interface AddButtonProps {
    onClick: () => void;
    label: string;
    id?: string;
    className?: string;
}

const AddButton = ({ className, label, onClick, id }: AddButtonProps) => (
    <button className={`${styles.addButton} ${className || ''}`} type="button" onClick={onClick} id={id || ''}>
        <PlusIcon />
        <span className={styles.addButton__text}>{label}</span>
    </button>
);

export default AddButton;
