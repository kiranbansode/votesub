import { Control, Controller, FieldErrors } from 'react-hook-form';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import SeparateLabel from 'components/SeparateLabel';
import inputErrorMessageFinder from 'utils/helperFunctions/inputErrorMessageFinder';

interface IDateInputField {
    inputErrors: FieldErrors;
    fieldName: string;
    control: Control;
    inputLabel: string;
    inputHelperText?: string;
    separateLabel?: boolean;
    noLabel?: boolean;
    required?: boolean;
}

const DateInputField = ({
    inputErrors,
    separateLabel,
    noLabel,
    fieldName,
    inputHelperText,
    inputLabel,
    control,
    required,
}: IDateInputField) => {
    const error = inputErrorMessageFinder(fieldName, inputErrors);
    const now = dayjs();
    let labelToShow: string | null;

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
                <FormControl fullWidth error={Boolean(error)}>
                    {separateLabel ? (
                        <SeparateLabel htmlFor={fieldName} label={inputLabel} required={required} />
                    ) : null}

                    <Controller
                        control={control}
                        name={fieldName}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disableFuture
                                    inputFormat="DD/MM/YYYY"
                                    label={labelToShow}
                                    openTo="year"
                                    renderInput={(params) => (
                                        <TextField
                                            name={field.name}
                                            onBlur={field.onBlur}
                                            // eslint-disable-next-line react/jsx-props-no-spreading
                                            {...params}
                                        />
                                    )}
                                    value={field.value || now}
                                    views={['year', 'month', 'day']}
                                    onChange={field.onChange}
                                />
                            </LocalizationProvider>
                        )}
                    />
                    <FormHelperText id={fieldName}>{error || inputHelperText}</FormHelperText>
                </FormControl>
            </InputFieldWrapper>
        </>
    );
};

DateInputField.defaultProps = {
    separateLabel: false,
    noLabel: false,
    inputHelperText: '',
    required: false,
};

export default DateInputField;
