import React, {FC} from 'react';
import {
  Card,
  CardContent,
  DialogActions,
  DialogTitle as MuiDialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: CremaTheme) => ({
  formTitleRoot: {
    margin: 0,
    padding: '10px 0px 20px 0px',
  },
  formTitle: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: '12px',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

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
  const classes = useStyles();
  return (
    <Card>
      <CardContent sx={{position: 'relative'}}>
        <MuiDialogTitle className={classes.formTitleRoot}>
          <Typography className={classes.formTitle}>{props.title}</Typography>
          {props.onClose ? (
            <IconButton
              aria-label='close'
              className={classes.closeButton}
              onClick={props.onClose}
              size='large'>
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
        <form onSubmit={handleSubmit} autoComplete='off'>
          {children}
          {actions && <DialogActions>{actions}</DialogActions>}
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomHookForm;
