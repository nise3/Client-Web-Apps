import {SubmitHandler, useForm} from 'react-hook-form';
import {styled} from '@mui/material/styles';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import React, {FC, useEffect, useMemo} from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import IconUser from '../../../@softbd/icons/IconUser';
import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import FileUploadComponent from '../../../modules/filepond/FileUploadComponent';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {updateProfile} from '../../../services/userManagement/UserService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useDispatch} from 'react-redux';
import {UPDATE_AUTH_USER} from '../../../redux/types/actions/Auth.actions';
import {getCommonAuthUserObject} from '../../../redux/actions';

const PREFIX = 'UserInfoEditPopup';

const classes = {
  ProfileImage: `${PREFIX}-ProfileImage`,
};

const StyledHookFormMuiModal = styled(HookFormMuiModal)({
  [`& .${classes.ProfileImage}`]: {
    height: '200px',
    width: '200px',
  },
});

interface UserInfoEditPopupProps {
  onClose: () => void;
}

const UserInfoEditPopup: FC<UserInfoEditPopupProps> = ({...props}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {updateSuccessMessage} = useSuccessMessage();
  const authUser = useAuthUser();
  const dispatch = useDispatch();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name_en: yup
        .string()
        .title('en')
        .label(messages['common.name_en'] as string),
      name: yup
        .string()
        .title()
        .label(messages['common.name'] as string),
    });
  }, [messages]);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (authUser) {
      reset({
        name: authUser?.name,
        name_en: authUser?.displayName,
        profile_pic: authUser?.profile_pic,
      });
    }
  }, [authUser]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (authUser?.userId) {
        const userId: number = Number(authUser?.userId);
        await updateProfile(userId, data);
        updateSuccessMessage('user.label');
        data.displayName = data.name_en;
        data.user_id = userId;
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: getCommonAuthUserObject({...authUser, ...data}),
        });
        props.onClose();
      }
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <StyledHookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconUser />
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
          <SubmitButton isSubmitting={isSubmitting} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <FileUploadComponent
            id='profile_pic'
            defaultFileUrl={authUser?.profile_pic}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.profile_picture_upload']}
            required={false}
            acceptedFileTypes={['image/*']}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='name'
            label={messages['common.name']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='name_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </StyledHookFormMuiModal>
  );
};

export default UserInfoEditPopup;
