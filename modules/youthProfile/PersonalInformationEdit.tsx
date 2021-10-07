import {Avatar, Button, Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  isResponseSuccess,
  isValidationError,
} from '../../@softbd/utilities/helpers';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../@softbd/utilities/validationErrorHandler';
import {
  createRankType,
  updateRankType,
} from '../../services/organaizationManagement/RankTypeService';
import yup from '../../@softbd/libs/yup';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {Card, CardContent} from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import {DialogTitle} from '../../@softbd/modals/CustomMuiModal/CustomMuiModal';

interface PersonalInformationEditProps {
  onClose: () => void;
}

const PersonalInformationEdit: FC<PersonalInformationEditProps> = ({
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      first_name: yup.string().label(messages['common.first_name'] as string),
      middle_name: yup.string().label(messages['common.middle_name'] as string),
      email_address: yup.string().label(messages['common.email'] as string),
      phone_numbers: yup
        .string()
        .label(messages['common.phone_number'] as string),
      skills: yup.string().label(messages['common.skills'] as string),
      districts: yup.string().label(messages['districts.label'] as string),
      division: yup.string().label(messages['divisions.label'] as string),
      upazila: yup.string().label(messages['upazilas.label'] as string),
      post_office: yup.string().label(messages['post_office.label'] as string),
      area: yup.string().label(messages['personal_info.area'] as string),
      road: yup.string().label(messages['personal_info.road'] as string),
      bio: yup.string().label(messages['personal_info.bio'] as string),
    });
  }, [messages]);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    control,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const itemId = 1; //for support now need to change based on authenticated youth
  const [itemData, setItemData] = useState<any>(null);

  useEffect(() => {
    setItemData({
      first_name: 'Jacky',
      middle_name: 'Sons',
      email_address: 'softbdltd@email.com',
      phone_numbers: '01910000000',
      skills: 'skills',
      districts: 'Dhaka',
      division: 'Dhaka',
      upazila: 'Dhaka-up',
      post_office: 'Dhaka-pst',
      area: 'Dhaka-area',
      road: 'Dhaka-road',
      bio: 'This is demo bio',
    });
  }, []);

  useEffect(() => {
    if (itemData) {
      reset({
        first_name: itemData.first_name,
        middle_name: itemData?.middle_name,
        email_address: itemData.email_address,
        phone_numbers: itemData.phone_numbers,
        skills: itemData.skills,
        districts: itemData.description,
        division: itemData.division,
        upazila: itemData.upazila,
        post_office: itemData.post_office,
        area: itemData.area,
        road: itemData.road,
        bio: itemData.bio,
      });
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = itemId
      ? await updateRankType(itemId, data)
      : await createRankType(data);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
      props.onClose();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Grid container justifyContent={'center'} spacing={2}>
      <Grid item>
        <Card>
          <CardContent sx={{position: 'relative'}}>
            <DialogTitle onClose={props.onClose}>
              {messages['personal_info_edit.label']}
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Avatar
                    style={{
                      border: '0.5px solid lightgray',
                    }}
                    alt='Travis Howard'
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMjeeornJdOe6FD8JTzqih-CByVmSWpSD0g&usqp=CAU'
                    sx={{width: 100, height: 100}}
                  />
                </Grid>
                <Grid style={{marginTop: '20px'}} item xs={8}>
                  <input
                    type='file'
                    accept='image*'
                    style={{display: 'none'}}
                    id='contained-button-file'
                  />
                  <label htmlFor='contained-button-file'>
                    <Button
                      variant='contained'
                      color='primary'
                      component='span'>
                      <CloudUploadOutlinedIcon
                        style={{marginRight: '5px', fontSize: 30}}
                      />{' '}
                      Upload new picture
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <CustomTextInput
                    id='first_name'
                    label={messages['common.first_name']}
                    register={register}
                    errorInstance={errors}
                    isLoading={false}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextInput
                    id='middle_name'
                    label={messages['common.middle_name']}
                    register={register}
                    errorInstance={errors}
                    isLoading={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextInput
                    id='email_address'
                    label={messages['common.email']}
                    register={register}
                    errorInstance={errors}
                    isLoading={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextInput
                    id='phone_numbers'
                    label={messages['common.phone_number']}
                    register={register}
                    errorInstance={errors}
                    isLoading={false}
                  />
                </Grid>
                {/*<Grid item xs={12}>
                    <CustomFormSelect
                      id='skills'
                      label={messages['trainers.label']}
                      isLoading={false}
                      control={control}
                      options={skills}
                      optionValueProp='id'
                      optionTitleProp={['title']}
                      errorInstance={errors}
                      multiple={true}
                      defaultValue={initialValues.skills}
                    />
                  </Grid>*/}
                <Grid item xs={6}>
                  <CustomFormSelect
                    id='districts'
                    label={messages['districts.label']}
                    isLoading={false}
                    control={control}
                    optionValueProp={'id'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomFormSelect
                    id='division'
                    label={messages['divisions.label']}
                    isLoading={false}
                    control={control}
                    optionValueProp={'id'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomFormSelect
                    id='upazila'
                    label={messages['upazilas.label']}
                    isLoading={false}
                    control={control}
                    optionValueProp={'id'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomFormSelect
                    id='post_office'
                    label={messages['post_office.label']}
                    isLoading={false}
                    control={control}
                    optionValueProp={'id'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomFormSelect
                    id='area'
                    label={messages['personal_info.area']}
                    isLoading={false}
                    control={control}
                    optionValueProp={'id'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomFormSelect
                    id='road'
                    label={messages['personal_info.road']}
                    isLoading={false}
                    control={control}
                    optionValueProp={'id'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextInput
                    id='bio'
                    label={messages['personal_info.bio']}
                    register={register}
                    errorInstance={errors}
                    isLoading={false}
                    multiline={true}
                    rows={3}
                  />
                </Grid>
                <Grid item xs={8}>
                  <label htmlFor='contained-button-file'>
                    <Button
                      variant='contained'
                      color='primary'
                      component='span'>
                      <CloudUploadOutlinedIcon
                        style={{marginRight: '20px', fontSize: 30}}
                      />{' '}
                      Upload CV
                    </Button>
                  </label>
                  <input
                    type='file'
                    accept='image/pdf/doc/*'
                    style={{display: 'none'}}
                    id='contained-button-file'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={4}>
                    <Grid item>
                      <CancelButton onClick={props.onClose} isLoading={false} />
                    </Grid>
                    <Grid item>
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        isLoading={false}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PersonalInformationEdit;
