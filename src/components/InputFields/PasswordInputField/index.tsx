/* 
  Author : Kiran A. Bansode
*/

import { useState, MouseEvent } from 'react';
import { Controller } from 'react-hook-form';
import {
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
} from '@mui/material';
import SeparateLabel from 'components/SeparateLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import inputErrorMessageFinder from 'utils/helperFunctions/inputErrorMessageFinder';

import './PasswordInputField.styles.scss';
import { IPasswordInputFieldProps } from 'components/InputFields/types';

const PasswordInputField = ({
    separateLabel = false,
    noLabel = false,
    inputHelperText = '',
    inputLabel = 'PasswordInputField',
    inputPlaceholder = '',
    required = false,
    autoFocus = false,
    control,
    fieldName,
    inputErrors,
}: IPasswordInputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const errorMessage = inputErrorMessageFinder(fieldName, inputErrors);

    let labelToShow: any;

    if (!noLabel) {
        /* Depending on passed condition it will do one of following
          1. Separate Label - Detached from TextInputField
          2. No Label - Label will not be showed
          3. Default - Label will be shown in top border of TextInputField
        */
        labelToShow = !separateLabel ? inputLabel : null;
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e: MouseEvent) => {
        e.preventDefault();
    };

    return (
        <InputFieldWrapper id="password-input-field">
            <FormControl error={!!errorMessage} variant="outlined">
                {separateLabel ? (
                    <SeparateLabel htmlFor={fieldName} label={inputLabel} required={required} />
                ) : null}

                <Controller
                    control={control}
                    name={fieldName}
                    render={({ field }) => (
                        <OutlinedInput
                            fullWidth
                            autoFocus={autoFocus}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            error={!!errorMessage}
                            id={fieldName}
                            inputRef={field.ref}
                            label={labelToShow}
                            placeholder={inputPlaceholder}
                            type={showPassword ? 'text' : 'password'}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...field}
                        />
                    )}
                />

                <FormHelperText id={fieldName}>{errorMessage || inputHelperText}</FormHelperText>
            </FormControl>
        </InputFieldWrapper>
    );
};

// PasswordInputField.defaultProps = {
//     separateLabel: false,
//     noLabel: false,
//     inputHelperText: '',
//     inputLabel: 'PasswordInputField',
//     inputPlaceholder: '',
//     required: false,
//     autoFocus: false,
// };

export default PasswordInputField;
