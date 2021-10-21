import React, {useCallback, useState} from 'react';
import Tooltip from '@mui/material/Tooltip';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ConfirmationDialog from '../../../@crema/core/ConfirmationDialog';
import {Button} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import {FiUserX} from 'react-icons/fi';
import {ButtonProps} from '@mui/material/Button/Button';

const useStyles = makeStyles((theme) => {
  return {
    button: {
      color: theme.palette.error.main,
    },
  };
});

interface RejectButtonProps extends ButtonProps {
  rejectAction: () => void;
  rejectTitle: string;
  className?: string;
}

const RejectButton: React.FC<RejectButtonProps> = ({
  rejectAction,
  rejectTitle,
  className,
  ...extra
}) => {
  const [isRejectDialogOpen, setRejectDialogOpen] = useState(false);
  const classes = useStyles();

  const onConfirm = useCallback(() => {
    rejectAction();
    setRejectDialogOpen(false);
  }, [setRejectDialogOpen]);

  const onDeny = useCallback(() => {
    setRejectDialogOpen(false);
  }, []);

  return (
    <>
      <Tooltip title={<IntlMessages id='applicationManagement.reject' />}>
        <Button
          startIcon={<FiUserX style={{marginLeft: '5px'}} />}
          onClick={() => setRejectDialogOpen(true)}
          className={clsx(classes.button, className)}
          {...extra}>
          {<IntlMessages id='applicationManagement.reject' />}
        </Button>
      </Tooltip>

      {isRejectDialogOpen ? (
        <ConfirmationDialog
          open={isRejectDialogOpen}
          onDeny={onDeny}
          onConfirm={onConfirm}
          title={rejectTitle}
          dialogTitle={
            <IntlMessages id='applicationManagement.rejectApplication' />
          }
        />
      ) : null}
    </>
  );
};

export default React.memo(RejectButton);
