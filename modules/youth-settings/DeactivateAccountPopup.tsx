import React, {FC} from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import CustomMuiModal, {
  DialogTitle,
} from '../../@softbd/modals/CustomMuiModal/CustomMuiModal';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';

import useStyles from './Settings.style';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import {Delete} from '@mui/icons-material';

interface DeactivateAccountPopupProps {
  onClose: () => void;
}

const DeactivateAccountPopup: FC<DeactivateAccountPopupProps> = ({
  ...props
}) => {
  const isLoading = false;
  const classes = useStyles();
  return (
    <>
      <CustomMuiModal maxWidth={'sm'} onClose={props.onClose} open={true}>
        <DialogTitle onClose={props.onClose}>
          <Delete className={classes.deleteIcon} />
          <Box>
            <IntlMessages
              id='common.deactivate'
              values={{subject: <IntlMessages id='common.deactivate' />}}
            />

            <Typography>
              If you delete your account you will no longer be able to get
              information.
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant={'h6'}>
            Do you still want to continue the process of Delete Account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              startIcon={<Delete />}>
              Delete
            </Button>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
          </>
        </DialogActions>
      </CustomMuiModal>
    </>
  );
};

export default DeactivateAccountPopup;
