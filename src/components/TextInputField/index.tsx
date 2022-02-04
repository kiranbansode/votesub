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

/**
 * Generate TextInput Field
 * @author Kiran A. Bansode <kiran5120135@gmail.com>
 * @param autoFocus - bring user attention to input field
 * @param separateLabel - detach label from input field
 * @param noLabel - label will not be shown
 * @param inputHelperText - guidence or error message will be shown below input field
 * @param inputLabel - label for input field
 * @param inputPlaceHolder - placeholder inside input field
 * @param useFormRegister - register() method from useForm() [React Hook Form]
 * @return return TextInputField [JSX.Element]
 */

const TextInputField = ({
  autoFocus,
  separateLabel,
  noLabel,
  inputHelperText,
  inputLabel,
  inputPlaceHolder,
  useFormRegister,
}: TextInputFieldPropsType) => {
  let labelToShow;

  if (!noLabel) {
    /* Depending on passed conditon it will do one of follwing
    1. Separate Label - Detached from TextInputField
    2. No Label - Label will not be showed
    3. Default - Label will be shown in top border of TextInputField
  */
    labelToShow = !separateLabel ? inputLabel : null;
  }

  return (
    <>
      <InputFieldWrapper>
        <FormControl>
          {separateLabel ? (
            <SeparateLabel htmlFor={useFormRegister.name} label={inputLabel} />
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
  separateLabel: false,
  noLabel: false,
  inputHelperText: '',
  inputLabel: 'TextField',
  inputPlaceHolder: '',
};

export default TextInputField;
