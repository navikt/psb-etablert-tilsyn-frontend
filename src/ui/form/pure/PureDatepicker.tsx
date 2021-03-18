import * as React from 'react';
import { Datepicker } from 'nav-datovelger';
import { CalendarPlacement } from 'nav-datovelger/lib/types';
import { DatepickerProps } from 'nav-datovelger/lib/Datepicker';
import { Label } from 'nav-frontend-skjema';
import FieldError from '../../components/field-error/FieldError';

interface CustomDatepickerProps {
    label: string;
    errorMessage?: string;
    ariaLabel?: string;
    inputId?: string;
    calendarSettings?: {
        position?: CalendarPlacement;
    };
}

const PureDatepicker = ({
    label,
    value,
    onChange,
    errorMessage,
    limitations,
    ariaLabel,
    inputId,
    calendarSettings,
}: DatepickerProps & CustomDatepickerProps): JSX.Element => {
    const dayPickerProps = limitations?.minDate ? { initialMonth: new Date(limitations.minDate) } : undefined;

    return (
        <>
            {label && <Label htmlFor={inputId}>{label}</Label>}
            <Datepicker
                onChange={onChange}
                value={value}
                inputProps={{
                    placeholder: 'dd.mm.åååå',
                    'aria-label': ariaLabel,
                }}
                limitations={limitations}
                dayPickerProps={dayPickerProps}
                calendarSettings={calendarSettings}
                inputId={inputId}
            />
            {errorMessage && <FieldError message={errorMessage} />}
        </>
    );
};

export default PureDatepicker;
