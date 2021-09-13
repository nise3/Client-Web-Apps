import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {
  createTrainer,
  getTrainer,
  updateTrainer,
} from '../../../services/instituteManagement/TrainerService';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_BANGLA,
} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {
  getMomentDateFormat,
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/common/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {getAllDistricts} from '../../../services/locationManagement/DistrictService';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {getAllUpazilas} from '../../../services/locationManagement/UpazilaService';
import {getAllDivisions} from '../../../services/locationManagement/DivisionService';
import IconTrainer from '../../../@softbd/icons/IconTrainer';
import {getAllInstitutes} from '../../../services/instituteManagement/InstituteService';
import {getAllBranches} from '../../../services/instituteManagement/BranchService';
import {getAllTrainingCenters} from '../../../services/instituteManagement/TrainingCenterService';
import {genders} from '../../../@softbd/common/helpers';
import {religions} from '../../../@softbd/common/helpers';
import {maritial_status} from '../../../@softbd/common/helpers';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {setServerValidationErrors} from '../../../@softbd/common/validationErrorHandler';

interface TrainerAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  trainer_name_en: yup.string().trim().required().label('Trainer Name(En)'),
  trainer_name_bn: yup
    .string()
    .trim()
    .required()
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text')
    .label('Trainer Name(Bn)'),
  mobile: yup
    .string()
    .trim()
    .required()
    .matches(MOBILE_NUMBER_REGEX, 'Enter valid Number')
    .label('Mobile Number'),
  email: yup.string().required().email('Enter valid email').label('Email'),
  institute_id: yup.string().trim().required().label('Institutes'),
  nationality: yup.string().trim().required().label('nationality'),
});

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [divisions, setDivisions] = useState<Array<Division>>([]);
  const [presentDistricts, setPresentDistricts] = useState<Array<District>>([]);
  const [permanentDistricts, setPermanentDistricts] = useState<Array<District>>(
    [],
  );
  const [presentUpazilas, setPresentUpazilas] = useState<Array<Upazila>>([]);
  const [permanentUpazilas, setPermanentUpazilas] = useState<Array<Upazila>>(
    [],
  );

  const [institutes, setInstitutes] = useState<Array<Institute> | []>([]);
  const [branches, setBranches] = useState<Array<Branch> | []>([]);
  const [trainingCenters, setTrainingCenters] = useState<
    Array<TrainingCenter> | []
  >([]);

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

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let response = await getTrainer(itemId);
        if (response) {
          let {data: item} = response;
          reset({
            trainer_name_en: item?.trainer_name_en,
            trainer_name_bn: item?.trainer_name_bn,
            institute_id: item?.institute_id,
            branch_id: item?.branch_id,
            training_center_id: item?.training_center_id,
            trainer_registration_number: item?.trainer_registration_number,
            email: item?.email,
            mobile: item?.mobile,
            about_me: item?.about_me,
            gender: item?.gender,
            marital_status: item?.marital_status,
            religion: item?.religion,
            date_of_birth: item?.date_of_birth
              ? getMomentDateFormat(item.date_of_birth, 'YYYY-MM-DD')
              : '',
            nationality: item?.nationality,
            nid: item?.nid,
            passport_number: item?.passport_number,
            present_address_division_id: item?.present_address_division_id,
            present_address_district_id: item?.present_address_district_id,
            present_address_upazila_id: item?.present_address_upazila_id,
            permanent_address_division_id: item?.permanent_address_division_id,
            permanent_address_district_id: item?.permanent_address_district_id,
            permanent_address_upazila_id: item?.permanent_address_upazila_id,
            present_house_address: item?.present_house_address,
            permanent_house_address: item?.permanent_house_address,
            educational_qualification: item?.educational_qualification,
            skills: item?.skills,
            row_status: String(item?.row_status),
          });
          loadDistrictsByDivision(
            item?.present_address_division_id,
            true,
            false,
          );
          loadDistrictsByDivision(
            item?.permanent_address_division_id,
            false,
            false,
          );
          loadUpazilasByDistrict(item?.present_address_district_id, true);
          loadUpazilasByDistrict(item?.permanent_address_district_id, false);

          loadBranchByInstitute(item?.institute_id);
          loadTrainingCenterByBranch(item?.branch_id);
        }
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await loadInstitutes();
      await loadDivisions();
      setIsLoading(false);
    })();
  }, []);

  const loadInstitutes = async () => {
    const response = await getAllInstitutes();
    response && setInstitutes(response.data);
  };
  const loadDivisions = async () => {
    const response = await getAllDivisions();
    response && setDivisions(response.data);
  };

  const handleDivisionChange = async (
    divisionId: number,
    isPresent: boolean,
    isChanged: boolean,
  ) => {
    loadDistrictsByDivision(divisionId, isPresent, isChanged);
  };

  const loadDistrictsByDivision = (
    divisionId: number,
    isPresent: boolean,
    isChanged: boolean,
  ) => {
    (async () => {
      let response = await getAllDistricts({division_id: divisionId});
      if (response) {
        if (isPresent) {
          setPresentDistricts(response.data);
          if (isChanged) {
            setPresentUpazilas([]);
          }
        } else {
          setPermanentDistricts(response.data);
          if (isChanged) {
            setPermanentUpazilas([]);
          }
        }
      }
    })();
  };

  const handleDistrictChange = async (
    districtId: number,
    isPresent: boolean,
  ) => {
    loadUpazilasByDistrict(districtId, isPresent);
  };
  const loadUpazilasByDistrict = (districtId: number, isPresent: boolean) => {
    (async () => {
      let response = await getAllUpazilas({districtId: districtId});
      if (response) {
        if (isPresent) {
          setPresentUpazilas(response.data);
        } else {
          setPermanentUpazilas(response.data);
        }
      }
    })();
  };

  const onInstituteChange = useCallback((instituteId: number) => {
    loadBranchByInstitute(instituteId);
  }, []);

  const onBranchChange = useCallback((BranchId: number) => {
    loadTrainingCenterByBranch(BranchId);
  }, []);

  const loadBranchByInstitute = (instituteId: number) => {
    (async () => {
      let response = await getAllBranches({
        row_status: RowStatus.ACTIVE,
        institute_id: instituteId,
      });
      if (response) {
        setBranches(response.data);
        setTrainingCenters([]);
      }
    })();
  };

  const loadTrainingCenterByBranch = (branchId: number) => {
    (async () => {
      let response = await getAllTrainingCenters({
        row_status: RowStatus.ACTIVE,
        branch_id: branchId,
      });
      if (response) {
        setTrainingCenters(response.data);
      }
    })();
  };
  const onSubmit: SubmitHandler<Trainer> = async (data: Trainer) => {
    if (isEdit && itemId) {
      console.log('data--', data);
      let response = await updateTrainer(itemId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='trainers.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createTrainer(data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='trainers.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      } else {
        if (isValidationError(response)) {
          setServerValidationErrors(response.errors, setError);
        }
      }
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
            isLoading={isLoading}
            control={control}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={useCallback((divisionId: number) => {
              (async () => {
                await handleDivisionChange(divisionId, true, true);
              })();
            }, [])}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='permanent_address_division_id'
            label={messages['common.division_title_permanent_address']}
            isLoading={isLoading}
            control={control}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={useCallback((divisionId: number) => {
              (async () => {
                await handleDivisionChange(divisionId, false, true);
              })();
            }, [])}
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
            onChange={useCallback((present_address_district_id: number) => {
              (async () => {
                await handleDistrictChange(present_address_district_id, true);
              })();
            }, [])}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='permanent_address_district_id'
            label={messages['common.district_title_permanent_address']}
            isLoading={isLoading}
            control={control}
            options={permanentDistricts}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={useCallback((permanent_address_district_id: number) => {
              (async () => {
                await handleDistrictChange(
                  permanent_address_district_id,
                  false,
                );
              })();
            }, [])}
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
            options={maritial_status}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
