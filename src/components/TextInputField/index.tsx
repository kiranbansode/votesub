/* 
  Author : Kiran A. Bansode
*/

import { UseFormRegisterReturn } from 'react-hook-form';
import { TextField } from '@mui/material';
import InputWrapper from 'styled/InputWrapper';
import InputLabel from 'styled/InputLabel';

import './TextInputField.scss';

interface TextInputFieldProps {
  useFormRegister: UseFormRegisterReturn;
}

const TextInputField = ({ useFormRegister }: TextInputFieldProps) => (
  <>
    <InputWrapper>
      <InputLabel className="separate__label">Label</InputLabel>
      <TextField
        fullWidth
        id={useFormRegister.name}
        inputRef={useFormRegister.ref}
        name={useFormRegister.name}
        onBlur={useFormRegister.onBlur}
        onChange={useFormRegister.onChange}
      />
    </InputWrapper>
  </>
);

export default TextInputField;
