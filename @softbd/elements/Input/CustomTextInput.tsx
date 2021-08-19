import {TextField} from '@material-ui/core';

type Props = {
  id: string;
  name: string;
  label?: string;
  value: string;
  className?: string;
  error?: boolean;
  helperText?: string | boolean;
  onChange: any;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
}

const CustomTextInput = ({id, name, label, value, className, onChange, error, helperText, variant, size}: Props) => {
  return (
    <TextField
      fullWidth
      variant={variant ? variant : 'outlined'}
      size={size ? size : 'small'}
      id={id}
      name={name}
      className={className}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default CustomTextInput;