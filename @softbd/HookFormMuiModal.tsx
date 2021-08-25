import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {DialogContent, DialogActions} from '@material-ui/core';
import {CremaTheme} from '../types/AppContextPropsType';
import {Fonts} from '../shared/constants/AppEnums';
import CustomMuiModal, {DialogTitle} from './CustomMuiModal';

const useStyles = makeStyles((theme: CremaTheme) => ({
  formRoot: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('xl')]: {},
  },
  fontBold: {
    fontWeight: Fonts.MEDIUM,
  },
  pointer: {
    cursor: 'pointer',
  },
  textareaAutosizeRoot: {
    width: '100%',
    border: '0 none',
    fontWeight: Fonts.REGULAR,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  btnRoot: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  scrollRoot: {
    height: 595,
  },
}));

interface HookFormMuiModalPopupProps {
  title: React.ReactNode | string;
  actions?: React.ReactNode;
  handleSubmit: any;
  open: boolean;
  onClose: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const HookFormMuiModal: React.FC<HookFormMuiModalPopupProps> = ({
  handleSubmit,
  children,
  actions,
  ...props
}) => {
  const classes = useStyles();

  return (
    <CustomMuiModal {...props}>
      <DialogTitle onClose={props.onClose}>{props.title}</DialogTitle>
      <form
        onSubmit={handleSubmit}
        className={classes.formRoot}
        autoComplete='off'>
        <DialogContent dividers>{children}</DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </form>
    </CustomMuiModal>
  );
};

export default HookFormMuiModal;
