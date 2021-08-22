import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {DialogContent, DialogActions} from '@material-ui/core';
import {CremaTheme} from '../types/AppContextPropsType';
import {Fonts} from '../shared/constants/AppEnums';
import CustomMuiModal, {DialogTitle} from './CustomMuiModal';
import FormLabel from '@material-ui/core/FormLabel';

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
  title:{
    fontWeight: Fonts.BOLD,
    color: theme.palette.text.primary,
    fontSize: '22px'
  },
  titleWrapper:{
    padding: "20px 0px 0px 20px"
  }
}));

interface CustomDetailsViewMuiModalPopupProps {
  title: React.ReactNode | string;
  actions?: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const FormikFormMuiModalPopup: React.FC<CustomDetailsViewMuiModalPopupProps> = ({
                                                                                  children,
                                                                                  actions,
                                                                                  ...props
                                                                                }) => {
  const classes = useStyles();

  return (
    <CustomMuiModal {...props}>
      <DialogTitle id='max-width-dialog-title' onClose={props.onClose}>
        <FormLabel className={classes.title}>{props.title}</FormLabel>
      </DialogTitle>
      <form className={classes.formRoot}>
        <DialogContent dividers>{children}</DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </form>
    </CustomMuiModal>
  );
};

export default FormikFormMuiModalPopup;