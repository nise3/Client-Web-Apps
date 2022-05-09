import React, {useCallback, useState} from 'react';
import {ButtonProps} from '@mui/material/Button/Button';
import ConfirmationDialog from '../../../@crema/core/ConfirmationDialog';
import {useRouter} from 'next/router';
import {useIntl} from 'react-intl';

interface SuccessPopupProps extends ButtonProps {
  closeAction: () => void;
  stepNo: string | number;
  initiativeId: string | number;
  completionStep: number;
  formStep?: string | number;
  className?: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  closeAction,
  stepNo,
  initiativeId,
  completionStep,
  formStep,
  className,
  ...extra
}) => {
  const [isSuccessPopUpOpen, setSuccessPopUpOpen] = useState(true);
  const router = useRouter();
  const presentPath = router.asPath;
  const {messages} = useIntl();

  const onConfirm = useCallback(() => {
    router.push({
      pathname: presentPath + '/' + initiativeId,
      query: {
        completionStep: completionStep,
        formStep: formStep,
        presentStep: completionStep + 1,
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
      yesNo={false}
    />
  );
};

export default React.memo(SuccessPopup);
