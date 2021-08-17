import React from 'react';
import {
  Dialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import {Close as CloseIcon} from '@material-ui/icons';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

interface CustomMuiModalProps {
  open: boolean;
  onClose: () => any;
  title: React.ReactNode | string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const CustomMuiModal: React.FC<CustomMuiModalProps> = ({
  title,
  onClose,
  actions,
  children,
  ...props
}) => {
  return (
    <Dialog
      {...props}
      maxWidth={'lg'}
      fullWidth
      scroll={'body'}
      onClose={onClose}>
      <DialogTitle id='customized-dialog-title' onClose={onClose}>
        {title}
      </DialogTitle>
      <MuiDialogContent dividers>{children}</MuiDialogContent>
      {actions && <MuiDialogActions>{actions}</MuiDialogActions>}
    </Dialog>
  );
};

export default CustomMuiModal;
