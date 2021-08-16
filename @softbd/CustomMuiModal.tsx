import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {IconButton, Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface CustomMuiModalProps {
  open: boolean;
  onDeny: (x: boolean) => void;
  onConfirm: () => void;
  title: any;
  onOk: any;
  children: React.ReactNode;
}

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

const CustomMuiModal: React.FC<CustomMuiModalProps> = ({
  open,
  onDeny,
  onConfirm,
  title,
  children,
  onOk,
}) => {
  return (
    <Dialog open={open} onClose={() => onDeny(false)} maxWidth={'lg'} fullWidth>
      <DialogTitle id='customized-dialog-title' onClose={() => onDeny(false)}>
        {title}
      </DialogTitle>
      <MuiDialogContent dividers>{children}</MuiDialogContent>
      <MuiDialogActions>
        <Button autoFocus onClick={onOk} color='primary'>
          Save changes
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
};

export default CustomMuiModal;
