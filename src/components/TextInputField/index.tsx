import { TextField, FormControl, FormHelperText } from '@mui/material';
import { ITextInputFieldProps } from 'components/types';
import SeparateLabel from 'components/SeparateLabel';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import inputErrorMessageFinder from 'utils/helperFunctions/inputErrorMessageFinder';
import './TextInputField.styles.scss';

/**
 * TextInputField is a wrapper component around Material-UI's TextField.
 * It has much more capabilities like integration with React-Hook-Form,
 * custom Error Messages and many more.
 *
 * @author Kiran A. Bansode <kiran5120135@gmail.com> <czar.kiran@gmail.com>
 * @return TextField Component
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
    required,
    changeToTextArea,
}: ITextInputFieldProps) {
    const errorMessage = inputErrorMessageFinder(formRegister.name, errors);

    let labelToShow;
    /*
     * Depending on passed condition it will do one of following
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
                        <>
                            <SeparateLabel
                                htmlFor={formRegister.name}
                                label={inputLabel}
                                required={required}
                            />
                        </>
                    ) : null}

                    <TextField
                        fullWidth
                        autoFocus={autoFocus}
                        error={Boolean(errorMessage)}
                        id={formRegister.name}
                        inputRef={formRegister.ref}
                        label={labelToShow}
                        minRows={changeToTextArea ? 3 : 0}
                        multiline={changeToTextArea}
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
    changeToTextArea: false,
};

export default TextInputField;
