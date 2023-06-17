import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import SeparateLabel from 'components/InputFields/SeparateLabel';
import inputErrorMessageFinder from 'utils/helperFunctions/inputErrorMessageFinder';

// eslint-disable-next-line import/extensions
import { IDateInputField } from '../types';

// interface IDateInputField {
//     inputErrors: FieldErrors;
//     fieldName: string;
//     control: Control;
//     inputLabel: string;
//     inputHelperText?: string;
//     separateLabel?: boolean;
//     noLabel?: boolean;
//     required?: boolean;
// }

const DateInputField = ({
    separateLabel = false,
    noLabel = false,
    required = false,
    inputHelperText = '',
    inputErrors,
    fieldName,
    inputLabel,
    control,
}: IDateInputField) => {
    const errorMessage = inputErrorMessageFinder(fieldName, inputErrors);
    const now = dayjs();
    let labelToShow: string | null;

    if (!noLabel) {
        /* Depending on passed condition it will do one of following
            1. Separate Label - Detached from TextInputField
            2. No Label - Label will not be showed
            3. Default - Label will be shown in top border of TextInputField
        */
        // @ts-ignore
        labelToShow = !separateLabel ? inputLabel : null;
    }

    return (
        <>
            <InputFieldWrapper>
                <FormControl fullWidth error={Boolean(errorMessage)}>
                    {separateLabel ? (
                        <SeparateLabel
                            error={Boolean(errorMessage)}
                            htmlFor={fieldName}
                            label={inputLabel}
                            required={required}
                        />
                    ) : null}

                    <Controller
                        control={control}
                        name={fieldName}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disableFuture
                                    reduceAnimations
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
                    <FormHelperText id={fieldName}>
                        {errorMessage || inputHelperText}
                    </FormHelperText>
                </FormControl>
            </InputFieldWrapper>
        </>
    );
};

// DateInputField.defaultProps = {
//     separateLabel: false,
//     noLabel: false,
//     inputHelperText: '',
//     required: false,
// };

export default DateInputField;
