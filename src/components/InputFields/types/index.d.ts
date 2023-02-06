import { FieldErrors, Control } from 'react-hook-form';
import { SliderProps } from '@mui/material';

type BaseInputField = {
    /**
     * `control` object from [useForm()](https://react-hook-form.com/api/useform/control/) hook
     */
    control: Control<any>;

    /**
     * `fieldName` is same as like `name` attribute of HTML `<input/>` elements.
     * `fieldName` must be unique for every component.
     */
    fieldName: string;

    /**
     * If `true` , all Labels will not be shown
     * @default false
     */
    noLabel?: boolean;

    /**
     * If `true` , a separate label will be shown which will be outside of this input field
     * @default false
     */
    separateLabel?: boolean;

    /**
     * error object from useForm().[formState](https://react-hook-form.com/api/useform/formstate)
     */
    inputErrors: FieldErrors;

    /**
     * Helper message for this input field
     * @default ''
     */
    inputHelperText?: string;

    /**
     * Label for this input field
     * @default 'TextField'
     */
    inputLabel?: string;

    /**
     * Placeholder text for this input field
     * @default ''
     */
    inputPlaceholder?: string;

    /**
     * If true will show red asterisk
     * @default `false`
     */
    required?: boolean;
};

export type AdditionalBaseInputField = {
    /**
     * `className` is same as `class` attribute to html elements
     * @default ''
     */
    className?: string;
    /**
     * If `true`, will bring user's attention to this field on first rendering
     * @default false
     */
    autoFocus?: boolean;
};

export interface ITextInputFieldProps extends BaseInputField, AdditionalBaseInputField {
    /**
     * `makeItTextArea` will change TextInputField to textarea(multiline) component
     */
    makeItTextArea?: boolean;

    /**
     * @default `false`
     */
    showAdornment?: boolean;

    /**
     *@default `end`
     */
    adornmentPosition?: 'start' | 'end';

    /**
     *
     */
    adornmentButtonHandler?: () => void;
}

export interface IPasswordInputFieldProps extends BaseInputField, AdditionalBaseInputField {}

export interface IDateInputField extends Omit<BaseInputField, 'inputPlaceholder'> {}

export interface ISwitchInputField extends BaseInputField {}

interface IRadioSelect {
    label: string;
    value: string;
}

export interface IRadioInputField extends Omit<BaseInputField, 'inputPlaceholder' | 'noLabel'> {
    /**
     *
     */
    showBorder?: boolean;
    /**
     *
     */
    className?: string;
    /**
     *
     */
    alignCenter?: boolean;
    /**
     *
     */
    radioSelect: IRadioSelect[];
    /**
     *
     */
    showVertically?: boolean;
}

export interface ISliderInputField extends Omit<BaseInputField, 'inputPlaceholder' | 'noLabel'> {
    /**
     *
     */
    defaultValue?: number;

    /**
     *
     */
    color?: SliderProps['color'];

    /**
     *
     */
    step?: number;

    /**
     *
     */
    size?: SliderProps['size'];

    /**
     *
     */
    min?: SliderProps['min'];

    /**
     *
     */
    max?: SliderProps['max'];

    /**
     *
     */
    marks: SliderProps['marks'];

    /**
     *
     */
    showBorder?: boolean;
}

export interface IOptions {
    value: string | number;
    option: string;
    id: string;
}

export interface ISelectInputField extends Omit<BaseInputField, 'inputPlaceholder' | 'noLabel'> {
    options: IOptions[];
}
