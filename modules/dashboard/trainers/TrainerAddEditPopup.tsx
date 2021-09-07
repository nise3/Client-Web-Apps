// import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {
  createTrainer,
  getTrainer,
  updateTrainer,
} from '../../../services/instituteManagement/TrainerService';
// import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
// import {
//   DOMAIN_REGEX,
//   MOBILE_NUMBER_REGEX,
//   TEXT_REGEX_BANGLA,
// } from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {
  isResponseSuccess,
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

interface TrainerAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

//
// const validationSchema = yup.object().shape({
//   title_en: yup.string().trim().required().label('Title (En)'),
//   title_bn: yup
//     .string()
//     .trim()
//     .required()
//     .matches(TEXT_REGEX_BANGLA, 'Enter valid text')
//     .label('Title (Bn)'),
//   domain: yup
//     .string()
//     .trim()
//     .required()
//     .matches(DOMAIN_REGEX, 'Domain is not valid')
//     .label('Domain'),
//   code: yup.string().required().label('Code'),
//   primary_phone: yup
//     .string()
//     .trim()
//     .required()
//     .matches(MOBILE_NUMBER_REGEX, 'Number is not valid')
//     .label('Phone Number'),
//   phone_numbers: yup.array().of(
//     yup.object().shape({
//       value: yup
//         .string()
//         .trim()
//         .matches(MOBILE_NUMBER_REGEX, 'Number is not valid'),
//     }),
//   ),
//   primary_mobile: yup
//     .string()
//     .trim()
//     .required()
//     .matches(MOBILE_NUMBER_REGEX, 'Number is not valid')
//     .label('Mobile Number'),
//   address: yup.string().trim().required().label('Address'),
//   google_map_src: yup.string(),
//   email: yup.string().required().email('Enter valid email').label('Email'),
//   loc_division_id: yup.string().trim().required().label('Division'),
//   loc_district_id: yup.string().trim().required().label('District'),
//   loc_upazila_id: yup.string().trim().required().label('Upazila'),
// });

const initialValues = {
  title_en: '',
  title_bn: '',
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
  physical_disabilities_status: '',
  freedom_fighter_status: '',
  training_centers_title_en: '',
  branches_title_en: '',
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
  photo: '',
  signature: '',
  row_status: '1',

};

