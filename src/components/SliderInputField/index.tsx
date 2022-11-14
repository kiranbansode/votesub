import { Slider, FormControl, FormHelperText, SliderProps } from '@mui/material';
import SeparateLabel from 'components/SeparateLabel';
import { Control, Controller } from 'react-hook-form';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import './SliderInputField.styles.scss';

interface ISliderInputField {
    defaultValue?: number;
    control: Control;
    color?: SliderProps['color'];
    fieldName: string;
    inputFieldHelperText?: string;
    required?: boolean;
    separateLabel?: boolean;
    inputLabel?: string;
    step?: number;
    size?: SliderProps['size'];
    min?: SliderProps['min'];
    max?: SliderProps['max'];
    marks: SliderProps['marks'];
}

// eslint-disable-next-line arrow-body-style
const SliderInputField = ({
    defaultValue,
    color,
    control,
    fieldName,
    inputFieldHelperText,
    required,
    inputLabel,
    separateLabel,
    step,
    marks,
    max,
    min,
    size,
}: // eslint-disable-next-line arrow-body-style
ISliderInputField) => {
    return (
        <InputFieldWrapper className="slider-input-field">
            <FormControl fullWidth>
                {separateLabel ? (
                    <SeparateLabel htmlFor={fieldName} label={inputLabel} required={required} />
                ) : null}

                <Controller
                    control={control}
                    name={fieldName}
                    render={({ field }) => (
                        <Slider
                            color={color}
                            defaultValue={defaultValue}
                            id={fieldName}
                            marks={marks}
                            max={max}
                            min={min}
                            size={size}
                            step={step}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...field}
                        />
                    )}
                />
                <FormHelperText>{inputFieldHelperText}</FormHelperText>
            </FormControl>
        </InputFieldWrapper>
    );
};

SliderInputField.defaultProps = {
    color: 'secondary',
    defaultValue: 0,
    inputFieldHelperText: '',
    max: 100,
    min: 0,
    size: 'medium',
    step: 5,
    required: false,
    inputLabel: 'Slider Input Field',
    separateLabel: false,
};

export default SliderInputField;
