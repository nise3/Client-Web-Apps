import React, {useCallback, useState} from 'react';
import Tooltip from '@mui/material/Tooltip';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ConfirmationDialog from '../../../@crema/core/ConfirmationDialog';
import {Button} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import {FiUserCheck} from 'react-icons/fi';
import {ButtonProps} from '@mui/material/Button/Button';

const useStyles = makeStyles((theme) => {
  return {
    button: {
      color: theme.palette.success.main,
    },
  };
});

interface ApproveButtonProps extends ButtonProps {
  acceptAction: () => void;
  acceptTitle: string;
  className?: string;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({
                                                     acceptAction,
                                                     acceptTitle,
                                                     className,
                                                     ...extra
                                                   }) => {
  const [isAcceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const classes = useStyles();

  const onConfirm = useCallback(() => {
    acceptAction();
    setAcceptDialogOpen(false);
  }, [setAcceptDialogOpen]);

  const onDeny = useCallback(() => {
    setAcceptDialogOpen(false);
  }, []);

  return (
    <>
      <Tooltip title={<IntlMessages id='applicationManagement.accept' />}>
        <Button
          startIcon={<FiUserCheck />}
          onClick={() => setAcceptDialogOpen(true)}
          className={clsx(classes.button, className)}
          {...extra}>
          {<IntlMessages id='applicationManagement.accept' />}
        </Button>
      </Tooltip>

      {isAcceptDialogOpen ? (
        <ConfirmationDialog
          open={isAcceptDialogOpen}
          onDeny={onDeny}
          onConfirm={onConfirm}
          title={acceptTitle}
          dialogTitle={<IntlMessages id='applicationManagement.acceptApplication' />}
        />
      ) : null}
    </>
  );
};

export default React.memo(ApproveButton);
