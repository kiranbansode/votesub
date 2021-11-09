import { ButtonProps } from '@mui/material';
import { LoadingButton as LoadingButtonMaterial, LoadingButtonProps } from '@mui/lab';
import InputFieldWrapper from 'styled/InputFieldWrapper';

interface ButtonPropsType {
  children?: ButtonProps['children'];
  color?: ButtonProps['color'];
  loading?: LoadingButtonProps['loading'];
  size?: ButtonProps['size'];
  type?: 'reset' | 'submit' | 'button';
  variant?: ButtonProps['variant'];
}

const Button = ({ color, variant, children, size, type, loading }: ButtonPropsType) => (
  <InputFieldWrapper>
    <LoadingButtonMaterial
      fullWidth
      color={color}
      loading={loading}
      size={size}
      type={type}
      variant={variant}
    >
      {children}
    </LoadingButtonMaterial>
  </InputFieldWrapper>
);

Button.defaultProps = {
  children: 'Button',
  color: 'primary',
  loading: false,
  size: 'large',
  type: 'button',
  variant: 'contained',
};

export default Button;
