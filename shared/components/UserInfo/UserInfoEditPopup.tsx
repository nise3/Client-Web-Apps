import {SubmitHandler, useForm} from 'react-hook-form';
import { styled } from '@mui/material/styles';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import React, {FC, useState} from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import IconUser from '../../../@softbd/icons/IconUser';
import Avatar from '@mui/material/Avatar';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';

const PREFIX = 'UserInfoEditPopup';

const classes = {
  ProfileImage: `${PREFIX}-ProfileImage`
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
  const [profileImage, setProfileImage] = useState<any>(
    '/images/userPageImages/profileImage.jpeg',
  );
  const {messages} = useIntl();


  const imageHandler = (event: any) => {
    console.log(event);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState == 2) {
        setProfileImage(reader.result);
        console.log(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>();

  const isLoading = false;

  const onSubmit: SubmitHandler<any> = async (data: []) => {};

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
          <Avatar className={classes.ProfileImage} src={profileImage} />
          <label htmlFor='contained-button-file'>
            <Button variant='contained' color='primary' component='label'>
              Upload
              <input
                type='file'
                accept='image/*'
                onChange={imageHandler}
                hidden
              />
            </Button>
          </label>
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='title_bn'
            label={messages['common.title_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='username'
            label={messages['user.username']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='mobile'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='role'
            label={messages['role.label']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </StyledHookFormMuiModal>
  );
};

export default UserInfoEditPopup;
