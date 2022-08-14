import { TextField, FormControl, FormHelperText } from '@mui/material';
import { ITextInputFieldProps } from 'components/types';
import SeparateLabel from 'components/SeparateLabel';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import inputErrorMessageFinder from 'utils/helperFunctions/inputErrorMessageFinder';
import './TextInputField.styles.scss';

/**
 * TextInputField is a wrapper component around Material-UI's TextField.
 * It has much more capabilities like intergration with React-Hook-Form,
 * custom Error Messages and more.
 *
 * @author Kiran A. Bansode <kiran5120135@gmail.com>
 * @return TextField Componenet
 */

function TextInputField({
    autoFocus,
    noLabel,
    separateLabel,
    errors,
    formRegister,
    inputHelperText,
    inputLabel,
    inputPlaceholder,
}: ITextInputFieldProps) {
    const errorMessage = inputErrorMessageFinder(formRegister.name, errors);

    let labelToShow;
    /*
     * Depending on passed conditon it will do one of follwing
     * Separate Label - Detached from TextInputField
     * No Label - Label will not be showed
     * Default - Label will be shown in top border of TextInputField like legend of a fieldset tag
     */
    if (!noLabel) {
        labelToShow = !separateLabel ? inputLabel : null;
    }

    return (
        <>
            <InputFieldWrapper>
                <FormControl error={Boolean(errorMessage)}>
                    {separateLabel ? (
                        <SeparateLabel htmlFor={formRegister.name} label={inputLabel} />
                    ) : null}

                    <TextField
                        fullWidth
                        autoFocus={autoFocus}
                        error={Boolean(errorMessage)}
                        id={formRegister.name}
                        inputRef={formRegister.ref}
                        label={labelToShow}
                        name={formRegister.name}
                        placeholder={inputPlaceholder}
                        onBlur={formRegister.onBlur}
                        onChange={formRegister.onChange}
                    />

                    <FormHelperText id={formRegister.name}>
                        {errorMessage || inputHelperText}
                    </FormHelperText>
                </FormControl>
            </InputFieldWrapper>
        </>
    );
}

TextInputField.defaultProps = {
    autoFocus: false,
    separateLabel: false,
    noLabel: false,
    inputHelperText: '',
    inputLabel: 'TextField',
    inputPlaceholder: '',
};

export default TextInputField;
