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
  InputLabel as InputLabelMaterial,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import InputFieldWrapper from 'styled/InputFieldWrapper';

interface PasswordInputFieldPropsType {
  useFormRegister: UseFormRegisterReturn;
}

const PasswordInputField = ({ useFormRegister }: PasswordInputFieldPropsType) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // @ts-ignore
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <InputFieldWrapper>
      <FormControl variant="outlined">
        <InputLabelMaterial htmlFor={useFormRegister.name}>Password</InputLabelMaterial>
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
          id={useFormRegister.name}
          inputRef={useFormRegister.ref}
          label="Password"
          name={useFormRegister.name}
          type={showPassword ? 'text' : 'password'}
          onBlur={useFormRegister.onBlur}
          onChange={useFormRegister.onChange}
        />
      </FormControl>
    </InputFieldWrapper>
  );
};

export default PasswordInputField;
