import { Control, Controller, FieldErrors } from 'react-hook-form';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
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
}

const DateInputField = ({
    inputErrors,
    separateLabel,
    noLabel,
    fieldName,
    inputHelperText,
    inputLabel,
    control,
}: IDateInputField) => {
    const error = inputErrorMessageFinder(fieldName, inputErrors);
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
                        <SeparateLabel htmlFor={fieldName} label={inputLabel} />
                    ) : null}

                    <Controller
                        control={control}
                        name={fieldName}
                        render={({ field }) => (
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
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...field}
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
    inputHelperText: 'DateInputField',
};

export default DateInputField;
