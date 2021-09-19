import yup from '../../../@softbd/libs/yup';
import {Grid} from '@material-ui/core';
import {
  createTrainer,
  updateTrainer,
} from '../../../services/instituteManagement/TrainerService';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {
  getMomentDateFormat,
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import IconTrainer from '../../../@softbd/icons/IconTrainer';
import {genders} from '../../../@softbd/utilities/helpers';
import {religions} from '../../../@softbd/utilities/helpers';
import {marital_status} from '../../../@softbd/utilities/helpers';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';

import {
  useFetchBranches,
  useFetchInstitutes,
  useFetchTrainer,
  useFetchTrainingCenters,
} from '../../../services/instituteManagement/hooks';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {
  filterUpazilasByDistrictId,
  filterDistrictsByDivisionId,
} from '../../../services/locationManagement/locationUtils';

interface TrainerAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  trainer_name_en: '',
  trainer_name_bn: '',
  institute_id: '',
  branch_id: '',
  training_center_id: '',
  trainer_registration_number: '',
  email: '',
  mobile: '',
  about_me: '',
  gender: '',
  marital_status: '',
  religion: '',
  nationality: '',
  nid: '',
  passport_number: '',
  present_address_division_id: '',
  present_address_district_id: '',
  present_address_upazila_id: '',
  permanent_address_division_id: '',
  permanent_address_district_id: '',
  permanent_address_upazila_id: '',
  present_house_address: '',
  permanent_house_address: '',
  educational_qualification: '',
  skills: '',
  date_of_birth: '',
  row_status: '1',
};

