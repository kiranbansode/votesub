/* 
  Author : Kiran A. Bansode
*/

import { UseFormRegisterReturn } from 'react-hook-form';
import { TextField } from '@mui/material';
import InputWrapper from 'styled/InputWrapper';
import InputLabel from 'styled/InputLabel';

import './TextInputField.styles.scss';

interface TextInputFieldPropsType {
  useFormRegister: UseFormRegisterReturn;
}

const TextInputField = ({ useFormRegister }: TextInputFieldPropsType) => (
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
