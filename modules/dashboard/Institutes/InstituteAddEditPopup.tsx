import {Grid} from '@mui/material';
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
  DOMAIN_REGEX,
  MOBILE_NUMBER_REGEX,
} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {
  getObjectArrayFromValueArray,
  getValuesFromObjectArray,
  isResponseSuccess,
  isValidationError,
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
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  useFetchPermissionGroups,
  useFetchPermissionSubGroups,
} from '../../../services/userManagement/hooks';
import {PERMISSION_GROUP_INSTITUTE_KEY} from '../../../@softbd/common/constants';

interface InstituteAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  domain: '',
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
};

const InstituteAddEditPopup: FC<InstituteAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateInstitute,
  } = useFetchInstitute(itemId);
  const [permissionGroupFilters] = useState({
    row_status: RowStatus.ACTIVE,
    key: PERMISSION_GROUP_INSTITUTE_KEY,
  });

  const [permissionSubGroupFilters, setPermissionSubGroupFilters] =
    useState<any>({
      row_status: RowStatus.ACTIVE,
    });

  const [divisionsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [districtsFilter] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const [upazilasFilter] = useState({
    row_status: RowStatus.ACTIVE,
  });

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

  const nonRequiredValidationSchema = useMemo(() => {
    return yup.object().shape(
      {
        value: yup
          .string()
          .nullable()
          .notRequired()
          .when('value', {
            is: (value: any) => value && value.length > 0,
            then: (rule: any) =>
              rule
                .matches(MOBILE_NUMBER_REGEX)
                .label(messages['common.phone'] as string),
          }),
      },
      [['value', 'value']],
    );
  }, [messages]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title_en: yup
        .string()
        .title('en')
        .label(messages['common.title_en'] as string),
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      domain: yup
        .string()
        .trim()
        .required()
        .matches(DOMAIN_REGEX)
        .label(messages['common.domain'] as string),
      code: yup
        .string()
        .required()
        .label(messages['common.code'] as string),
      primary_phone: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.phone'] as string),
      phone_numbers: yup.array().of(nonRequiredValidationSchema),
      primary_mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      mobile_numbers: yup.array().of(nonRequiredValidationSchema),
      address: yup
        .string()
        .trim()
        .required()
        .label(messages['common.address'] as string),
      google_map_src: yup.string(),
      email: yup
        .string()
        .required()
        .email()
        .label(messages['common.email'] as string),
      permission_sub_group_id: yup
        .string()
        .required()
        .label(messages['permission_sub_group.label'] as string),
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
      loc_upazila_id: yup
        .string()
        .trim()
        .required()
        .label(messages['upazilas.label'] as string),
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
    if (permissionGroups && permissionGroups.length > 0) {
      setPermissionSubGroupFilters({
        permission_group_id: permissionGroups[0]?.id,
        row_status: RowStatus.ACTIVE,
      });
    }
  }, [permissionGroups]);

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        domain: itemData?.domain,
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

  const onSubmit: SubmitHandler<Institute> = async (data: Institute) => {
    data.phone_numbers = getValuesFromObjectArray(data.phone_numbers);
    data.mobile_numbers = getValuesFromObjectArray(data.mobile_numbers);

    const response = itemId
      ? await updateInstitute(itemId, data)
      : await createInstitute(data);

    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='institute.label' />}}
        />,
      );
      mutateInstitute();
      props.onClose();
      refreshDataTable();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='institute.label' />}}
        />,
      );
      props.onClose();
      refreshDataTable();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
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
              values={{subject: <IntlMessages id='institute.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='institute.label' />}}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
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
                id='email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
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
            <Grid item xs={12}>
              <CustomTextInput
                id='primary_phone'
                label={messages['common.phone']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item container xs={12}>
              <CustomFieldArray
                id='phone_numbers'
                labelLanguageId={'common.phone'}
                isLoading={isLoading}
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='address'
                label={messages['common.address']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
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
            <Grid item xs={12}>
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
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextInput
                id='title'
                label={messages['common.title']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='code'
                label={messages['common.code']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='domain'
                label={messages['common.domain']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='primary_mobile'
                label={messages['common.mobile']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item container xs={12}>
              <CustomFieldArray
                id='mobile_numbers'
                labelLanguageId={'common.mobile'}
                isLoading={isLoading}
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
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
            <Grid item xs={12}>
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
export default InstituteAddEditPopup;
