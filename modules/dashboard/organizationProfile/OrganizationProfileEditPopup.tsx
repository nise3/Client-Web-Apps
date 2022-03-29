import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid, Typography} from '@mui/material';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CustomFieldArray from '../../../@softbd/elements/input/CustomFieldArray';
import {updateOrganizationProfile} from '../../../services/organaizationManagement/OrganizationService';
import {useFetchOrganizationProfile} from '../../../services/organaizationManagement/hooks';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {District, Upazila} from '../../../shared/Interface/location.interface';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {
  getMobilePhoneValidationSchema,
  getObjectArrayFromValueArray,
  getValuesFromObjectArray,
} from '../../../@softbd/utilities/helpers';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  MOBILE_NUMBER_REGEX,
  PHONE_NUMBER_REGEX,
} from '../../../@softbd/common/patternRegex';

interface OrganizationProfileEditPopupProps {
  onClose: () => void;
}

const OrganizationProfileEditPopup: FC<OrganizationProfileEditPopupProps> = ({
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const [profileFilter] = useState({});
  const {updateSuccessMessage} = useSuccessMessage();
  const [divisionsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [districtsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [upazilasFilter] = useState({row_status: RowStatus.ACTIVE});

  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchDivisions(divisionsFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);

  const [districtsList, setDistrictsList] = useState<Array<District> | []>([]);
  const [upazilasList, setUpazilasList] = useState<Array<Upazila> | []>([]);

  const {data: profileData, isLoading} =
    useFetchOrganizationProfile(profileFilter);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.organization_name'] as string),
      name_of_the_office_head: yup
        .string()
        .trim()
        .required()
        .label(messages['association.head_of_office_or_chairman'] as string),
      phone_numbers: yup
        .array()
        .of(
          getMobilePhoneValidationSchema(
            yup,
            PHONE_NUMBER_REGEX,
            messages['common.invalid_phone'],
          ),
        ),
      mobile_numbers: yup
        .array()
        .of(
          getMobilePhoneValidationSchema(
            yup,
            MOBILE_NUMBER_REGEX,
            messages['common.invalid_mobile'],
          ),
        ),
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
        .label(messages['common.organization_address'] as string),
      loc_district_id: yup
        .string()
        .trim()
        .required()
        .label(messages['divisions.label'] as string),
      loc_division_id: yup
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
    reset,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    reset({
      title: profileData?.title,
      loc_division_id: profileData?.loc_division_id,
      loc_district_id: profileData?.loc_district_id,
      loc_upazila_id: profileData?.loc_upazila_id,
      address: profileData?.address,
      name_of_the_office_head: profileData?.name_of_the_office_head,
      name_of_the_office_head_designation:
        profileData?.name_of_the_office_head_designation,
      contact_person_name: profileData?.contact_person_name,
      contact_person_designation: profileData?.contact_person_designation,
      phone_numbers: getObjectArrayFromValueArray(profileData?.phone_numbers),
      mobile_numbers: getObjectArrayFromValueArray(profileData?.mobile_numbers),
    });

    setDistrictsList(
      filterDistrictsByDivisionId(districts, profileData?.loc_division_id),
    );
    setUpazilasList(
      filterUpazilasByDistrictId(upazilas, profileData?.loc_district_id),
    );
  }, [profileData, districts, upazilas]);

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
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      console.log('submit->', data);
      data.phone_numbers = getValuesFromObjectArray(data.phone_numbers);
      data.mobile_numbers = getValuesFromObjectArray(data.mobile_numbers);
      await updateOrganizationProfile(data);
      updateSuccessMessage('common.profile');
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
            {messages['common.organization_info']}
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
            isLoading={isLoading}
            label={messages['common.organization_name']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFormSelect
            required
            id='loc_division_id'
            label={messages['divisions.label']}
            isLoading={isLoadingDivisions}
            control={control}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={changeDivisionAction}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFormSelect
            required
            id='loc_district_id'
            label={messages['districts.label']}
            isLoading={isLoadingDistricts}
            control={control}
            options={districtsList}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={changeDistrictAction}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            id='loc_upazila_id'
            label={messages['upazilas.label']}
            isLoading={isLoadingUpazilas}
            control={control}
            options={upazilasList}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFieldArray
            id='phone_numbers'
            labelLanguageId={'common.phone'}
            control={control}
            register={register}
            errors={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item container xs={12} md={6} alignSelf='flex-start'>
          <CustomFieldArray
            id='mobile_numbers'
            labelLanguageId={'common.mobile'}
            control={control}
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='name_of_the_office_head'
            label={messages['association.head_of_office_or_chairman']}
            register={register}
            isLoading={isLoading}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='name_of_the_office_head_designation'
            label={messages['association.designation']}
            register={register}
            isLoading={isLoading}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextInput
            required
            id='address'
            label={messages['common.organization_address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
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
            isLoading={isLoading}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='contact_person_designation'
            label={messages['common.contact_person_designation']}
            register={register}
            isLoading={isLoading}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default OrganizationProfileEditPopup;
