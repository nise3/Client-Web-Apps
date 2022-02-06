import React, {useCallback, useState} from 'react';
import Tooltip from '@mui/material/Tooltip';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ConfirmationDialog from '../../../@crema/core/ConfirmationDialog';
import {Button} from '@mui/material';
import {ButtonProps} from '@mui/material/Button/Button';
import DoneIcon from '@mui/icons-material/Done';

interface ApproveButtonProps extends ButtonProps {
  approveAction: () => void;
  className?: string;
  approveTitle?: string;
  buttonText?: string;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({
  approveAction,
  approveTitle,
  className,
  buttonText,
  ...extra
}) => {
  const [isApproveDialogOpen, setApproveDialogOpen] = useState(false);

  const onConfirm = useCallback(() => {
    approveAction();
    setApproveDialogOpen(false);
  }, [setApproveDialogOpen]);

  const onDeny = useCallback(() => {
    setApproveDialogOpen(false);
  }, []);

  return (
    <>
      <Tooltip title={<IntlMessages id='common.accept' />}>
        <Button
          startIcon={<DoneIcon style={{marginLeft: '5px'}} />}
          onClick={() => setApproveDialogOpen(true)}
          sx={extra?.color && {color: 'secondary.main'}}
          color={'success'}
          {...extra}>
          {buttonText ?? <IntlMessages id='common.publish' />}
        </Button>
      </Tooltip>

      {isApproveDialogOpen ? (
        <ConfirmationDialog
          open={isApproveDialogOpen}
          onDeny={onDeny}
          onConfirm={onConfirm}
          title={approveTitle}
          dialogTitle={<IntlMessages id='common.accept_application' />}
        />
      ) : null}
    </>
  );
};

export default React.memo(ApproveButton);
