import { Controller, Control } from 'react-hook-form';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText } from '@mui/material';
import SeparateLabel from 'components/SeparateLabel';
import InputFieldWrapper from 'styled/InputFieldWrapper';

import './RadioInputField.styles.scss';

interface RadioInputFieldTypes {
  useFormControl: Control;
  fieldName: string;
  inputLabel: string;
  inputHelperText?: string;
  separateLabel?: boolean;
}

const RadioInputField = ({
  useFormControl,
  fieldName,
  inputLabel,
  inputHelperText,
  separateLabel,
}: RadioInputFieldTypes) => (
  <Controller
    control={useFormControl}
    name={fieldName}
    render={({ field }) => (
      <>
        <InputFieldWrapper id="radio-buttons">
          <FormControl>
            {separateLabel ? <SeparateLabel htmlFor={field.name} label={inputLabel} /> : null}
            <RadioGroup
              row
              aria-labelledby="gender"
              className="radio-buttons"
              name={field.name}
              value={field.value || 'male'}
              onBlur={field.onBlur}
              onChange={field.onChange}
            >
              <FormControlLabel control={<Radio />} label="Male" value="male" />
              <FormControlLabel control={<Radio />} label="Female" value="female" />
            </RadioGroup>
            <FormHelperText>{inputHelperText}</FormHelperText>
          </FormControl>
        </InputFieldWrapper>
      </>
    )}
  />
);

RadioInputField.defaultProps = {
  inputHelperText: '',
  separateLabel: true,
};

export default RadioInputField;
