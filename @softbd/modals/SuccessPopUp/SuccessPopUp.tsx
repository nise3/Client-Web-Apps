import React, {useCallback, useState} from 'react';
import {ButtonProps} from '@mui/material/Button/Button';
import ConfirmationDialog from '../../../@crema/core/ConfirmationDialog';
import {useRouter} from 'next/router';
import {FOUR_IR_SERVICE_PATH} from '../../common/apiRoutes';
import {useIntl} from 'react-intl';

interface SuccessPopupProps extends ButtonProps {
  closeAction: () => void;
  stepNo: string | number;
  projectId: string | number;
  completionStep: string | number;
  formStep?: string | number;
  className?: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  closeAction,
  stepNo,
  projectId,
  completionStep,
  formStep,
  className,
  ...extra
}) => {
  const [isSuccessPopUpOpen, setSuccessPopUpOpen] = useState(true);
  const router = useRouter();
  const {messages} = useIntl();

  const onConfirm = useCallback(() => {
    router.push({
      pathname: FOUR_IR_SERVICE_PATH + '/' + projectId,
      query: {
        completionStep: completionStep,
        formStep: formStep,
        presentStep: 2,
      },
    });
    setSuccessPopUpOpen(false);
  }, [setSuccessPopUpOpen]);

  const onDeny = useCallback(() => {
    setSuccessPopUpOpen(false);
    closeAction();
  }, []);

  return (
    <ConfirmationDialog
      open={isSuccessPopUpOpen}
      onDeny={onDeny}
      onConfirm={onConfirm}
      title={''}
      dialogTitle={
        messages['4IR_steps.step'] +
        ' ' +
        stepNo +
        ' ' +
        messages['4IR_steps.completed']
      }
    />
  );
};

export default React.memo(SuccessPopup);
