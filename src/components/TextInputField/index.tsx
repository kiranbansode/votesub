/* 
  Author : Kiran A. Bansode
*/

import { UseFormRegisterReturn } from 'react-hook-form';
import { TextField } from '@mui/material';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import InputLabelWrapper from 'styled/InputLabelWrapper';

import './TextInputField.styles.scss';

interface TextInputFieldPropsType {
  useFormRegister: UseFormRegisterReturn;
}

const TextInputField = ({ useFormRegister }: TextInputFieldPropsType) => (
  <>
    <InputFieldWrapper>
      <InputLabelWrapper className="separate__label">Label</InputLabelWrapper>
      <TextField
        fullWidth
        id={useFormRegister.name}
        inputRef={useFormRegister.ref}
        name={useFormRegister.name}
        onBlur={useFormRegister.onBlur}
        onChange={useFormRegister.onChange}
      />
    </InputFieldWrapper>
  </>
);

export default TextInputField;
