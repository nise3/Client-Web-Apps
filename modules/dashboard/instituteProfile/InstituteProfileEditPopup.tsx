import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Grid, Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useIntl} from 'react-intl';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import yup from '../../../@softbd/libs/yup';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {useFetchInstituteProfile} from '../../../services/instituteManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {District, Upazila} from '../../../shared/Interface/location.interface';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import {updateInstituteProfile} from '../../../services/instituteManagement/InstituteService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  FORM_PLACEHOLDER,
  isLatLongValid,
} from '../../../@softbd/common/constants';

interface InstituteProfileEditPopupProps {
  onClose: () => void;
}

const InstituteProfileEditPopup: FC<InstituteProfileEditPopupProps> = ({
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {updateSuccessMessage} = useSuccessMessage();

  const {data: profileData, mutate: mutateProfile} = useFetchInstituteProfile();

  const [divisionsFilter] = useState({});
  const [districtsFilter] = useState({});
  const [upazilasFilter] = useState({});

  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchDivisions(divisionsFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);
  const [districtsList, setDistrictsList] = useState<Array<District> | []>([]);
  const [upazilasList, setUpazilasList] = useState<Array<Upazila> | []>([]);

  const changeDivisionAction = useCallback(
    (divisionId: number) => {
      setDistrictsList(filterDistrictsByDivisionId(districts, divisionId));
      setUpazilasList([]);
    },
    [districts],
  );

  const changeDistrictAction = useCallback(
    (districtId: number) => {
      setUpazilasList(filterUpazilasByDistrictId(upazilas, districtId));
    },
    [upazilas],
  );

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      address: yup
        .string()
        .trim()
        .required()
        .label(messages['common.address'] as string),
      email: yup
        .string()
        .required()
        .email()
        .label(messages['common.email'] as string),
      name_of_the_office_head: yup
        .string()
        .trim()
        .required()
        .label(messages['institute.name_of_the_office_head'] as string),
      name_of_the_office_head_designation: yup
        .string()
        .trim()
        .required()
        .label(
          messages['institute.name_of_the_office_head_designation'] as string,
        ),
      contact_person_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_name'] as string),
      contact_person_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_designation'] as string),
      contact_person_email: yup
        .string()
        .trim()
        .required()
        .email()
        .label(messages['common.contact_person_email'] as string),
      loc_division_id: yup
        .string()
        .trim()
        .required()
        .label(messages['divisions.label'] as string),
      loc_district_id: yup
        .string()
        .trim()
        .required()
        .label(messages['districts.label'] as string),
      location_latitude: yup
        .string()
        .nullable()
        .test(
          'lat-err',
          `${messages['common.location_latitude']} ${messages['common.not_valid']}`,
          (value) => isLatLongValid(value as string),
        ),
      location_longitude: yup
        .string()
        .nullable()
        .test(
          'long-err',
          `${messages['common.location_longitude']} ${messages['common.not_valid']}`,
          (value) => isLatLongValid(value as string),
        ),
    });
  }, [messages]);

  const {
    control,
    reset,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    if (profileData) {
      reset({
        title_en: profileData?.title_en,
        title: profileData?.title,
        email: profileData?.email,
        loc_division_id: profileData?.loc_division_id,
        loc_district_id: profileData?.loc_district_id,
        loc_upazila_id: profileData?.loc_upazila_id,
        address: profileData?.address,
        google_map_src: profileData?.google_map_src,
        name_of_the_office_head: profileData?.name_of_the_office_head,
        name_of_the_office_head_en: profileData?.name_of_the_office_head_en,
        name_of_the_office_head_designation:
          profileData?.name_of_the_office_head_designation,
        name_of_the_office_head_designation_en:
          profileData?.name_of_the_office_head_designation_en,
        contact_person_name: profileData?.contact_person_name,
        contact_person_name_en: profileData?.contact_person_name_en,
        contact_person_designation: profileData?.contact_person_designation,
        contact_person_designation_en:
          profileData?.contact_person_designation_en,
        contact_person_email: profileData?.contact_person_email,
        /*row_status: String(profileData?.row_status),*/
        logo: profileData?.logo,
      });
    }

    setDistrictsList(
      filterDistrictsByDivisionId(districts, profileData?.loc_division_id),
    );
    setUpazilasList(
      filterUpazilasByDistrictId(upazilas, profileData?.loc_district_id),
    );
  }, [profileData, districts, upazilas]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await updateInstituteProfile(data);
      updateSuccessMessage('institute_profile.label');
      mutateProfile();
      props.onClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
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
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
        </>
      }>
      <Grid container spacing={3} sx={{overflow: 'hidden'}}>
        <Grid item xs={12}>
          <Typography variant={'h6'}>
            {messages['common.institute_information']}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FileUploadComponent
            id='logo'
            defaultFileUrl={profileData?.logo}
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
            label={messages['common.institute_name_bn']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='title_en'
            label={messages['common.institute_name_en']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            placeholder='example@gmail.com'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='loc_division_id'
            isLoading={isLoadingDivisions}
            label={messages['divisions.label']}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
            onChange={changeDivisionAction}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            isLoading={isLoadingDistricts}
            id='loc_district_id'
            label={messages['districts.label']}
            options={districtsList}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
            onChange={changeDistrictAction}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            isLoading={isLoadingUpazilas}
            id='loc_upazila_id'
            label={messages['upazilas.label']}
            options={upazilasList}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='address_en'
            label={messages['common.address_en']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='location_latitude'
            label={messages['common.location_latitude']}
            register={register}
            errorInstance={errors}
            placeholder={FORM_PLACEHOLDER.LATITUDE}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='location_longitude'
            label={messages['common.location_longitude']}
            register={register}
            errorInstance={errors}
            placeholder={FORM_PLACEHOLDER.LONGITUDE}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='google_map_src'
            label={messages['common.google_map_src']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_of_the_office_head'
            label={messages['common.name_of_the_office_head']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_of_the_office_head_en '
            label={messages['common.name_of_the_office_head_en']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_of_the_office_head_designation'
            label={messages['common.name_of_the_office_head_designation']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_of_the_office_head_designation_en'
            label={messages['common.name_of_the_office_head_designation_en']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} sx={{mb: 3}}>
          <Typography variant={'h6'}>
            {messages['common.contact_person_info']}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='contact_person_name'
            label={messages['common.contact_person_name_bn']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='contact_person_name_en'
            label={messages['common.contact_person_name_en']}
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
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='contact_person_designation_en'
            label={messages['common.contact_person_designation_en']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='contact_person_email'
            label={messages['common.contact_person_email']}
            register={register}
            errorInstance={errors}
            placeholder='example@gmail.com'
          />
        </Grid>
        {/*        <Grid item xs={12} md={6}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={profileData?.row_status}
            isLoading={isLoadingData}
          />
        </Grid>*/}
      </Grid>
    </HookFormMuiModal>
  );
};

export default InstituteProfileEditPopup;
