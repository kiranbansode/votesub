import { FormHelperText, MenuItem, FormControl, Select } from '@mui/material';
import SeparateLabel from 'components/InputFields/SeparateLabel';
import { Controller } from 'react-hook-form';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import inputErrorMessageFinder from 'utils/helperFunctions/inputErrorMessageFinder';

// eslint-disable-next-line import/extensions
import { ISelectInputField } from '../types';

import './SelectInputField.styles.scss';

const SelectInputField = ({
    inputHelperText = '',
    separateLabel = false,
    required = false,
    options,
    fieldName,
    inputErrors,
    control,
    inputLabel,
}: ISelectInputField) => {
    const errorMessage = inputErrorMessageFinder(fieldName, inputErrors);

    return (
        <InputFieldWrapper id="select-input-field">
            <FormControl fullWidth error={Boolean(errorMessage)}>
                {separateLabel ? (
                    <SeparateLabel
                        error={Boolean(errorMessage)}
                        htmlFor={fieldName}
                        label={inputLabel}
                        required={required}
                    />
                ) : null}
                <Controller
                    control={control}
                    name={fieldName}
                    render={({ field }) => (
                        <Select
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        maxHeight: 350,
                                        maxWidth: 340,
                                    },
                                },
                            }}
                            id={fieldName}
                            label={inputLabel}
                            labelId={fieldName}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...field}
                        >
                            {options.map(({ value, option, id }) => (
                                <MenuItem disableRipple key={id} value={value}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                <FormHelperText>{errorMessage || inputHelperText}</FormHelperText>
            </FormControl>
        </InputFieldWrapper>
    );
};

export default SelectInputField;
