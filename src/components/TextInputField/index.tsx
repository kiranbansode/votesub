/* eslint-disable no-nested-ternary */
/* 
  Author : Kiran A. Bansode
*/

import { UseFormRegisterReturn } from 'react-hook-form';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import SeparateLabel from 'components/SeparateLabel';

import './TextInputField.styles.scss';

interface TextInputFieldPropsType {
  useFormRegister: UseFormRegisterReturn;
  inputLabel: string;
  inputHelperText?: string;
  separateLabel?: boolean;
  noLabel?: boolean;
}

const TextInputField = ({
  separateLabel,
  noLabel,
  useFormRegister,
  inputLabel,
  inputHelperText,
}: TextInputFieldPropsType) => (
  <>
    <InputFieldWrapper>
      <FormControl>
        {separateLabel ? (
          <SeparateLabel
            className="separate-label"
            htmlFor={useFormRegister.name}
            label={inputLabel}
          />
        ) : null}

        <TextField
          fullWidth
          id={useFormRegister.name}
          inputRef={useFormRegister.ref}
          label={!noLabel ? (!separateLabel ? inputLabel : null) : null}
          name={useFormRegister.name}
          placeholder={noLabel ? inputLabel : ''}
          onBlur={useFormRegister.onBlur}
          onChange={useFormRegister.onChange}
        />

        <FormHelperText id={useFormRegister.name}>{inputHelperText}</FormHelperText>
      </FormControl>
    </InputFieldWrapper>
  </>
);

TextInputField.defaultProps = {
  separateLabel: false,
  noLabel: false,
  inputHelperText: '',
};

export default TextInputField;
