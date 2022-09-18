/* 
  Author : Kiran A. Bansode
*/

import { useState, MouseEvent } from 'react';
import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';
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

interface IPasswordInputFieldProps {
    formRegister: UseFormRegisterReturn;
    inputLabel?: string;
    inputHelperText?: string;
    separateLabel?: boolean;
    noLabel?: boolean;
    inputPlaceHolder?: string;
    errors: FieldErrors;
    required?: boolean;
}

const PasswordInputField = ({
    separateLabel,
    noLabel,
    inputHelperText,
    inputLabel,
    inputPlaceHolder,
    formRegister,
    errors,
    required,
}: IPasswordInputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const errorMessage = inputErrorMessageFinder(formRegister.name, errors);

    let labelToShow;

    if (!noLabel) {
        /* Depending on passed conditon it will do one of follwing
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
                    <SeparateLabel
                        htmlFor={formRegister.name}
                        label={inputLabel}
                        required={required}
                    />
                ) : null}

                <OutlinedInput
                    fullWidth
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
                    id={formRegister.name}
                    inputRef={formRegister.ref}
                    label={labelToShow}
                    name={formRegister.name}
                    placeholder={inputPlaceHolder}
                    type={showPassword ? 'text' : 'password'}
                    onBlur={formRegister.onBlur}
                    onChange={formRegister.onChange}
                />

                <FormHelperText id={formRegister.name}>
                    {errorMessage || inputHelperText}
                </FormHelperText>
            </FormControl>
        </InputFieldWrapper>
    );
};

PasswordInputField.defaultProps = {
    separateLabel: false,
    noLabel: false,
    inputHelperText: '',
    inputLabel: 'PasswordInputField',
    inputPlaceHolder: '',
    required: false,
};

export default PasswordInputField;
