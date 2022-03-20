import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
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
  objectFilter,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import IconTrainer from '../../../@softbd/icons/IconTrainer';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {ITrainer} from '../../../shared/Interface/institute.interface';
import {District, Upazila} from '../../../shared/Interface/location.interface';

import {useFetchTrainer} from '../../../services/instituteManagement/hooks';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {getAllInstitutes} from '../../../services/instituteManagement/InstituteService';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetchRoles} from '../../../services/userManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomSelectAutoComplete from '../../youth/registration/CustomSelectAutoComplete';
import {useFetchSkills} from '../../../services/youthManagement/hooks';
import {Gender} from '../../industry/enrollment/constants/GenderEnums';
import {getAllBranches} from '../../../services/instituteManagement/BranchService';
import {getAllTrainingCenters} from '../../../services/instituteManagement/TrainingCenterService';
import moment from 'moment';

interface TrainerAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  trainer_name_en: '',
  trainer_name: '',
  institute_id: '',
  branch_id: '',
  training_center_id: '',
  trainer_registration_number: '',
  email: '',
  mobile: '',
  about_me: '',
  about_me_en: '',
  gender: '1',
  marital_status: '0',
  religion: '',
  nationality: '',
  role_id: '',
  nid: '',
  passport_number: '',
  present_address_division_id: '',
  present_address_district_id: '',
  present_address_upazila_id: '',
  permanent_address_division_id: '',
  permanent_address_district_id: '',
  permanent_address_upazila_id: '',
  present_house_address: '',
  present_house_address_en: '',
  permanent_house_address: '',
  permanent_house_address_en: '',
  educational_qualification: '',
  educational_qualification_en: '',
  photo: '',
  signature: '',
  skills: [],
  skills_en: '',
  date_of_birth: '',
  row_status: '1',
};

