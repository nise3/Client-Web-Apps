import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {DialogContent, DialogActions} from '@material-ui/core';
import {CremaTheme} from '../types/AppContextPropsType';
import {Fonts} from '../shared/constants/AppEnums';
import CustomMuiModal, {DialogTitle} from './CustomMuiModal';
import {FormikHandlers} from 'formik/dist/types';

const useStyles = makeStyles((theme: CremaTheme) => ({
  formRoot: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
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

interface FormikFormMuiModalPopupProps {
  title: React.ReactNode | string;
  actions?: React.ReactNode;
  formik: FormikHandlers;
  open: boolean;
  onClose: () => void;
}

const FormikFormMuiModalPopup: React.FC<FormikFormMuiModalPopupProps> = ({
                                                                           formik,
                                                                           children,
                                                                           actions,
                                                                           ...props
                                                                         }) => {
  const classes = useStyles();

  return (
    <CustomMuiModal {...props}>
      <DialogTitle id='max-width-dialog-title' onClose={props.onClose}>
        {props.title}
      </DialogTitle>
      <form
        onSubmit={formik.handleSubmit}
        className={classes.formRoot}
        autoComplete='off'>
        <DialogContent dividers>{children}</DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </form>
    </CustomMuiModal>
  );
};

export default FormikFormMuiModalPopup;
