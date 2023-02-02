import { Slider, FormControl, FormHelperText, SliderProps, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import SeparateLabel from 'components/SeparateLabel';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import './SliderInputField.styles.scss';
import inputErrorMessageFinder from 'utils/helperFunctions/inputErrorMessageFinder';

const sliderColorTheme = createTheme({
    palette: {
        primary: {
            main: green[500],
        },
    },
});

interface ISliderInputField {
    defaultValue?: number;
    control: Control;
    color?: SliderProps['color'];
    fieldName: string;
    inputErrors: FieldErrors;
    inputFieldHelperText?: string;
    required?: boolean;
    separateLabel?: boolean;
    inputLabel?: string;
    step?: number;
    size?: SliderProps['size'];
    min?: SliderProps['min'];
    max?: SliderProps['max'];
    marks: SliderProps['marks'];
    showBorder?: boolean;
}

// eslint-disable-next-line arrow-body-style
const SliderInputField = ({
    defaultValue,
    color,
    control,
    fieldName,
    inputErrors,
    inputFieldHelperText,
    required,
    inputLabel,
    separateLabel,
    step,
    marks,
    max,
    min,
    size,
    showBorder,
}: // eslint-disable-next-line arrow-body-style
ISliderInputField) => {
    const errorMessage = inputErrorMessageFinder(fieldName, inputErrors);

    const showBorderAround = showBorder ? 'show-border' : '';
    const showBorderInErrorState = errorMessage ? 'error-border' : '';

    return (
        <InputFieldWrapper className="slider-input-field">
            <FormControl fullWidth error={Boolean(errorMessage)}>
                {separateLabel ? (
                    <SeparateLabel htmlFor={fieldName} label={inputLabel} required={required} />
                ) : null}

                <div
                    className={`slider-input-container ${showBorderAround} ${showBorderInErrorState}`}
                >
                    <Controller
                        control={control}
                        name={fieldName}
                        render={({ field }) => (
                            <ThemeProvider theme={sliderColorTheme}>
                                <Slider
                                    color={color}
                                    defaultValue={defaultValue}
                                    id={fieldName}
                                    marks={marks}
                                    max={max}
                                    min={min}
                                    size={size}
                                    step={step}
                                    valueLabelDisplay="auto"
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...field}
                                />
                            </ThemeProvider>
                        )}
                    />
                </div>
                <FormHelperText>{errorMessage || inputFieldHelperText}</FormHelperText>
            </FormControl>
        </InputFieldWrapper>
    );
};

SliderInputField.defaultProps = {
    color: 'primary',
    defaultValue: 0,
    inputFieldHelperText: '',
    max: 100,
    min: 0,
    size: 'medium',
    step: 5,
    required: false,
    inputLabel: 'Slider Input Field',
    separateLabel: false,
    showBorder: false,
};

export default SliderInputField;
