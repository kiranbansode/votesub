import { Controller } from 'react-hook-form';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText } from '@mui/material';
import SeparateLabel from 'components/SeparateLabel';
import InputFieldWrapper from 'styled/InputFieldWrapper';

import './RadioInputField.styles.scss';
import inputErrorMessageFinder from 'utils/helperFunctions/inputErrorMessageFinder';

// eslint-disable-next-line import/extensions
import { IRadioInputField } from '../types';

// interface IRadioSelect {
//     label: string;
//     value: string;
// }

// interface RadioInputFieldTypes {
//     control: Control;
//     fieldName: string;
//     inputErrors: FieldErrors;
//     inputLabel: string;
//     showBorder?: boolean;
//     inputHelperText?: string;
//     separateLabel?: boolean;
//     className?: string;
//     alignCenter?: boolean;
//     radioSelect: IRadioSelect[];
//     required?: boolean;
//     showVertically?: boolean;
// }

const RadioInputField = ({
    inputHelperText = '',
    showBorder = false,
    separateLabel = true,
    className = 'radio-buttons-container',
    alignCenter = false,
    required = false,
    showVertically = false,
    radioSelect,
    control,
    fieldName,
    inputErrors,
    inputLabel,
}: IRadioInputField) => {
    const error = inputErrorMessageFinder(fieldName, inputErrors);

    // eslint-disable-next-line no-nested-ternary
    const showBorderClass = showBorder ? 'show-border' : '';
    const alignCenterClass = alignCenter ? 'align-center' : '';
    const showRadioVertically = showVertically ? 'show-vertical' : '';
    const showBorderInErrorState = error ? 'error-border' : '';

    return (
        <>
            <InputFieldWrapper>
                <FormControl fullWidth error={Boolean(error)}>
                    {separateLabel ? (
                        <SeparateLabel htmlFor={fieldName} label={inputLabel} required={required} />
                    ) : null}

                    <Controller
                        control={control}
                        name={fieldName}
                        render={({ field }) => (
                            <RadioGroup
                                row
                                className={`${className} ${showRadioVertically} ${showBorderClass} ${alignCenterClass} ${showBorderInErrorState}`}
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

// RadioInputField.defaultProps = {
//     className: 'radio-buttons-container',
//     inputHelperText: '',
//     separateLabel: true,
//     showBorder: false,
//     alignCenter: false,
//     required: false,
//     showVertically: false,
// };

export default RadioInputField;
