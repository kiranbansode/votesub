import { ButtonProps } from '@mui/material';
import { LoadingButton as LoadingButtonMaterial, LoadingButtonProps } from '@mui/lab';
import InputFieldWrapper from 'styled/InputFieldWrapper';

interface ButtonPropsType {
    children?: ButtonProps['children'];
    color?: ButtonProps['color'];
    disabled?: boolean;
    loading?: LoadingButtonProps['loading'];
    size?: ButtonProps['size'];
    type?: 'reset' | 'submit' | 'button';
    variant?: ButtonProps['variant'];
    className?: string;
    onClick?: () => void;
}

const Button = ({
    children = 'Button',
    className = '',
    color = 'primary',
    disabled = false,
    loading = false,
    size = 'large',
    type = 'button',
    variant = 'contained',
    onClick = () => {},
}: ButtonPropsType) => (
    <InputFieldWrapper>
        <LoadingButtonMaterial
            fullWidth
            className={className}
            color={color}
            disabled={disabled}
            loading={loading}
            size={size}
            type={type}
            variant={variant}
            onClick={onClick}
        >
            {children}
        </LoadingButtonMaterial>
    </InputFieldWrapper>
);

export default Button;
