import React, {useState} from 'react';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Tooltip from '@material-ui/core/Tooltip';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ConfirmationDialog from '../../../@crema/core/ConfirmationDialog';
import {Button, makeStyles} from '@material-ui/core';
import clsx from 'clsx';

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
  return (
    <>
      <Tooltip title={<IntlMessages id='common.delete_btn' />}>
        <Button
          startIcon={<DeleteSharpIcon />}
          onClick={() => setDeleteDialogOpen(true)}
          className={clsx(classes.button, className)}
          {...extra}>
          {<IntlMessages id='common.delete_btn' />}
        </Button>
      </Tooltip>

      {isDeleteDialogOpen ? (
        <ConfirmationDialog
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          onConfirm={deleteAction}
          title={deleteTitle}
          dialogTitle={<IntlMessages id='common.deleteItem' />}
        />
      ) : null}
    </>
  );
};

export default DeleteButton;
