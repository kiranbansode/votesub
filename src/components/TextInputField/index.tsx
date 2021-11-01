import { UseFormRegisterReturn } from 'react-hook-form';
import { TextField } from '@mui/material';
import InputWrapper from 'styled/InputWrapper';
import InputLabel from 'styled/InputLabel';

import './TextInputField.scss';

interface TextInputFieldProps {
  formRegister: UseFormRegisterReturn;
}

const TextInputField = ({ formRegister }: TextInputFieldProps) => (
  <>
    <InputWrapper>
      <InputLabel className="separate__label">Label</InputLabel>
      <TextField
        fullWidth
        inputRef={formRegister.ref}
        name={formRegister.name}
        id={formRegister.name}
        onBlur={formRegister.onBlur}
        onChange={formRegister.onChange}
      />
    </InputWrapper>
  </>
);

export default TextInputField;
