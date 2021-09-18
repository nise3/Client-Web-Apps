import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import React, {FC} from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@material-ui/core/Grid';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import IconUser from '../../../@softbd/icons/IconUser';
interface UserInfoEditPopupProps {
  onClose: () => void;
}

const UserInfoEditPopup: FC<UserInfoEditPopupProps> = ({
                                                               ...props
                                                             }) => {
  const {messages} = useIntl();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(),
  });

  const isLoading = false;
  const onSubmit: SubmitHandler<any> = async (data: []) => {

  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconUser/>
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='user.label' />}}
            />
        </>
      }
      maxWidth={'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose}  />
          <SubmitButton isSubmitting={isSubmitting}  />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='title_bn'
            label={messages['common.title_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

      </Grid>
    </HookFormMuiModal>
  );
};

export default UserInfoEditPopup;
