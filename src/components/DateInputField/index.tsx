import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import SeparateLabel from 'components/SeparateLabel';

interface DateInputFieldTypes {
  useFormRegister: UseFormRegisterReturn;
  inputLabel?: string;
  inputHelperText?: string;
  separateLabel?: boolean;
  noLabel?: boolean;
}

const DateInputField = ({
  separateLabel,
  noLabel,
  inputHelperText,
  inputLabel,
  useFormRegister,
}: DateInputFieldTypes) => {
  const [value, setValue] = useState<Date | null>(new Date());

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

          <LocalizationProvider
            dateAdapter={DateAdapter}
            dateFormats={{ keyboardDate: 'dd/MM/yyyy' }}
          >
            <DatePicker
              disableFuture
              label={labelToShow}
              openTo="day"
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} />}
              value={value}
              views={['year', 'month', 'day']}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
          <FormHelperText id={useFormRegister.name}>{inputHelperText}</FormHelperText>
        </FormControl>
      </InputFieldWrapper>
    </>
  );
};

DateInputField.defaultProps = {
  separateLabel: false,
  noLabel: false,
  inputHelperText: '',
  inputLabel: 'DateInputField',
};

export default DateInputField;
