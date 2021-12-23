import React, {FC, useMemo, useState} from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {Grid, Typography} from '@mui/material';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {SubmitHandler, useForm} from 'react-hook-form';
import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useIntl} from 'react-intl';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {useFetchOrganizationTypes} from '../../../services/organaizationManagement/hooks';
import FileUploadComponent from '../../filepond/FileUploadComponent';

interface AssociationProfileEditPopupProps {
  onClose: () => void;
}

const AssociationProfileEditPopup: FC<AssociationProfileEditPopupProps> = ({
  ...props
}) => {
  const {messages} = useIntl();

  const [associationTypesFilter] = useState({});
  const {data: associationTypes, isLoading: associationTypesIsLoading} =
    useFetchOrganizationTypes(associationTypesFilter);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['association.association_name'] as string),
      association_type_id: yup
        .string()
        .trim()
        .required()
        .label(messages['association.association_type'] as string),
      name_of_the_office_head: yup
        .string()
        .trim()
        .required()
        .label(messages['association.head_of_office_or_chairman'] as string),
      trade_no: yup
        .string()
        .trim()
        .required()
        .label(messages['association.trade_no'] as string),
      name_of_the_office_head_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['association.designation'] as string),
      contact_person_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_name_en'] as string),
      address: yup
        .string()
        .trim()
        .required()
        .label(messages['association.association_address'] as string),
      loc_district_id: yup
        .string()
        .trim()
        .required()
        .label(messages['divisions.label'] as string),
      contact_person_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_designation'] as string),
    });
  }, []);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    // setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  // Todo: waiting for api
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log('submit->', data);
    props.onClose();
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IntlMessages
            id='common.edit'
            values={{
              subject: <IntlMessages id='common.profile' />,
            }}
          />
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
        </>
      }>
      <Grid container spacing={3} sx={{overflow: 'hidden'}}>
        <Grid item xs={12}>
          <Typography variant={'h6'}>
            {messages['association.association_information']}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FileUploadComponent
            id='profile_image'
            defaultFileUrl={''}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.image_path']}
            required={false}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['association.association_name']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='association_type_id'
            isLoading={associationTypesIsLoading}
            label={messages['association.association_type']}
            control={control}
            options={associationTypes}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='trade_no'
            label={messages['association.trade_no']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='loc_district_id'
            label={messages['districts.label']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='name_of_the_office_head'
            label={messages['association.head_of_office_or_chairman']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='name_of_the_office_head_designation'
            label={messages['association.designation']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextInput
            required
            id='address'
            label={messages['association.association_address']}
            register={register}
            errorInstance={errors}
            multiline={true}
            rows={3}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant={'h6'}>
            {messages['common.userInfoText']}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='contact_person_name'
            label={messages['common.contact_person_name_bn']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='contact_person_designation'
            label={messages['common.contact_person_designation']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default AssociationProfileEditPopup;