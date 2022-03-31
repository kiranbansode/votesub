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
  className?: string;
}

const Button = ({ color, variant, children, size, type, loading, className }: ButtonPropsType) => (
  <InputFieldWrapper>
    <LoadingButtonMaterial
      fullWidth
      className={className}
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
  className: '',
  color: 'primary',
  loading: false,
  size: 'large',
  type: 'button',
  variant: 'contained',
};

export default Button;
