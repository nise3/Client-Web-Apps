import React, {useState} from 'react';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Tooltip from '@material-ui/core/Tooltip';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ConfirmationDialog from '../../../@crema/core/ConfirmationDialog';
import {Button} from '@material-ui/core';

interface DeleteButtonProps {
  deleteAction: () => void;
  deleteTitle: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  deleteAction,
  deleteTitle,
  ...extra
}) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <Tooltip title={<IntlMessages id='common.delete_btn' />}>
        <Button
          startIcon={<DeleteSharpIcon />}
          onClick={() => setDeleteDialogOpen(true)}
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
