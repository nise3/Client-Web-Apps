import React from 'react';
import {
  Dialog,
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
import {TransitionProps} from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(3),
    },
    pageTitle: {
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
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  onClose: () => void;
}

export const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const {children, classes, onClose, ...other} = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6' className={classes.pageTitle}>
        {children}
      </Typography>
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface CustomMuiModalProps {
  open: boolean;
  onClose: () => any;
  title: React.ReactNode | string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const CustomMuiModal: React.FC<CustomMuiModalProps> = ({
  title,
  onClose,
  children,
  maxWidth = 'md',
  ...props
}) => {
  return (
    <Dialog
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      {...props}
      maxWidth={maxWidth}
      fullWidth
      scroll={'body'}
      onClose={onClose}>
      {children}
    </Dialog>
  );
};

export default CustomMuiModal;
