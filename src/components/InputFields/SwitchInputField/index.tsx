/* eslint-disable react/jsx-props-no-spreading */
import { Controller, Control } from 'react-hook-form';
import { Switch, FormControl, FormHelperText, SwitchProps } from '@mui/material';

import './SwitchInputField.styles.scss';

// TODO: Move below mentioned interfaces to InputFields/types
interface ISwitchInputField {
    control: Control;
    fieldName: string;
    helperText?: string;
    disabled?: boolean;
    color?: SwitchProps['color'];
}

const SwitchInputField = ({
    color = 'secondary',
    helperText = '',
    disabled = false,
    control,
    fieldName,
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

export default SwitchInputField;
