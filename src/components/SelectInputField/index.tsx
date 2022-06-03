import { FormHelperText, MenuItem, FormControl, Select } from '@mui/material';
import SeparateLabel from 'components/SeparateLabel';
import { Controller, FieldErrors, Control } from 'react-hook-form';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import inputErrorMessageFinder from 'utils/helperFunctions/inputErrorMessageFinder';

import './SelectInputField.styles.scss';

export interface Option {
  value: string | number;
  option: string;
}

export interface SelectInputFieldProps {
  inputErrors: FieldErrors;
  control: Control;
  inputLabel: string;
  showSeparateLabel?: boolean;
  options: Option[];
  fieldName: string;
}

const SelectInputField = ({
  inputErrors,
  control,
  inputLabel,
  showSeparateLabel,
  options,
  fieldName,
}: SelectInputFieldProps) => {
  const error = inputErrorMessageFinder(fieldName, inputErrors);

  return (
    <InputFieldWrapper id="select-input-field">
      <FormControl fullWidth error={Boolean(error)}>
        {showSeparateLabel ? <SeparateLabel htmlFor={fieldName} label={inputLabel} /> : null}
        <Controller
          control={control}
          name={fieldName}
          render={({ field }) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Select id={fieldName} label={inputLabel} labelId={fieldName} {...field}>
              {options.map(({ value, option }) => (
                <MenuItem key={value} value={value}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </InputFieldWrapper>
  );
};

SelectInputField.default = {
  showSeparateLabel: false,
};

export default SelectInputField;
