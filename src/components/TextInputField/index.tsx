import { TextField } from '@mui/material';
import InputWrapper from 'styled/InputWrapper';
import InputLabel from 'styled/InputLabel';

import './TextInputField.scss';

const TextInputField = () => (
  <>
    <InputWrapper>
      <InputLabel className="separate__label">Label</InputLabel>
      <TextField fullWidth />
    </InputWrapper>
  </>
);

export default TextInputField;
