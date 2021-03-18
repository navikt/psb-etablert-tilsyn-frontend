import * as React from 'react';
import styles from './fieldError.less';

interface FieldErrorProps {
    message?: string;
}

const FieldError = ({ message }: FieldErrorProps): JSX.Element => <p className={styles.fieldError}>{message}</p>;

export default FieldError;
