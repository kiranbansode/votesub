import { Controller, Control } from 'react-hook-form';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText } from '@mui/material';
import SeparateLabel from 'components/SeparateLabel';
import InputFieldWrapper from 'styled/InputFieldWrapper';

import './RadioInputField.styles.scss';

interface IRadioSelect {
    label: string;
    value: string;
}

interface RadioInputFieldTypes {
    useFormControl: Control;
    fieldName: string;
    inputLabel: string;
    inputHelperText?: string;
    separateLabel?: boolean;
    className?: string;
    radioSelect: IRadioSelect[];
}

const RadioInputField = ({
    useFormControl,
    fieldName,
    inputLabel,
    inputHelperText,
    separateLabel,
    className,
    radioSelect,
}: RadioInputFieldTypes) => (
    <Controller
        control={useFormControl}
        name={fieldName}
        render={({ field }) => (
            <>
                <InputFieldWrapper className="radio-buttons-container">
                    <FormControl>
                        {separateLabel ? (
                            <SeparateLabel htmlFor={field.name} label={inputLabel} />
                        ) : null}
                        <RadioGroup
                            row
                            // aria-labelledby="gender"
                            className={className}
                            name={field.name}
                            value={field.value || 'male'}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                        >
                            {radioSelect.map(({ label, value }) => (
                                <FormControlLabel
                                    control={<Radio />}
                                    key={label}
                                    label={label}
                                    value={value}
                                />
                            ))}

                            {/* <FormControlLabel control={<Radio />} label="Male" value="male" />
                            <FormControlLabel control={<Radio />} label="Female" value="female" /> */}
                        </RadioGroup>
                        <FormHelperText>{inputHelperText}</FormHelperText>
                    </FormControl>
                </InputFieldWrapper>
            </>
        )}
    />
);

RadioInputField.defaultProps = {
    className: 'radio-button',
    inputHelperText: '',
    separateLabel: true,
};

export default RadioInputField;
