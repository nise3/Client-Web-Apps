import React, {FC} from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import CustomMuiModal, {
  DialogTitle,
} from '../../@softbd/modals/CustomMuiModal/CustomMuiModal';
import {DialogActions, DialogContent, Typography} from '@material-ui/core';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface DeactivateAccountPopupProps {
  onClose: () => void;
}

const DeactivateAccountPopup: FC<DeactivateAccountPopupProps> = ({
  ...props
}) => {
  const isLoading = false;
  return (
    <>
      <CustomMuiModal maxWidth={'sm'} onClose={props.onClose} open={true}>
        <DialogTitle style={{background: '#fddcdc'}} onClose={props.onClose}>
          <DeleteIcon style={{color: 'red'}} />
          <IntlMessages
            id='common.deactivate'
            values={{subject: <IntlMessages id='common.deactivate' />}}
          />
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant={'h6'}>
            Do you still want to continue the process of Delete Account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
          </>
        </DialogActions>
      </CustomMuiModal>
    </>
  );
};

export default DeactivateAccountPopup;
