import React, {FC} from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import HookFormMuiModal from '../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {Grid} from '@mui/material';

interface ConfirmPasswordPopupProps {
  onClose: () => void;
}
const ConfirmPasswordPopup: FC<ConfirmPasswordPopupProps> = ({...props}) => {
  const {messages} = useIntl();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>();

  const isLoading = false;

  const onSubmit: SubmitHandler<any> = async (data: []) => {};
  return (
    <>
      <HookFormMuiModal
        {...props}
        open={true}
        title={
          <>
            <VpnKeyIcon />
            <IntlMessages
              id='common.change_password'
              values={{subject: <IntlMessages id='common.change_password' />}}
            />
          </>
        }
        maxWidth={'sm'}
        handleSubmit={handleSubmit(onSubmit)}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <CustomTextInput
              id='old_password'
              label={messages['common.oldPassword']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              id='new_password'
              label={messages['common.newPassword']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </HookFormMuiModal>
    </>
  );
};

export default ConfirmPasswordPopup;
