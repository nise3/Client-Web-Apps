import React, {FC} from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  DialogActions,
  IconButton,
} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';

interface CustomHookFormProps {
  title: React.ReactNode | string;
  actions?: React.ReactNode;
  handleSubmit: any;
  onClose?: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const CustomHookForm: FC<CustomHookFormProps> = ({
  handleSubmit,
  children,
  actions,
  ...props
}) => {
  return (
    <Card>
      <CardHeader
        action={
          props.onClose && (
            <IconButton aria-label='close' onClick={props.onClose} size='large'>
              <CloseIcon />
            </IconButton>
          )
        }
        title={props.title}
      />
      <CardContent sx={{position: 'relative'}}>
        <form onSubmit={handleSubmit} autoComplete='off'>
          {children}
          {actions && <DialogActions>{actions}</DialogActions>}
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomHookForm;
