/* 
  Author : Kiran A. Bansode
*/

import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
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

import errorMessageFinder from 'utils/helperFunctions/errorMessageFinder';

import './PasswordInputField.styles.scss';

interface PasswordInputFieldPropsType {
  useFormRegister: UseFormRegisterReturn;
  inputLabel?: string;
  inputHelperText?: string;
  separateLabel?: boolean;
  noLabel?: boolean;
  inputPlaceHolder?: string;
  errors: { [x: string]: string };
}

const PasswordInputField = ({
  separateLabel,
  noLabel,
  inputHelperText,
  inputLabel,
  inputPlaceHolder,
  useFormRegister,
  errors,
}: PasswordInputFieldPropsType) => {
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = errorMessageFinder(useFormRegister.name, errors);

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

  // @ts-ignore
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <InputFieldWrapper id="password-input-field">
      <FormControl error={!!errorMessage} variant="outlined">
        {separateLabel ? <SeparateLabel htmlFor={useFormRegister.name} label={inputLabel} /> : null}

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
          id={useFormRegister.name}
          inputRef={useFormRegister.ref}
          label={labelToShow}
          name={useFormRegister.name}
          placeholder={inputPlaceHolder}
          type={showPassword ? 'text' : 'password'}
          onBlur={useFormRegister.onBlur}
          onChange={useFormRegister.onChange}
        />

        <FormHelperText id={useFormRegister.name}>{errorMessage || inputHelperText}</FormHelperText>
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
};

export default PasswordInputField;