const TrainerAddEditPopup: FC<TrainerAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const authUser = useAuthUser<CommonAuthUser>();

  const genders = [
    {
      key: Gender.MALE,
      label: messages['common.male'],
    },
    {
      key: Gender.FEMALE,
      label: messages['common.female'],
    },
    {
      key: Gender.OTHERS,
      label: messages['common.others'],
    },
  ];

  const marital_status = [
    {
      key: 0,
      label: messages['common.unmarried'],
    },
    {
      key: 1,
      label: messages['common.marital_status_married'],
    },
  ];

  const religions = [
    {
      id: 1,
      label: messages['common.religion_islam'],
    },
    {
      id: 2,
      label: messages['common.religion_hinduism'],
    },
    {
      id: 3,
      label: messages['common.religion_christianity'],
    },
    {
      id: 4,
      label: messages['common.religion_buddhism'],
    },
    {
      id: 5,
      label: messages['common.notDefined'],
    },
  ];

  const {
    data: itemData,
    isLoading: isLoading,
    mutate: mutateTrainer,
  } = useFetchTrainer(itemId);

  const [filters] = useState({row_status: RowStatus.ACTIVE});
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

  const [branchFilters, setBranchFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });

  const [trainingCenterFilters, setTrainingCenterFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });

  const [institutes, setInstitutes] = useState<Array<any>>([]);
  const [isLoadingInstitutes, setIsLoadingInstitutes] =
    useState<boolean>(false);

  const [branches, setBranches] = useState<Array<any>>([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState<boolean>(false);

  const [trainingCenters, setTrainingCenters] = useState<Array<any>>([]);
  const [isLoadingTrainingCenters, setIsLoadingTrainingCenters] =
    useState<boolean>(false);

  const [roleFilter] = useState({});
  const {data: roles, isLoading: isLoadingRoles} = useFetchRoles(roleFilter);

  const [skillFilter] = useState({});
  const {data: skills, isLoading: isLoadingSkills} =
    useFetchSkills(skillFilter);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      trainer_name: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
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
      gender: yup
        .string()
        .required()
        .label(messages['common.gender'] as string),
      marital_status: yup
        .string()
        .required()
        .label(messages['common.marital_status'] as string),
      skills: yup
        .array()
        .of(yup.object())
        .min(1, messages['common.must_have_one_skill'] as string)
        .label(messages['common.skills'] as string),
      role_id: yup
        .string()
        .trim()
        .required()
        .label(messages['role.label'] as string),
      present_address_division_id: yup
        .string()
        .trim()
        .required()
        .label(messages['common.division_title_present_address'] as string),
      present_address_district_id: yup
        .string()
        .trim()
        .required()
        .label(messages['common.district_title_present_address'] as string),
      institute_id:
        authUser && authUser.isSystemUser
          ? yup
              .string()
              .trim()
              .required()
              .label(messages['institute.label'] as string)
          : yup.string(),
      nationality: yup
        .string()
        .trim()
        .required()
        .label(messages['common.nationality'] as string),
      trainer_registration_number: yup
        .string()
        .trim()
        .required()
        .label(messages['trainer.trainer_registration_number'] as string),
      date_of_birth: yup
        .string()
        .trim()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(messages['common.date_of_birth'] as string)
        .test(
          'DOB',
          messages['common.invalid_date_of_birth'] as string,
          (value) => {
            return moment().diff(moment(value), 'years') >= 13;
          },
        ),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    handleSubmit,
    setError,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<ITrainer>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (authUser?.isSystemUser) {
      (async () => {
        try {
          setIsLoadingInstitutes(true);
          let response = await getAllInstitutes({
            row_status: RowStatus.ACTIVE,
          });
          setIsLoadingInstitutes(false);
          if (response && response?.data) {
            setInstitutes(response.data);
          }
        } catch (e) {}
      })();
    }
  }, []);

  useEffect(() => {
    if (authUser?.institute?.service_type != 2) {
      (async () => {
        try {
          setIsLoadingBranches(true);
          setIsLoadingTrainingCenters(true);
          let branches = await getAllBranches(branchFilters);
          let trainingCenters = await getAllTrainingCenters(
            trainingCenterFilters,
          );

          setIsLoadingBranches(false);
          setIsLoadingTrainingCenters(false);

          if (branches && branches?.data) {
            setBranches(branches.data);
          }
          if (trainingCenters && trainingCenters?.data) {
            setTrainingCenters(trainingCenters.data);
          }
        } catch (e) {}
      })();
    }
  }, [authUser, branchFilters, trainingCenterFilters]);

  useEffect(() => {
    if (itemData) {
      reset({
        trainer_name_en: itemData?.trainer_name_en,
        trainer_name: itemData?.trainer_name,
        institute_id: itemData?.institute_id,
        branch_id: itemData?.branch_id,
        training_center_id: itemData?.training_center_id,
        trainer_registration_number: itemData?.trainer_registration_number,
        email: itemData?.email,
        role_id: itemData?.role_id,
        mobile: itemData?.mobile,
        about_me: itemData?.about_me,
        about_me_en: itemData?.about_me_en,
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
        present_house_address_en: itemData?.present_house_address_en,
        permanent_house_address: itemData?.permanent_house_address,
        permanent_house_address_en: itemData?.permanent_house_address_en,
        educational_qualification: itemData?.educational_qualification,
        educational_qualification_en: itemData?.educational_qualification_en,
        photo: itemData?.photo,
        signature: itemData?.signature,
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
    setBranchFilters(
      instituteId
        ? {
            row_status: RowStatus.ACTIVE,
            institute_id: instituteId,
          }
        : {row_status: RowStatus.ACTIVE},
    );
    setTrainingCenterFilters(
      instituteId
        ? {
            row_status: RowStatus.ACTIVE,
            institute_id: instituteId,
          }
        : {row_status: RowStatus.ACTIVE},
    );
  }, []);

  const onBranchChange = useCallback((branchId: number) => {
    setTrainingCenterFilters((prev: any) => {
      const filter = objectFilter({
        ...prev,
        ...{row_status: RowStatus.ACTIVE, branch_id: branchId},
      });
      return filter;
    });
  }, []);

  const onSubmit: SubmitHandler<ITrainer> = async (data: ITrainer) => {
    try {
      if (!authUser?.isSystemUser) {
        delete data.institute_id;
      }
      let skillIds: any = [];
      (data?.skills || []).map((skill: any) => {
        skillIds.push(skill.id);
      });
      data.skills = skillIds;

      if (itemId) {
        await updateTrainer(itemId, data);
        updateSuccessMessage('trainers.label');
        mutateTrainer();
      } else {
        await createTrainer(data);
        createSuccessMessage('trainers.label');
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
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='trainer_name'
            label={messages['trainer.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='trainer_name_en'
            label={messages['trainer.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id={'role_id'}
            isLoading={isLoadingRoles}
            options={roles}
            control={control}
            label={messages['role.label']}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>

        {!isEdit && (
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
        )}

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='about_me'
            label={messages['common.about_me']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='about_me_en'
            label={messages['common.about_me_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        {!isEdit && (
          <Grid item xs={12} md={6}>
            <CustomTextInput
              required
              id='mobile'
              label={messages['common.mobile']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
              placeholder='017xxxxxxxx'
            />
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            required
            id='date_of_birth'
            label={messages['common.date_of_birth']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='present_house_address'
            label={messages['common.present_house_address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='present_house_address_en'
            label={messages['common.present_house_address_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='permanent_house_address'
            label={messages['common.permanent_house_address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='permanent_house_address_en'
            label={messages['common.permanent_house_address_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='present_address_division_id'
            label={messages['common.division_title_present_address']}
            isLoading={isLoadingDivisions}
            control={control}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onPresentDivisionChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            id='permanent_address_division_id'
            label={messages['common.division_title_permanent_address']}
            isLoading={isLoadingDivisions}
            control={control}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onPermanentDivisionChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='present_address_district_id'
            label={messages['common.district_title_present_address']}
            isLoading={isLoading}
            control={control}
            options={presentDistricts}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onPresentDistrictChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            id='permanent_address_district_id'
            label={messages['common.district_title_permanent_address']}
            control={control}
            options={permanentDistricts}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            isLoading={isLoading}
            onChange={onPermanentDistrictChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            id='present_address_upazila_id'
            label={messages['common.upazila_title_present_address']}
            isLoading={isLoading}
            control={control}
            options={presentUpazilas}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            id='permanent_address_upazila_id'
            label={messages['common.upazila_title_permanent_address']}
            isLoading={isLoading}
            control={control}
            options={permanentUpazilas}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormRadioButtons
            id='gender'
            label={'common.gender'}
            radios={genders}
            control={control}
            defaultValue={initialValues.gender}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <FormRadioButtons
            id='marital_status'
            label={'common.marital_status'}
            radios={marital_status}
            control={control}
            defaultValue={initialValues.marital_status}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='nid'
            label={messages['common.nid']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='educational_qualification'
            label={messages['common.educational_qualification']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='educational_qualification_en'
            label={messages['common.educational_qualification_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='trainer_registration_number'
            label={messages['common.registration_number']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomSelectAutoComplete
            required
            id={'skills'}
            label={messages['common.skills']}
            isLoading={isLoadingSkills}
            options={skills}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='passport_number'
            label={messages['common.passport_number']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        {authUser && authUser.isSystemUser && (
          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              required
              id={'institute_id'}
              isLoading={isLoadingInstitutes}
              options={institutes}
              control={control}
              label={messages['institute.label']}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
              onChange={onInstituteChange}
            />
          </Grid>
        )}

        {authUser?.institute?.service_type != 2 && (
          <>
            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                id='branch_id'
                label={messages['branch.label']}
                isLoading={isLoadingBranches}
                control={control}
                options={branches}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                onChange={onBranchChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                id='training_center_id'
                label={messages['menu.training_center']}
                isLoading={isLoadingTrainingCenters}
                control={control}
                options={trainingCenters}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='nationality'
            label={messages['common.nationality']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='signature'
            defaultFileUrl={itemData?.signature}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.signature']}
            required={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='photo'
            defaultFileUrl={itemData?.photo}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.photo']}
            required={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
