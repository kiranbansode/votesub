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
  inputLabel?: string;
  inputHelperText?: string;
  separateLabel?: boolean;
  noLabel?: boolean;
  inputPlaceHolder?: string;
  autoFocus?: boolean;
}

const TextInputField = ({
  separateLabel,
  noLabel,
  useFormRegister,
  inputLabel,
  inputHelperText,
  inputPlaceHolder,
  autoFocus,
}: TextInputFieldPropsType) => {
  let labelToShow;
  if (!noLabel) {
    labelToShow = !separateLabel ? inputLabel : null;
  } else {
    labelToShow = null;
  }

  return (
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
            autoFocus={autoFocus}
            id={useFormRegister.name}
            inputRef={useFormRegister.ref}
            label={labelToShow}
            name={useFormRegister.name}
            placeholder={inputPlaceHolder}
            onBlur={useFormRegister.onBlur}
            onChange={useFormRegister.onChange}
          />

          <FormHelperText id={useFormRegister.name}>{inputHelperText}</FormHelperText>
        </FormControl>
      </InputFieldWrapper>
    </>
  );
};

TextInputField.defaultProps = {
  autoFocus: false,
  inputHelperText: '',
  inputLabel: 'TextField',
  inputPlaceHolder: '',
  noLabel: false,
  separateLabel: false,
};

export default TextInputField;
