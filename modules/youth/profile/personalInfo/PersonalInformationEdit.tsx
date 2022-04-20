import {Box, Grid, Zoom} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {getMomentDateFormat} from '../../../../@softbd/utilities/helpers';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../../@softbd/libs/yup';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CustomHookForm from '../component/CustomHookForm';
import {useFetchPublicSkills} from '../../../../services/youthManagement/hooks';
import {updateYouthPersonalInfo} from '../../../../services/youthManagement/YouthService';
import {YouthPersonalInfo} from '../../../../services/youthManagement/typing';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../../services/locationManagement/hooks';
import RowStatus from '../../../../@softbd/utilities/RowStatus';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../../services/locationManagement/locationUtils';
import {
  MOBILE_NUMBER_REGEX,
  NID_REGEX,
} from '../../../../@softbd/common/patternRegex';
import FormRadioButtons from '../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import Genders from '../../../../@softbd/utilities/Genders';
import PhysicalDisabilityStatus from '../../../../@softbd/utilities/PhysicalDisabilityStatus';
import UserNameType from '../../../../@softbd/utilities/UserNameType';
import PhysicalDisabilities from '../../../../@softbd/utilities/PhysicalDisabilities';
import MaritalStatus from '../../../../@softbd/utilities/MaritalStatus';
import FreedomFighterStatus from '../../../../@softbd/utilities/FreedomFighterStatus';
import Religions from '../../../../@softbd/utilities/Religions';
import IdentityNumberTypes from '../../../../@softbd/utilities/IdentityNumberTypes';
import CustomDateTimeField from '../../../../@softbd/elements/input/CustomDateTimeField';
import CustomCheckbox from '../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import EthnicGroupStatus from '../../../../@softbd/utilities/EthnicGroupStatus';
import useSuccessMessage from '../../../../@softbd/hooks/useSuccessMessage';
import {nationalities} from '../../../../@softbd/utilities/Nationalities';
import CustomFilterableFormSelect from '../../../../@softbd/elements/input/CustomFilterableFormSelect';
import {
  District,
  Upazila,
} from '../../../../shared/Interface/location.interface';
import FileUploadComponent from '../../../filepond/FileUploadComponent';
import moment from 'moment';
import {DATE_OF_BIRTH_MIN_AGE} from '../../../../@softbd/common/constants';

interface PersonalInformationEditProps {
  onClose: () => void;
}

const initialValues = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
  physical_disability_status: PhysicalDisabilityStatus.NO,
  physical_disabilities: [],
  email: '',
  mobile: '',
  gender: Genders.MALE,
  marital_status: MaritalStatus.SINGLE,
  freedom_fighter_status: FreedomFighterStatus.NO,
  religion: Religions.ISLAM,
  nationality: '',
  identity_number: '',
  does_belong_to_ethnic_group: EthnicGroupStatus.NO,
  skills: [],
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  zip_or_postal_code: '',
  signature_image_path: '',
  cv_path: '',
};

