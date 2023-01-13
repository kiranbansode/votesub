/* eslint-disable react/jsx-props-no-spreading */
import { Controller, Control } from 'react-hook-form';
import { Switch, FormControl, FormHelperText, SwitchProps } from '@mui/material';

import './SwitchInputField.styles.scss';

interface ISwitchInputField {
    control: Control;
    fieldName: string;
    helperText?: string;
    disabled?: boolean;
    color?: SwitchProps['color'];
}

const SwitchInputField = ({
    control,
    color,
    fieldName,
    helperText,
    disabled,
}: ISwitchInputField) => (
    <div className="switch-input-field">
        <FormControl>
            <Controller
                control={control}
                name={fieldName}
                render={({ field }) => {
                    const { onChange, ...otherFields } = field;
                    return (
                        <Switch
                            checked={field.value}
                            color={color}
                            disabled={disabled}
                            onChange={(e) => onChange(e.target.checked)}
                            {...otherFields}
                        />
                    );
                }}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    </div>
);

SwitchInputField.defaultProps = {
    helperText: '',
    disabled: false,
    color: 'secondary',
};

export default SwitchInputField;
