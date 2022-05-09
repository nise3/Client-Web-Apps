import React from 'react';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import IntlMessages from '../../utility/IntlMessages';
import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {Fonts} from '../../../shared/constants/AppEnums';

const PREFIX = 'ConfirmationDialog';

const classes = {
  btn: `${PREFIX}-btn`,
  contentText: `${PREFIX}-contentText`,
};

const StyledDialog = styled(Dialog)({
  [`& .${classes.btn}`]: {
    marginLeft: 8,
    fontWeight: Fonts.MEDIUM,
  },
  [`& .${classes.contentText}`]: {
    color: grey[600],
  },
});

interface ConfirmationDialogProps {
  open: boolean;
  onDeny: () => void;
  onConfirm: () => void;
  title: any;
  dialogTitle: any;
  yesNo?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onDeny,
  onConfirm,
  title,
  dialogTitle,
  yesNo = true,
}) => {
  return (
    <StyledDialog open={open} onClose={onDeny}>
      <Box px={{xs: 5, md: 7}} pt={{xs: 4, md: 6}} pb={{xs: 2, md: 4}}>
        <Box
          mb={3}
          component='h4'
          fontWeight={Fonts.MEDIUM}
          className='font-bold'
          id='alert-dialog-title'>
          {dialogTitle}
        </Box>
        <Box>
          <DialogContentText
            className={classes.contentText}
            id='alert-dialog-description'>
            {title}
          </DialogContentText>
        </Box>
        <Box pt={2}>
          <Button className={classes.btn} onClick={onDeny} color='primary'>
            <IntlMessages id={yesNo ? 'common.no' : 'common.close'} />
          </Button>
          <Button
            className={classes.btn}
            onClick={onConfirm}
            color='primary'
            autoFocus>
            <IntlMessages id={yesNo ? 'common.yes' : 'common.next'} />
          </Button>
        </Box>
      </Box>
    </StyledDialog>
  );
};

export default ConfirmationDialog;
