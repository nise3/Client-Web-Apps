import React, {useCallback, useState} from 'react';
import {styled} from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import ConfirmationDialog from '../../../../@crema/core/ConfirmationDialog';
import {Button} from '@mui/material';
import clsx from 'clsx';
import {FiTrash2} from 'react-icons/fi';
import {ButtonProps} from '@mui/material/Button/Button';

const PREFIX = 'DeleteButton';

const classes = {
  button: `${PREFIX}-button`,
};

const StyledTooltip = styled(Tooltip)(({theme}) => {
  return {
    [`& .${classes.button}`]: {
      color: theme.palette.error.main,
    },
  };
});

interface DeleteButtonProps extends ButtonProps {
  deleteAction: () => void;
  deleteTitle: string;
  className?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  deleteAction,
  deleteTitle,
  className,
  ...extra
}) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onConfirm = useCallback(() => {
    deleteAction();
    setDeleteDialogOpen(false);
  }, [setDeleteDialogOpen]);

  const onDeny = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  return (
    <>
      <StyledTooltip title={<IntlMessages id='common.delete_btn' />}>
        <Button
          startIcon={<FiTrash2 />}
          onClick={() => setDeleteDialogOpen(true)}
          className={clsx(classes.button, className)}
          {...extra}>
          {<IntlMessages id='common.delete_btn' />}
        </Button>
      </StyledTooltip>
      {isDeleteDialogOpen ? (
        <ConfirmationDialog
          open={isDeleteDialogOpen}
          onDeny={onDeny}
          onConfirm={onConfirm}
          title={deleteTitle}
          dialogTitle={<IntlMessages id='common.deleteItem' />}
        />
      ) : null}
    </>
  );
};

export default React.memo(DeleteButton);
