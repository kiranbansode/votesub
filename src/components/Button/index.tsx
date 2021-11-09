import { ButtonProps } from '@mui/material';
import { LoadingButton as LoadingButtonMaterial, LoadingButtonProps } from '@mui/lab';
import InputWrapper from 'styled/InputWrapper';

interface ButtonPropsType {
  children?: ButtonProps['children'];
  color?: ButtonProps['color'];
  loading?: LoadingButtonProps['loading'];
  size?: ButtonProps['size'];
  type?: 'reset' | 'submit' | 'button';
  variant?: ButtonProps['variant'];
}

const Button = ({ color, variant, children, size, type, loading }: ButtonPropsType) => (
  <InputWrapper>
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
  </InputWrapper>
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
