import {Grid, Typography} from '@mui/material';
import {
  createInstitute,
  updateInstitute,
} from '../../../services/instituteManagement/InstituteService';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  MOBILE_NUMBER_REGEX,
  PHONE_NUMBER_REGEX,
} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {
  getObjectArrayFromValueArray,
  getValuesFromObjectArray,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CustomFieldArray from '../../../@softbd/elements/input/CustomFieldArray';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {useFetchInstitute} from '../../../services/instituteManagement/hooks';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import yup from '../../../@softbd/libs/yup';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  useFetchPermissionGroups,
  useFetchPermissionSubGroups,
} from '../../../services/userManagement/hooks';
import {PERMISSION_GROUP_CERTIFICATE_AUTHORITY_KEY} from '../../../@softbd/common/constants';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {IInstitute} from '../../../shared/Interface/institute.interface';
import {District, Upazila} from '../../../shared/Interface/location.interface';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {InstituteServiceTypes} from '../../../@softbd/utilities/InstituteServiceTypes';
import {InstituteTypes} from '../../../@softbd/utilities/InstituteTypes';

interface InstituteAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  institute_type_id: InstituteTypes.GOVERNMENT,
  service_type: InstituteServiceTypes.CERTIFICATE,
  code: '',
  address: '',
  primary_phone: '',
  phone_numbers: [{value: ''}],
  primary_mobile: '',
  mobile_numbers: [{value: ''}],
  permission_sub_group_id: '',
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  google_map_src: '',
  email: '',
  row_status: '1',
  name_of_the_office_head: '',
  name_of_the_office_head_en: '',
  name_of_the_office_head_designation: '',
  name_of_the_office_head_designation_en: '',
  contact_person_name: '',
  contact_person_name_en: '',
  contact_person_designation: '',
  contact_person_designation_en: '',
  contact_person_email: '',
  contact_person_mobile: '',
};