const TrainerAddEditPopup: FC<TrainerAddEditPopupProps> = ({
                                                             itemId,
                                                             ...props
                                                           }) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [divisions, setDivisions] = useState<Array<Division>>([]);
  const [presentDistricts, setPresentDistricts] = useState<Array<District>>([]);
  const [permanentDistricts, setPermanentDistricts] = useState<Array<District>>([]);
  const [presentUpazilas, setPresentUpazilas] = useState<Array<Upazila>>([]);
  const [permanentUpazilas, setPermanentUpazilas] = useState<Array<Upazila>>([]);
  const [selectedPresentDivision, setSelectedPresentDivision] = useState<number | string | null>(null);
  const [selectedPermanentDivision, setSelectedPermanentDivision] = useState<number | string | null>(null);
  const [selectedPresentDistrict, setSelectedPresentDistrict] = useState<number | string | null>(null);
  const [selectedPermanentDistrict, setSelectedPermanentDistrict] = useState<number | string | null>(null);

  const [institutes, setInstitutes] = useState<Array<Institute> | []>([]);
  const [branches, setBranches] = useState<Array<Branch> | []>([]);
  const [trainingCenters, setTrainingCenters] = useState<Array<Branch> | []>([]);
  const [selectedInstitute, setSelectedInstitute] = useState<number | string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | string | null>(null);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({});

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let response = await getTrainer(itemId);
        if (response) {
          let {data: item} = response;
          reset({
            title_en: item?.title_en,
            title_bn: item?.title_bn,
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
            nationality: item?.nationality,
            training_centers_title_en: item?.training_centers_title_en,
            branches_title_en: item?.branches_title_en,
            nid: item?.nid,
            passport_number: item?.passport_number,
            physical_disabilities_status: item?.physical_disabilities_status,
            freedom_fighter_status: item?.freedom_fighter_status,
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
            photo: item?.photo,
            signature: item?.signature,
            row_status: String(item?.row_status),
          });

        }
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
      await loadInstitutes();
      await loadDivisions();
    })();
  }, [itemId]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let response = await getAllDivisions({row_status: RowStatus.ACTIVE});
      if (response) setDivisions(response.data);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedPresentDivision) {
        let response = await getAllDistricts({division_id: selectedPresentDivision});
        response && setPresentDistricts(response.data);
      } else {
        let response = await getAllDistricts();
        response && setPresentDistricts(response.data);
      }
    })();
  }, [selectedPresentDivision]);

  useEffect(() => {
    (async () => {
      if (selectedPermanentDivision) {
        let response = await getAllDistricts({division_id: selectedPermanentDivision});
        response && setPermanentDistricts(response.data);
      } else {
        let response = await getAllDistricts();
        response && setPermanentDistricts(response.data);
      }
    })();
  }, [selectedPermanentDivision]);

  useEffect(() => {
    (async () => {
      if (selectedPresentDistrict) {
        let response = await getAllUpazilas({district_id: selectedPresentDistrict});
        response && setPresentUpazilas(response.data);
      } else {
        let response = await getAllUpazilas();
        response && setPresentUpazilas(response.data);
      }
    })();
  }, [selectedPresentDistrict]);

  useEffect(() => {
    (async () => {
      if (selectedPermanentDistrict) {
        let response = await getAllUpazilas({district_id: selectedPermanentDistrict});
        response && setPermanentUpazilas(response.data);
      } else {
        let response = await getAllUpazilas();
        response && setPermanentUpazilas(response.data);
      }
    })();
  }, [selectedPermanentDistrict]);



  useEffect(() => {
    (async () => {
      if (selectedInstitute) {
        let response = await getAllBranches({institute_id: selectedInstitute});
        response && setBranches(response.data);
      } else {
        let response = await getAllBranches();
        response && setBranches(response.data);
      }
    })();
  }, [selectedInstitute]);

  useEffect(() => {
    (async () => {
      if (selectedBranch) {
        let response = await getAllTrainingCenters({institute_id: selectedBranch});
        response && setTrainingCenters(response.data);
      } else {
        let response = await getAllTrainingCenters();
        response && setTrainingCenters(response.data);
      }
    })();
  }, [selectedBranch]);


  const loadInstitutes = async () => {
    const response = await getAllInstitutes();
    response && setInstitutes(response.data);
  };
  const loadDivisions = async () => {
    const response = await getAllDivisions();
    response && setDivisions(response.data);
  };

  const handlePresentDivisionChange = (presentDivisionId: number) => {
    setSelectedPresentDivision(presentDivisionId);
  };
  const handlePresentDistrictChange = (presentDistrictId: number) => {
    setSelectedPresentDistrict(presentDistrictId);
  };
  const handlePermanentDivisionChange = (permanentDivisionId: number) => {
    setSelectedPermanentDivision(permanentDivisionId);
  };
  const handlePermanentDistrictChange = (permanentDistrictId: number) => {
    setSelectedPermanentDistrict(permanentDistrictId);
  };
  const handleInstituteChange = (instituteId: number) => {
    setSelectedInstitute(instituteId);
  };
  const handleBranchChange = (branchId: number) => {
    setSelectedBranch(branchId);
  };


  const onSubmit: SubmitHandler<Trainer> = async (data: Trainer) => {
    // data.phone_numbers = getValuesFromObjectArray(data.phone_numbers);
    // data.mobile_numbers = getValuesFromObjectArray(data.mobile_numbers);
    if (isEdit && itemId) {
      let response = await updateTrainer(itemId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='institute.label' />}}
          />,
        );
        props.onClose();
        props.refreshDataTable();
      }
    } else {
      let response = await createTrainer(data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='institute.label' />}}
          />,
        );
        props.onClose();
        props.refreshDataTable();
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
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextInput
                id='trainer_name_en'
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
              <CustomTextInput
                id='about_me'
                label={messages['common.about_me']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='date_of_birth'
                label={messages['common.date_of_birth']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                id='permanent_address_division_id'
                label={messages['common.division_title_bn_permanent_address']}
                isLoading={isLoading}
                control={control}
                options={divisions}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
                onChange={handlePermanentDivisionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                id='permanent_address_district_id'
                label={messages['common.district_title_bn_permanent_address']}
                isLoading={isLoading}
                control={control}
                options={permanentDistricts}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
                onChange={handlePermanentDistrictChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                id='permanent_address_upazila_id'
                label={messages['common.upazila_title_bn_permanent_address']}
                isLoading={isLoading}
                control={control}
                options={permanentUpazilas}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='gender'
                label={messages['common.gender']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            {/*<Grid item xs={12}>*/}
            {/*  <CustomTextInput*/}
            {/*    id='marital_status'*/}
            {/*    label={messages['common.marital_status']}*/}
            {/*    register={register}*/}
            {/*    errorInstance={errors}*/}
            {/*    isLoading={isLoading}*/}
            {/*  />*/}
            {/*</Grid>*/}
            <Grid item xs={12}>
              <CustomTextInput
                id='religion'
                label={messages['common.religion']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='nid'
                label={messages['common.nid']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='passport_number'
                label={messages['common.passport_number_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
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
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextInput
                id='trainer_name_bn'
                label={messages['common.title_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='educational_qualification'
                label={messages['common.educational_qualification_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='skills'
                label={messages['menu.skill']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='physical_disabilities_status'
                label={messages['common.physical_disabilities_status']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                id='present_address_division_id'
                label={messages['common.division_title_bn_present_address']}
                isLoading={isLoading}
                control={control}
                options={divisions}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
                onChange={handlePresentDivisionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                id='present_address_district_id'
                label={messages['common.district_title_bn_present_address']}
                isLoading={isLoading}
                control={control}
                options={presentDistricts}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
                onChange={handlePresentDistrictChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                id='present_address_upazila_id'
                label={messages['common.upazila_title_bn_present_address']}
                isLoading={isLoading}
                control={control}
                options={presentUpazilas}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                id='institute_id'
                label={messages['institute.label']}
                isLoading={isLoading}
                control={control}
                options={institutes}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
                onChange={handleInstituteChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                id='branch_id'
                label={messages['branch.label']}
                isLoading={isLoading}
                control={control}
                options={branches}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
                onChange={handleBranchChange}
              />
            </Grid>
            <Grid item xs={12}>
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

            {/*<Grid item xs={12}>*/}
            {/*  <FormRowStatus*/}
            {/*    id='row_status'*/}
            {/*    control={control}*/}
            {/*    defaultValue={initialValues.row_status}*/}
            {/*    isLoading={isLoading}*/}
            {/*  />*/}
            {/*</Grid>*/}
            {/*<Grid item xs={12}>*/}
            {/*  <FormRowStatus*/}
            {/*    id='row_status'*/}
            {/*    control={control}*/}
            {/*    defaultValue={initialValues.row_status}*/}
            {/*    isLoading={isLoading}*/}
            {/*  />*/}
            {/*</Grid>*/}

          </Grid>
        </Grid>

      </Grid>
    </HookFormMuiModal>
  );
};
export default TrainerAddEditPopup;