const TrainerAddEditPopup: FC<TrainerAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      trainer_name_en: yup
        .string()
        .title('en')
        .label(messages['common.title_en'] as string),
      trainer_name_bn: yup
        .string()
        .title('bn')
        .label(messages['common.title_bn'] as string),
      mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      email: yup
        .string()
        .required()
        .email()
        .label(messages['common.email'] as string),
      institute_id: yup
        .string()
        .trim()
        .required()
        .label(messages['institute.label'] as string),
      nationality: yup
        .string()
        .trim()
        .required()
        .label(messages['common.nationality'] as string),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const {
    data: itemData,
    isLoading: isLoading,
    mutate: mutateTrainer,
  } = useFetchTrainer(itemId);

  const [filters] = useState({});
  const {data: divisions, isLoading: isLoadingDivisions}: any =
    useFetchDivisions(filters);

  const [districtsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: districts} = useFetchDistricts(districtsFilter);

  const [upazilasFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: upazilas} = useFetchUpazilas(upazilasFilter);

  const [presentDistricts, setPresentDistricts] = useState<
    Array<District> | []
  >([]);
  const [permanentDistricts, setPermanentDistricts] = useState<
    Array<District> | []
  >([]);
  const [presentUpazilas, setPresentUpazilas] = useState<Array<Upazila> | []>(
    [],
  );
  const [permanentUpazilas, setPermanentUpazilas] = useState<
    Array<Upazila> | []
  >([]);
  const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: institutes, isLoading: isLoadingInstitutes} =
    useFetchInstitutes(instituteFilters);

  const [branchFilters, setBranchFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: branches, isLoading: isLoadingBranches} =
    useFetchBranches(branchFilters);

  const [trainingCenterFilters, setTrainingCenterFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: trainingCenters, isLoading: isLoadingTrainingCenters} =
    useFetchTrainingCenters(trainingCenterFilters);

  useEffect(() => {
    if (itemData) {
      reset({
        trainer_name_en: itemData?.trainer_name_en,
        trainer_name_bn: itemData?.trainer_name_bn,
        institute_id: itemData?.institute_id,
        branch_id: itemData?.branch_id,
        training_center_id: itemData?.training_center_id,
        trainer_registration_number: itemData?.trainer_registration_number,
        email: itemData?.email,
        mobile: itemData?.mobile,
        about_me: itemData?.about_me,
        gender: itemData?.gender,
        marital_status: itemData?.marital_status,
        religion: itemData?.religion,
        date_of_birth: itemData?.date_of_birth
          ? getMomentDateFormat(itemData.date_of_birth, 'YYYY-MM-DD')
          : '',
        nationality: itemData?.nationality,
        nid: itemData?.nid,
        passport_number: itemData?.passport_number,
        present_address_division_id: itemData?.present_address_division_id,
        present_address_district_id: itemData?.present_address_district_id,
        present_address_upazila_id: itemData?.present_address_upazila_id,
        permanent_address_division_id: itemData?.permanent_address_division_id,
        permanent_address_district_id: itemData?.permanent_address_district_id,
        permanent_address_upazila_id: itemData?.permanent_address_upazila_id,
        present_house_address: itemData?.present_house_address,
        permanent_house_address: itemData?.permanent_house_address,
        educational_qualification: itemData?.educational_qualification,
        skills: itemData?.skills,
        row_status: String(itemData?.row_status),
      });

      let presentDistrict = filterDistrictsByDivisionId(
        districts,
        itemData?.present_address_division_id,
      );

      setPresentDistricts(presentDistrict);

      let permanentDistrict = filterDistrictsByDivisionId(
        districts,
        itemData?.permanent_address_division_id,
      );
      setPermanentDistricts(permanentDistrict);

      let presentUpazila = filterUpazilasByDistrictId(
        upazilas,
        itemData?.present_address_district_id,
      );
      setPresentUpazilas(presentUpazila);

      let permanentUpazila = filterUpazilasByDistrictId(
        upazilas,
        itemData?.permanent_address_district_id,
      );
      setPermanentUpazilas(permanentUpazila);
    } else {
      reset(initialValues);
    }
  }, [itemData, districts, upazilas]);

  const onPresentDivisionChange = useCallback(
    (divisionId: number) => {
      let presentDistrict = filterDistrictsByDivisionId(districts, divisionId);
      setPresentDistricts(presentDistrict);
    },
    [districts],
  );

  const onPermanentDivisionChange = useCallback(
    (divisionId: number) => {
      let permanentDistrict = filterDistrictsByDivisionId(
        districts,
        divisionId,
      );
      setPermanentDistricts(permanentDistrict);
    },
    [districts],
  );

  const onPresentDistrictChange = useCallback(
    (districtId: number) => {
      console.log('upazilas', upazilas);
      let presentUpazila = filterUpazilasByDistrictId(upazilas, districtId);
      setPresentUpazilas(presentUpazila);
    },
    [upazilas],
  );

  const onPermanentDistrictChange = useCallback(
    (districtId: number) => {
      let permanentUpazila = filterUpazilasByDistrictId(upazilas, districtId);
      setPermanentUpazilas(permanentUpazila);
    },
    [upazilas],
  );

  const onInstituteChange = useCallback((instituteId: number) => {
    setBranchFilters({
      row_status: RowStatus.ACTIVE,
      institute_id: instituteId,
    });
  }, []);

  const onBranchChange = useCallback((branchId: number) => {
    setTrainingCenterFilters({
      row_status: RowStatus.ACTIVE,
      branch_id: branchId,
    });
  }, []);

  const onSubmit: SubmitHandler<Trainer> = async (data: Trainer) => {
    const response = itemId
      ? await updateTrainer(itemId, data)
      : await createTrainer(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='trainers.label' />}}
        />,
      );
      mutateTrainer();
      props.onClose();
      refreshDataTable();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='trainers.label' />}}
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
          <IconTrainer />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='trainers.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='trainers.label' />}}
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
          <CustomTextInput
            id='trainer_name_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='trainer_name_bn'
            label={messages['common.title_bn']}
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
            id='about_me'
            label={messages['common.about_me']}
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
          <CustomDateTimeField
            id='date_of_birth'
            label={messages['common.date_of_birth']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='present_house_address'
            label={messages['common.present_house_address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='permanent_house_address'
            label={messages['common.permanent_house_address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='present_address_division_id'
            label={messages['common.division_title_present_address']}
            isLoading={isLoadingDivisions}
            control={control}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={onPresentDivisionChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='permanent_address_division_id'
            label={messages['common.division_title_permanent_address']}
            isLoading={isLoadingDivisions}
            control={control}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={onPermanentDivisionChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='present_address_district_id'
            label={messages['common.district_title_present_address']}
            isLoading={isLoading}
            control={control}
            options={presentDistricts}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={onPresentDistrictChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='permanent_address_district_id'
            label={messages['common.district_title_permanent_address']}
            control={control}
            options={permanentDistricts}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            isLoading={isLoading}
            onChange={onPermanentDistrictChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='present_address_upazila_id'
            label={messages['common.upazila_title_present_address']}
            isLoading={isLoading}
            control={control}
            options={presentUpazilas}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='permanent_address_upazila_id'
            label={messages['common.upazila_title_permanent_address']}
            isLoading={isLoading}
            control={control}
            options={permanentUpazilas}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='gender'
            label={messages['common.gender']}
            isLoading={isLoading}
            control={control}
            options={genders}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='religion'
            label={messages['common.religion']}
            isLoading={isLoading}
            control={control}
            options={religions}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='marital_status'
            label={messages['common.marital_status']}
            isLoading={isLoading}
            control={control}
            options={marital_status}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='nid'
            label={messages['common.nid']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='educational_qualification'
            label={messages['common.educational_qualification']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='trainer_registration_number'
            label={messages['common.registration_number']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='skills'
            label={messages['menu.skill']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='passport_number'
            label={messages['common.passport_number']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='institute_id'
            label={messages['institute.label']}
            isLoading={isLoadingInstitutes}
            control={control}
            options={institutes}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={onInstituteChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='branch_id'
            label={messages['branch.label']}
            isLoading={isLoadingBranches}
            control={control}
            options={branches}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={onBranchChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='training_center_id'
            label={messages['menu.training_center']}
            isLoading={isLoadingTrainingCenters}
            control={control}
            options={trainingCenters}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='nationality'
            label={messages['common.nationality']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
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
export default TrainerAddEditPopup;