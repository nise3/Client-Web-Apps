import React, {useCallback, useState} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import ConfirmationDialog from '../../../../@crema/core/ConfirmationDialog';
import {Button, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {FiTrash2} from 'react-icons/fi';

const useStyles = makeStyles((theme) => {
  return {
    button: {
      color: theme.palette.error.main,
    },
  };
});

interface DeleteButtonProps {
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
  const classes = useStyles();

  const onConfirm = useCallback(() => {
    deleteAction();
    setDeleteDialogOpen(false);
  }, [setDeleteDialogOpen]);

  const onDeny = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  return (
    <>
      <Tooltip title={<IntlMessages id='common.delete_btn' />}>
        <Button
          startIcon={<FiTrash2 />}
          onClick={() => setDeleteDialogOpen(true)}
          className={clsx(classes.button, className)}
          {...extra}>
          {<IntlMessages id='common.delete_btn' />}
        </Button>
      </Tooltip>

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

export default DeleteButton;
