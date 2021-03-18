import React from 'react';
import { DatepickerLimitations } from 'nav-datovelger';
import { Controller, useFormContext } from 'react-hook-form';
import PureDatepicker from '../pure/PureDatepicker';

export interface DatepickerProps {
    label?: string;
    name: string;
    validators?: { [key: string]: (v: any) => string | boolean | undefined };
    ariaLabel?: string;
    defaultValue?: string;
    limitations?: DatepickerLimitations;
    error?: string;
    inputId?: string;
}

const Datepicker = ({
    name,
    validators,
    limitations,
    label,
    ariaLabel,
    defaultValue,
    error,
    inputId,
}: DatepickerProps): JSX.Element => {
    const { control, errors } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            rules={{
                validate: {
                    ...validators,
                },
            }}
            defaultValue={defaultValue}
            render={({ onChange, value }) => (
                <PureDatepicker
                    label={label}
                    onChange={onChange}
                    value={value}
                    errorMessage={error || errors[name]?.message}
                    limitations={limitations}
                    ariaLabel={ariaLabel}
                    inputId={inputId}
                />
            )}
        />
    );
};

export default Datepicker;