const PersonalInformationEdit: FC<PersonalInformationEditProps> = ({
  onClose: onEditPageClose,
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {updateSuccessMessage} = useSuccessMessage();
  const authUser = useAuthUser<YouthAuthUser>();

  const [youthSkillsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: skills, isLoading: isLoadingSkills} =
    useFetchPublicSkills(youthSkillsFilter);

  const [divisionFilters] = useState<any>({});
  const {data: divisions, isLoading: isLoadingDivisions}: any =
    useFetchDivisions(divisionFilters);

  const [districtsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);

  const [upazilasFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);
  const [districtList, setDistrictList] = useState<Array<District> | []>([]);
  const [upazilaList, setUpazilaList] = useState<Array<Upazila> | []>([]);
  const [disabilityStatus, setDisabilityStatus] = useState<number>(
    PhysicalDisabilityStatus.NO,
  );
  const [userNameType, setUserNameType] = useState<number>(UserNameType.MOBILE);
  const [isBelongToEthnicGroup, setIsBelongToEthnicGroup] =
    useState<boolean>(false);
  const [identityNumberType, setIdentityNumberType] = useState<
    string | undefined
  >();

  const getIdentityNumberFieldCaption = useCallback(() => {
    switch (String(identityNumberType)) {
      case IdentityNumberTypes.NID:
        return messages['common.identity_type_nid'];
      case IdentityNumberTypes.BIRTH_CERT:
        return messages['common.identity_type_birth_cert'];
      case IdentityNumberTypes.PASSPORT:
        return messages['common.identity_type_passport'];
      default:
        return messages['common.identity_type_nid'];
    }
  }, [identityNumberType]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      first_name: yup
        .string()
        .title('bn')
        .label(messages['common.first_name_bn'] as string),
      last_name: yup
        .string()
        .title('bn')
        .label(messages['common.last_name_bn'] as string),
      date_of_birth: yup
        .string()
        .trim()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(messages['common.date_of_birth'] as string)
        .test(
          'DOB',
          messages['common.invalid_date_of_birth'] as string,
          (value) =>
            moment().diff(moment(value), 'years') >= DATE_OF_BIRTH_MIN_AGE,
        ),
      skills: yup
        .array()
        .of(yup.number())
        .min(1)
        .max(15)
        .label(messages['common.skills'] as string),
      physical_disability_status: yup
        .string()
        .trim()
        .required()
        .label(messages['common.physical_disabilities_status'] as string),
      physical_disabilities:
        disabilityStatus == PhysicalDisabilityStatus.YES
          ? yup
              .array()
              .of(yup.number())
              .min(1)
              .label(messages['common.physical_disability'] as string)
          : yup.array().of(yup.number()),
      email:
        userNameType == UserNameType.EMAIL
          ? yup.string()
          : yup
              .string()
              .trim()
              .required()
              .email()
              .label(messages['common.email'] as string),
      mobile:
        userNameType == UserNameType.MOBILE
          ? yup.string()
          : yup
              .string()
              .trim()
              .required()
              .matches(MOBILE_NUMBER_REGEX)
              .label(messages['common.mobile'] as string),
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
      identity_number: Boolean(identityNumberType)
        ? yup
            .string()
            .trim()
            .required()
            .matches(NID_REGEX)
            .label(messages['common.identity_number'] as string)
        : yup.mixed(),
    });
  }, [messages, userNameType, disabilityStatus, identityNumberType]);

  const physicalDisabilities = useMemo(
    () => [
      {
        id: PhysicalDisabilities.VISUAL,
        label: messages['physical_disability.visual'],
      },
      {
        id: PhysicalDisabilities.HEARING,
        label: messages['physical_disability.hearing'],
      },
      {
        id: PhysicalDisabilities.MENTAL_HEALTH,
        label: messages['physical_disability.mental_health'],
      },
      {
        id: PhysicalDisabilities.INTELLECTUAL,
        label: messages['physical_disability.intellectual'],
      },
      {
        id: PhysicalDisabilities.SOCIAL,
        label: messages['physical_disability.social'],
      },
    ],
    [messages],
  );

  const maritalStatus = useMemo(
    () => [
      {
        id: MaritalStatus.SINGLE,
        label: messages['common.marital_status_single'],
      },
      {
        id: MaritalStatus.MARRIED,
        label: messages['common.marital_status_married'],
      },
      {
        id: MaritalStatus.WIDOWED,
        label: messages['common.marital_status_widowed'],
      },
      {
        id: MaritalStatus.DIVORCED,
        label: messages['common.marital_status_divorced'],
      },
    ],
    [messages],
  );

  const freedomFighterStatus = useMemo(
    () => [
      {
        id: FreedomFighterStatus.NO,
        label: messages['common.no'],
      },
      {
        id: FreedomFighterStatus.YES,
        label: messages['common.yes'],
      },
      {
        id: FreedomFighterStatus.CHILD,
        label: messages['freedom_fighter_status.child'],
      },
      {
        id: FreedomFighterStatus.GRAND_CHILD,
        label: messages['freedom_fighter_status.grand_child'],
      },
    ],
    [messages],
  );

  const religions = useMemo(
    () => [
      {
        id: Religions.ISLAM,
        label: messages['common.religion_islam'],
      },
      {
        id: Religions.HINDUISM,
        label: messages['common.religion_hinduism'],
      },
      {
        id: Religions.CHRISTIANITY,
        label: messages['common.religion_christianity'],
      },
      {
        id: Religions.BUDDHISM,
        label: messages['common.religion_buddhism'],
      },
      {
        id: Religions.JUDAISM,
        label: messages['common.religion_judaism'],
      },
      {
        id: Religions.SIKHISM,
        label: messages['common.religion_sikhism'],
      },
      {
        id: Religions.ETHNIC,
        label: messages['common.religion_ethnic'],
      },
      {
        id: Religions.ATHEIST,
        label: messages['common.religion_atheist'],
      },
    ],
    [messages],
  );

  const {
    register,
    reset,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });
  console.log('error ', errors);

  useEffect(() => {
    if (authUser) {
      reset({
        first_name: authUser?.first_name,
        first_name_en: authUser?.first_name_en,
        last_name: authUser?.last_name,
        last_name_en: authUser?.last_name_en,
        gender: authUser?.gender,
        email: authUser?.email,
        mobile: authUser?.mobile,
        skills: getSkillIds(authUser?.skills),
        physical_disability_status: authUser?.physical_disability_status,
        physical_disabilities: getPhysicalDisabilityIds(
          authUser?.physical_disabilities,
        ),
        freedom_fighter_status: authUser?.freedom_fighter_status,
        identity_number_type: authUser?.identity_number_type,
        identity_number: authUser?.identity_number,
        marital_status: authUser?.marital_status,
        religion: authUser?.religion,
        nationality: authUser?.nationality,
        date_of_birth: getMomentDateFormat(
          authUser?.date_of_birth,
          'YYYY-MM-DD',
        ),
        loc_division_id: authUser?.loc_division_id,
        loc_district_id: authUser?.loc_district_id,
        loc_upazila_id: authUser?.loc_upazila_id,
        village_or_area: authUser?.village_or_area,
        village_or_area_en: authUser?.village_or_area_en,
        house_n_road: authUser?.house_n_road,
        house_n_road_en: authUser?.house_n_road_en,
        zip_or_postal_code: authUser?.zip_or_postal_code,
        bio: authUser?.bio,
        bio_en: authUser?.bio_en,
        photo: authUser?.photo,
        signature_image_path: authUser?.signature_image_path,
        cv_path: authUser?.cv_path,
      });
      setIsBelongToEthnicGroup(
        authUser?.does_belong_to_ethnic_group == EthnicGroupStatus.YES,
      );
      setDisabilityStatus(authUser?.physical_disability_status);
      setUserNameType(authUser?.user_name_type);
      let filteredDistricts = filterDistrictsByDivisionId(
        districts,
        authUser?.loc_division_id,
      );
      setIdentityNumberType(authUser?.identity_number_type);
      setDistrictList(filteredDistricts);
      console.log(
        'authUser?.signature_image_path-',
        authUser?.signature_image_path,
      );
      let filteredUpazilas = filterUpazilasByDistrictId(
        upazilas,
        authUser?.loc_district_id,
      );
      setUpazilaList(filteredUpazilas);
    } else {
      reset(initialValues);
    }
  }, [authUser, districts, upazilas]);

  const getSkillIds = (skills: any) => {
    return (skills || []).map((skill: any) => skill.id);
  };

  const getPhysicalDisabilityIds = (physicalDisabilities: any) => {
    return (physicalDisabilities || []).map(
      (physicalDisability: any) => physicalDisability.id,
    );
  };

  const onDivisionChange = useCallback(
    (divisionId: number) => {
      let filteredDistricts = filterDistrictsByDivisionId(
        districts,
        divisionId,
      );
      setDistrictList(filteredDistricts);
    },
    [districts],
  );

  const onDistrictChange = useCallback(
    (districtId: number) => {
      let filteredUpazilas = filterUpazilasByDistrictId(upazilas, districtId);
      setUpazilaList(filteredUpazilas);
    },
    [upazilas],
  );

  const onDisabilityStatusChange = useCallback((value: number) => {
    setDisabilityStatus(value);
  }, []);

  const onIdentityTypeChange = useCallback((value: string) => {
    setIdentityNumberType(value);
  }, []);

  const onSubmit: SubmitHandler<YouthPersonalInfo> = async (
    data: YouthPersonalInfo,
  ) => {
    if (data.physical_disability_status == PhysicalDisabilityStatus.NO) {
      delete data.physical_disabilities;
    }
    data.does_belong_to_ethnic_group = isBelongToEthnicGroup
      ? EthnicGroupStatus.YES
      : EthnicGroupStatus.NO;
    try {
      await updateYouthPersonalInfo(data);
      updateSuccessMessage('personal_info.label');
      onEditPageClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };
  return (
    <Zoom in={true}>
      <Box>
        <CustomHookForm
          title={messages['personal_info_edit.label']}
          handleSubmit={handleSubmit(onSubmit)}
          actions={
            <React.Fragment>
              <CancelButton onClick={onEditPageClose} isLoading={false} />
              <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
            </React.Fragment>
          }
          onClose={onEditPageClose}>
          <Grid container spacing={2}>
            {/*<Grid item xs={12} md={4}>
              <Avatar
                style={{
                  border: '0.5px solid lightgray',
                }}
                alt='Travis Howard'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMjeeornJdOe6FD8JTzqih-CByVmSWpSD0g&usqp=CAU'
                sx={{width: 100, height: 100}}
              />
            </Grid>*/}
            <Grid item xs={12} md={12}>
              <FileUploadComponent
                id='photo'
                defaultFileUrl={authUser?.photo}
                errorInstance={errors}
                setValue={setValue}
                register={register}
                label={messages['common.profile_picture_upload']}
                required={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='first_name'
                label={messages['common.first_name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='first_name_en'
                label={messages['common.first_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='last_name'
                label={messages['common.last_name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='last_name_en'
                label={messages['common.last_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={false}
              />
            </Grid>
            {authUser?.user_name_type != UserNameType.EMAIL && (
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  required
                  id='email'
                  label={messages['common.email']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                  placeholder='example@gmail.com'
                />
              </Grid>
            )}
            {authUser?.user_name_type != UserNameType.MOBILE && (
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='mobile'
                  label={messages['common.mobile']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                  placeholder='017xxxxxxxx'
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <CustomFormSelect
                required
                id='skills'
                label={messages['common.skills']}
                isLoading={isLoadingSkills}
                control={control}
                options={skills}
                multiple={true}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                defaultValue={[]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormRadioButtons
                id='identity_number_type'
                label={'common.identity_number_type'}
                radios={[
                  {
                    key: IdentityNumberTypes.NID,
                    label: messages['common.identity_type_nid'],
                  },
                  {
                    key: IdentityNumberTypes.BIRTH_CERT,
                    label: messages['common.identity_type_birth_cert'],
                  },
                  {
                    key: IdentityNumberTypes.PASSPORT,
                    label: messages['common.identity_type_passport'],
                  },
                ]}
                control={control}
                defaultValue={identityNumberType}
                isLoading={false}
                onChange={onIdentityTypeChange}
              />
            </Grid>

            {identityNumberType && (
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  required
                  id='identity_number'
                  label={getIdentityNumberFieldCaption()}
                  isLoading={false}
                  register={register}
                  errorInstance={errors}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <FormRadioButtons
                id='gender'
                label={'common.gender'}
                radios={[
                  {
                    key: Genders.MALE,
                    label: messages['common.male'],
                  },
                  {
                    key: Genders.FEMALE,
                    label: messages['common.female'],
                  },
                  {
                    key: Genders.OTHERS,
                    label: messages['common.others'],
                  },
                ]}
                control={control}
                defaultValue={Genders.MALE}
                isLoading={false}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomDateTimeField
                required
                id='date_of_birth'
                label={messages['common.date_of_birth']}
                isLoading={false}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomFilterableFormSelect
                id='marital_status'
                label={messages['common.marital_status']}
                isLoading={false}
                control={control}
                options={maritalStatus}
                optionValueProp={'id'}
                optionTitleProp={['label']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomFilterableFormSelect
                id='nationality'
                label={messages['common.nationality']}
                isLoading={false}
                control={control}
                options={nationalities}
                optionValueProp={'id'}
                optionTitleProp={['title', 'title_en']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomFilterableFormSelect
                id='religion'
                label={messages['common.religion']}
                isLoading={false}
                control={control}
                options={religions}
                optionValueProp={'id'}
                optionTitleProp={['label']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomFilterableFormSelect
                id='freedom_fighter_status'
                label={messages['common.freedom_fighter_status']}
                isLoading={false}
                control={control}
                options={freedomFighterStatus}
                optionValueProp={'id'}
                optionTitleProp={['label']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormRadioButtons
                id='physical_disability_status'
                label={'common.physical_disabilities_status'}
                radios={[
                  {
                    key: PhysicalDisabilityStatus.YES,
                    label: messages['common.yes'],
                  },
                  {
                    key: PhysicalDisabilityStatus.NO,
                    label: messages['common.no'],
                  },
                ]}
                control={control}
                defaultValue={String(PhysicalDisabilityStatus.NO)}
                isLoading={false}
                onChange={onDisabilityStatusChange}
              />
            </Grid>

            {disabilityStatus == 1 && (
              <Grid item xs={12} md={6}>
                <CustomFormSelect
                  id='physical_disabilities'
                  label={messages['common.physical_disability']}
                  isLoading={false}
                  control={control}
                  options={physicalDisabilities}
                  optionValueProp={'id'}
                  optionTitleProp={['label']}
                  errorInstance={errors}
                  multiple={true}
                  defaultValue={[]}
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                required
                id='loc_division_id'
                label={messages['divisions.label']}
                isLoading={isLoadingDivisions}
                control={control}
                options={divisions}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                onChange={onDivisionChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                required
                id='loc_district_id'
                label={messages['districts.label']}
                isLoading={isLoadingDistricts}
                control={control}
                options={districtList}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                onChange={onDistrictChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                id='loc_upazila_id'
                label={messages['upazilas.label']}
                isLoading={isLoadingUpazilas}
                control={control}
                options={upazilaList}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='bio'
                label={messages['common.bio']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                multiline={true}
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='bio_en'
                label={messages['common.bio_en']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                multiline={true}
                rows={3}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUploadComponent
                id='cv_path'
                defaultFileUrl={authUser?.cv_path}
                errorInstance={errors}
                setValue={setValue}
                register={register}
                label={messages['common.cv']}
                required={false}
                acceptedFileTypes={['image/*', 'application/pdf']}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileUploadComponent
                id='signature_image_path'
                defaultFileUrl={authUser?.signature_image_path}
                errorInstance={errors}
                setValue={setValue}
                register={register}
                label={messages['common.signature']}
                required={false}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomCheckbox
                id='does_belong_to_ethnic_group'
                label={messages['youth_registration.ethnic_group']}
                register={register}
                errorInstance={errors}
                checked={isBelongToEthnicGroup}
                onChange={() => {
                  setIsBelongToEthnicGroup((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default PersonalInformationEdit;
