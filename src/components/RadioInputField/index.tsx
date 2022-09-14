import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText } from '@mui/material';
import SeparateLabel from 'components/SeparateLabel';
import InputFieldWrapper from 'styled/InputFieldWrapper';

import './RadioInputField.styles.scss';
import inputErrorMessageFinder from 'utils/helperFunctions/inputErrorMessageFinder';

interface IRadioSelect {
    label: string;
    value: string;
}

interface RadioInputFieldTypes {
    control: Control;
    fieldName: string;
    inputErrors: FieldErrors;
    inputLabel: string;
    inputHelperText?: string;
    separateLabel?: boolean;
    noLabel?: boolean;
    className?: string;
    radioSelect: IRadioSelect[];
}

const RadioInputField = ({
    control,
    fieldName,
    inputErrors,
    inputLabel,
    inputHelperText,
    separateLabel,
    noLabel,
    className,
    radioSelect,
}: RadioInputFieldTypes) => {
    const error = inputErrorMessageFinder(fieldName, inputErrors);

    let labelToShow: string | null;

    if (!noLabel) {
        /* Depending on passed conditon it will do one of follwing
            1. Separate Label - Detached from TextInputField
            2. No Label - Label will not be showed
            3. Default - Label will be shown in top border of TextInputField
        */
        labelToShow = !separateLabel ? inputLabel : null;
    }

    return (
        <>
            <InputFieldWrapper className="radio-buttons-container">
                <FormControl fullWidth error={Boolean(error)}>
                    {separateLabel ? (
                        <SeparateLabel htmlFor={fieldName} label={inputLabel} />
                    ) : null}

                    <Controller
                        control={control}
                        name={fieldName}
                        render={({ field }) => (
                            <RadioGroup
                                row
                                className={className}
                                name={field.name}
                                value={field.value}
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
                            </RadioGroup>
                        )}
                    />
                    <FormHelperText className="error-mssg" id={fieldName}>
                        {error || inputHelperText}
                    </FormHelperText>
                </FormControl>
            </InputFieldWrapper>
        </>
    );
};

RadioInputField.defaultProps = {
    className: 'radio-button',
    inputHelperText: '',
    separateLabel: false,
    noLabel: false,
};

export default RadioInputField;
