import * as React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import Box, { Margin } from '../box/Box';
import WriteAccessBoundContent from '../write-access-bound-content/WriteAccessBoundContent';
import styles from './form.less';

interface FormProps {
    children: React.ReactNode;
    buttonLabel?: string;
    onSubmit: (e?: any) => void;
    shouldShowSubmitButton?: boolean;
    onCancel?: () => void;
}

const Form = ({ children, onSubmit, buttonLabel, shouldShowSubmitButton, onCancel }: FormProps): JSX.Element => {
    return (
        <form style={{ margin: '0' }} onSubmit={onSubmit}>
            {children}
            {shouldShowSubmitButton !== false && (
                <Box marginTop={Margin.xxLarge}>
                    <div className={styles.buttonContainer}>
                            <Hovedknapp id="submitButton">{buttonLabel}</Hovedknapp>
                        {onCancel && (
                            <div className={styles.buttonContainer__avbryt}>
                                <Knapp htmlType="button" onClick={onCancel}>
                                    Avbryt
                                </Knapp>
                            </div>
                        )}
                    </div>
                </Box>
            )}
        </form>
    );
};
export default Form;