const CertificateAuthorityAddEditPopup: FC<InstituteAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const instituteTypes = useMemo(
    () => [
      {
        key: InstituteTypes.GOVERNMENT,
        label: messages['common.government'],
      },
      {
        key: InstituteTypes.NON_GOVERNMENT,
        label: messages['common.non_government'],
      },
    ],
    [messages],
  );

  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateInstitute,
  } = useFetchInstitute(itemId);

  const [permissionGroupFilters] = useState({
    row_status: RowStatus.ACTIVE,
    key: PERMISSION_GROUP_CERTIFICATE_AUTHORITY_KEY,
  });

  const [permissionSubGroupFilters, setPermissionSubGroupFilters] =
    useState<any>(null);

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

  const {data: permissionGroups} = useFetchPermissionGroups(
    permissionGroupFilters,
  );

  const {data: permissionSubGroups, isLoading: isLoadingPermissionSubGroups} =
    useFetchPermissionSubGroups(permissionSubGroupFilters);

  const nonRequiredPhoneValidationSchema = useMemo(() => {
    return yup.object().shape({
      value: yup
        .mixed()
        .test(
          'mobile_number_validation',
          messages['common.invalid_mobile'] as string,
          (value) => !value || Boolean(value.match(PHONE_NUMBER_REGEX)),
        ),
    });
  }, [messages]);

  const nonRequiredMobileValidationSchema = useMemo(() => {
    return yup.object().shape({
      value: yup
        .mixed()
        .test(
          'mobile_number_validation',
          messages['common.invalid_phone'] as string,
          (value) => !value || Boolean(value.match(MOBILE_NUMBER_REGEX)),
        ),
    });
  }, [messages]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      institute_type_id: yup
        .string()
        .trim()
        .required()
        .label(messages['institute.type'] as string),
      phone_numbers: yup.array().of(nonRequiredPhoneValidationSchema),
      primary_mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      mobile_numbers: yup.array().of(nonRequiredMobileValidationSchema),
      address: yup
        .string()
        .trim()
        .required()
        .label(messages['common.address'] as string),
      code: yup
        .string()
        .trim()
        .required()
        .label(messages['common.code'] as string),
      email: yup
        .string()
        .required()
        .email()
        .label(messages['common.email'] as string),
      permission_sub_group_id: isEdit
        ? yup.string().nullable()
        : yup
            .string()
            .required()
            .label(messages['permission_sub_group.label'] as string),
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
      contact_person_mobile: yup
        .string()
        .trim()
        .matches(MOBILE_NUMBER_REGEX)
        .required()
        .label(messages['common.contact_person_mobile'] as string),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (!isEdit && permissionGroups && permissionGroups.length > 0) {
      setPermissionSubGroupFilters({
        permission_group_id: permissionGroups[0]?.id,
        row_status: RowStatus.ACTIVE,
      });
    }
  }, [isEdit, permissionGroups]);

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        // domain: itemData?.domain,
        institute_type_id: itemData?.institute_type_id,
        service_type: itemData?.service_type,
        code: itemData?.code,
        primary_phone: itemData?.primary_phone,
        phone_numbers: getObjectArrayFromValueArray(itemData?.phone_numbers),
        primary_mobile: itemData?.primary_mobile,
        mobile_numbers: getObjectArrayFromValueArray(itemData?.mobile_numbers),
        loc_division_id: itemData?.loc_division_id,
        loc_district_id: itemData?.loc_district_id,
        loc_upazila_id: itemData?.loc_upazila_id,
        address: itemData?.address,
        google_map_src: itemData?.google_map_src,
        email: itemData?.email,
        name_of_the_office_head: itemData?.name_of_the_office_head,
        name_of_the_office_head_en: itemData?.name_of_the_office_head_en,
        name_of_the_office_head_designation:
          itemData?.name_of_the_office_head_designation,
        name_of_the_office_head_designation_en:
          itemData?.name_of_the_office_head_designation_en,
        contact_person_name: itemData?.contact_person_name,
        contact_person_name_en: itemData?.contact_person_name_en,
        contact_person_designation: itemData?.contact_person_designation,
        contact_person_designation_en: itemData?.contact_person_designation_en,
        contact_person_email: itemData?.contact_person_email,
        contact_person_mobile: itemData?.contact_person_mobile,
        row_status: String(itemData?.row_status),
      });

      setDistrictsList(
        filterDistrictsByDivisionId(districts, itemData?.loc_division_id),
      );
      setUpazilasList(
        filterUpazilasByDistrictId(upazilas, itemData?.loc_district_id),
      );
    } else {
      reset(initialValues);
    }
  }, [itemData, districts, upazilas]);

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

  const onSubmit: SubmitHandler<IInstitute> = async (data: IInstitute) => {
    try {
      data.phone_numbers = getValuesFromObjectArray(data.phone_numbers);
      data.mobile_numbers = getValuesFromObjectArray(data.mobile_numbers);
      data.service_type = InstituteServiceTypes.CERTIFICATE;

      if (itemId) {
        await updateInstitute(itemId, data);
        updateSuccessMessage('certificate_authority.label');
        mutateInstitute();
      } else {
        await createInstitute(data);
        createSuccessMessage('certificate_authority.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconInstitute />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{
                subject: <IntlMessages id='certificate_authority.label' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='certificate_authority.label' />,
              }}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container md={12} spacing={4}>
            <Grid item xs={12} md={isEdit ? 12 : 6}>
              <CustomTextInput
                required
                id='title'
                label={messages['common.title']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='title_en'
                label={messages['common.title_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='example@gmail.com'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='code'
                label={messages['common.code']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            {!isEdit && (
              <Grid item xs={12} md={6}>
                <CustomFormSelect
                  required
                  id='permission_sub_group_id'
                  label={messages['permission_sub_group.label']}
                  isLoading={isLoadingPermissionSubGroups}
                  control={control}
                  options={permissionSubGroups}
                  optionValueProp='id'
                  optionTitleProp={['title_en', 'title']}
                  errorInstance={errors}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <FormRadioButtons
                id='institute_type_id'
                label={'institute.type'}
                radios={instituteTypes}
                control={control}
                defaultValue={initialValues.institute_type_id}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='primary_phone'
                label={messages['common.phone']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='xxx-xxx-xxxx'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='primary_mobile'
                label={messages['common.mobile']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='017xxxxxxxx'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFieldArray
                id='phone_numbers'
                labelLanguageId={'common.phone'}
                isLoading={isLoading}
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFieldArray
                id='mobile_numbers'
                labelLanguageId={'common.mobile'}
                isLoading={isLoading}
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='address'
                label={messages['common.address']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
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
              <CustomTextInput
                required
                id='name_of_the_office_head'
                label={messages['institute.name_of_the_office_head']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='name_of_the_office_head_en'
                label={messages['institute.name_of_the_office_head_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='name_of_the_office_head_designation'
                label={
                  messages['institute.name_of_the_office_head_designation']
                }
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='name_of_the_office_head_designation_en'
                label={
                  messages['institute.name_of_the_office_head_designation_en']
                }
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='google_map_src'
                label={messages['common.google_map_src']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container md={12} spacing={4}>
            <Grid item md={12} xs={12}>
              <Typography variant='h6'>
                {messages['common.contact_person_info']}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_name'
                label={messages['common.contact_person_name']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_name_en'
                label={messages['common.contact_person_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_designation'
                label={messages['common.contact_person_designation']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_designation_en'
                label={messages['common.contact_person_designation_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_email'
                label={messages['common.contact_person_email']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='example@gmail.com'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_mobile'
                label={messages['common.contact_person_mobile']}
                register={register}
                errorInstance={errors}
                helperText={messages['common.registration_username_note']}
                isLoading={isLoading}
                placeholder='017xxxxxxxx'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default CertificateAuthorityAddEditPopup;
