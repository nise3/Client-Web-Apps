import React from 'react';
import Tooltip from '@mui/material/Tooltip';

import {Button} from '@mui/material';
import {ButtonProps} from '@mui/material/Button/Button';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import DoneIcon from '@mui/icons-material/Done';

interface ApproveButtonProps extends ButtonProps {
  approveAction: (itemId: any) => void;
  approveTitle: string;
  className?: string;
  itemId?: any;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({
  approveAction,
  approveTitle,
  className,
  itemId,
  ...extra
}) => {
  /*  const [isApproveDialogOpen, setApproveDialogOpen] = useState(false);

  const onConfirm = useCallback(() => {
    approveAction(itemId);
    setApproveDialogOpen(false);
  }, [setApproveDialogOpen]);

  const onDeny = useCallback(() => {
    setApproveDialogOpen(false);
  }, []);*/

  return (
    <>
      <Tooltip title={<IntlMessages id='common.approve' />}>
        <Button
          startIcon={<DoneIcon />}
          /*   onClick={() => setApproveDialogOpen(true)}*/
          sx={{color: 'primary'}}
          color={'success'}
          {...extra}>
          {<IntlMessages id='common.approve' />}
        </Button>
      </Tooltip>
    </>
  );
};

export default React.memo(ApproveButton);
