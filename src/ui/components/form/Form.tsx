import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import Box, { Margin } from '../box/Box';

interface FormProps {
    children: React.ReactNode;
    buttonLabel?: string;
    onSubmit: (e?: any) => void;
    shouldShowSubmitButton?: boolean;
}

const Form = ({ children, onSubmit, buttonLabel, shouldShowSubmitButton }: FormProps): JSX.Element => {
    return (
        <form style={{ margin: '0' }} onSubmit={onSubmit}>
            {children}
            {shouldShowSubmitButton !== false && (
                <Box marginTop={Margin.xxLarge}>
                    <Hovedknapp id="submitButton">{buttonLabel}</Hovedknapp>
                </Box>
            )}
        </form>
    );
};
export default Form;
