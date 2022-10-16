import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';

export type BaseInputField = {
    /**
     * If `true`, will bring user's attention to this field on first rendering
     * @default false
     */
    autoFocus?: boolean;

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
    errors: FieldErrors;

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
     * If true will show red asteric
     */
    required?: boolean;
};

export interface ITextInputFieldProps extends BaseInputField {
    /**
     * register() from useForm().[register](https://react-hook-form.com/api/useform/register)
     */
    formRegister: UseFormRegisterReturn;
}
