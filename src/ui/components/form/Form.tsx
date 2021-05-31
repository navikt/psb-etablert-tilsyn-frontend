import { Box, Margin } from '@navikt/k9-react-components';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import styles from './form.less';

interface FormProps {
    children: React.ReactNode;
    buttonLabel?: string;
    onSubmit: (e?: any) => void;
    shouldShowSubmitButton?: boolean;
    onCancel?: () => void;
}

const Form = ({ children, onSubmit, buttonLabel, shouldShowSubmitButton, onCancel }: FormProps): JSX.Element => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    return (
        <form
            style={{ margin: '0' }}
            onSubmit={(event) => {
                event.preventDefault();
                setIsSubmitting(true);
                onSubmit();
                setTimeout(() => setIsSubmitting(false), 2500);
            }}
        >
            {children}
            {shouldShowSubmitButton !== false && (
                <Box marginTop={Margin.xxLarge}>
                    <div className={styles.buttonContainer}>
                        <Hovedknapp id="submitButton" disabled={isSubmitting} spinner={isSubmitting}>
                            {buttonLabel}
                        </Hovedknapp>
                        {onCancel && (
                            <div className={styles.buttonContainer__avbryt}>
                                <Knapp htmlType="button" onClick={onCancel} disabled={isSubmitting}>
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
