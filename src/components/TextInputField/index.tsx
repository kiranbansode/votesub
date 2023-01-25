import { TextField, FormControl, FormHelperText, InputAdornment, IconButton } from '@mui/material';
import { ITextInputFieldProps } from 'components/types';
import SeparateLabel from 'components/SeparateLabel';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import inputErrorMessageFinder from 'utils/helperFunctions/inputErrorMessageFinder';
import './TextInputField.styles.scss';
import { Controller } from 'react-hook-form';
import BackspaceIcon from '@mui/icons-material/Backspace';

/**
 * TextInputField is a wrapper component around Material-UI's TextField.
 * It has much more capabilities like integration with React-Hook-Form,
 * custom Error Messages and many more.
 *
 * @author Kiran A. Bansode <kiran5120135@gmail.com> <czar.kiran@gmail.com>
 * @return TextField Component
 */

const MUI_ADORNMENT_POSITIONS = {
    start: 'startAdornment',
    end: 'endAdornment',
};

function TextInputField({
    autoFocus = false,
    noLabel = false,
    separateLabel = false,
    required = false,
    makeItTextArea = false,
    showAdornment = false,
    className = '',
    inputHelperText = '',
    inputPlaceholder = '',
    adornmentPosition = 'end',
    inputLabel = 'TextField',
    errors,
    control,
    fieldName,
    adornmentButtonHandler,
}: ITextInputFieldProps) {
    // TODO: Find better way to handle empty string
    if (fieldName === '') {
        throw Error('fieldName can not be an empty string');
    }

    const errorMessage = inputErrorMessageFinder(fieldName, errors);

    let labelToShow: any;
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
        <InputFieldWrapper>
            <FormControl error={Boolean(errorMessage)}>
                {separateLabel ? (
                    <SeparateLabel htmlFor={fieldName} label={inputLabel} required={required} />
                ) : null}

                <Controller
                    control={control}
                    name={fieldName}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            InputProps={
                                showAdornment
                                    ? {
                                          [MUI_ADORNMENT_POSITIONS[adornmentPosition]]: (
                                              <InputAdornment position={adornmentPosition}>
                                                  <IconButton onClick={adornmentButtonHandler}>
                                                      <BackspaceIcon />
                                                  </IconButton>
                                              </InputAdornment>
                                          ),
                                      }
                                    : {}
                            }
                            autoFocus={autoFocus}
                            className={className}
                            error={Boolean(errorMessage)}
                            id={fieldName}
                            inputRef={field.ref}
                            label={labelToShow}
                            minRows={makeItTextArea ? 3 : 0}
                            multiline={makeItTextArea}
                            placeholder={inputPlaceholder}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...field}
                        />
                    )}
                />
                <FormHelperText id={fieldName}>{errorMessage || inputHelperText}</FormHelperText>
            </FormControl>
        </InputFieldWrapper>
    );
}

// TextInputField.defaultProps = {
//     autoFocus: false,
//     className: '',
//     separateLabel: false,
//     noLabel: false,
//     inputHelperText: '',
//     inputLabel: 'TextField',
//     inputPlaceholder: '',
// };

export default TextInputField;
