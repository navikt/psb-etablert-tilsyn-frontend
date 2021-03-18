import * as React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Controller, useFormContext } from 'react-hook-form';
import ExpandableLabel from '../../components/expandable-label/ExpandableLabel';
import Box, { Margin } from '../../components/box/Box';

interface TextAreaProps {
    label?: React.ReactNode;
    name: string;
    validators?: { [key: string]: (v: any) => string | boolean | undefined };
    helptext?: string;
    textareaClass?: string;
    id?: string;
}

const TextArea = ({ label, name, validators, helptext, textareaClass, id }: TextAreaProps): JSX.Element => {
    const { control, errors } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            rules={{
                validate: {
                    ...validators,
                },
            }}
            render={({ onChange, value }) => {
                if (helptext) {
                    return (
                        <>
                            <ExpandableLabel labelText={label} helptext={helptext} labelFor={name} />
                            <Box marginTop={Margin.medium}>
                                <Textarea
                                    value={value}
                                    maxLength={0}
                                    feil={errors[name]?.message}
                                    name={name}
                                    onChange={onChange}
                                    id={id}
                                    textareaClass={textareaClass}
                                />
                            </Box>
                        </>
                    );
                }
                return (
                    <Textarea
                        value={value}
                        label={label}
                        maxLength={0}
                        feil={errors[name]?.message}
                        id={id}
                        name={name}
                        onChange={onChange}
                        textareaClass={textareaClass}
                    />
                );
            }}
        />
    );
};

export default TextArea;
