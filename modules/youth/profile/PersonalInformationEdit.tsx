import {Avatar, Box, Button, Grid, Zoom} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../@softbd/libs/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CustomHookForm from './component/CustomHookForm';
import {
  useFetchYouthProfile,
  useFetchYouthSkills,
} from '../../../services/youthManagement/hooks';
import {updateYouthPersonalInfo} from '../../../services/youthManagement/YouthService';
import {YouthPersonalInfo} from '../../../services/youthManagement/typing';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import Genders from '../../../@softbd/utilities/Genders';
import PhysicalDisabilityStatus from '../../../@softbd/utilities/PhysicalDisabilityStatus';
import UserNameType from '../../../@softbd/utilities/UserNameType';
import PhysicalDisabilities from '../../../@softbd/utilities/PhysicalDisabilities';

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
  skills: [],
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  zip_or_postal_code: '',
};

const PersonalInformationEdit: FC<PersonalInformationEditProps> = ({
  onClose: onEditPageClose,
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const {
    data: itemData,
    isLoading,
    mutate: profileInfoMutate,
  } = useFetchYouthProfile();

  const [youthSkillsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: skills} = useFetchYouthSkills(youthSkillsFilter);

  const [divisionFilters] = useState<any>({});
  const {data: divisions, isLoading: isLoadingDivisions}: any =
    useFetchDivisions(divisionFilters);

  const [districtsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: districts} = useFetchDistricts(districtsFilter);

  const [upazilasFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: upazilas} = useFetchUpazilas(upazilasFilter);
  const [districtList, setDistrictList] = useState<Array<District> | []>([]);
  const [upazilaList, setUpazilaList] = useState<Array<Upazila> | []>([]);
  const [disabilityStatus, setDisabilityStatus] = useState<number>(
    PhysicalDisabilityStatus.NO,
  );
  const [userNameType, setUserNameType] = useState<number>(UserNameType.MOBILE);

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
        .label(messages['common.date_of_birth'] as string),
      skills: yup
        .array()
        .of(yup.number())
        .min(1)
        .label(messages['common.skills'] as string),
      physical_disability_status: yup
        .string()
        .trim()
        .required()
        .label(messages['common.physical_disability'] as string),
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
      /*village_or_area: yup
        .string()
        .nullable()
        .notRequired()
        .when('village_or_area', {
          is: (value: any) => value && value.length > 0,
          then: (rule: any) =>
            rule
              .matches(MOBILE_NUMBER_REGEX)
              .label(messages['common.village_or_area_bn'] as string),
        }),*/
      zip_or_postal_code: yup
        .string()
        .trim()
        .required()
        .label(messages['common.zip_or_postal_code'] as string),
    });
  }, [messages, userNameType, disabilityStatus]);

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

  const {
    register,
    reset,
    handleSubmit,
    setError,
    control,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        first_name: itemData?.first_name,
        first_name_en: itemData?.first_name_en,
        last_name: itemData?.last_name,
        last_name_en: itemData?.last_name_en,
        gender: itemData?.gender,
        email: itemData?.email,
        mobile: itemData?.mobile,
        skills: getSkillIds(itemData?.skills),
        physical_disability_status: itemData?.physical_disability_status,
        physical_disabilities: getPhysicalDisabilityIds(
          itemData?.physical_disabilities,
        ),
        date_of_birth: itemData?.date_of_birth,
        loc_division_id: itemData?.loc_division_id,
        loc_district_id: itemData?.loc_district_id,
        loc_upazila_id: itemData?.loc_upazila_id,
        village_or_area: itemData?.village_or_area,
        village_or_area_en: itemData?.village_or_area_en,
        house_n_road: itemData?.house_n_road,
        house_n_road_en: itemData?.house_n_road_en,
        zip_or_postal_code: itemData?.zip_or_postal_code,
        bio: itemData?.bio,
        bio_en: itemData?.bio_en,
      });
      setDisabilityStatus(itemData?.physical_disability_status);
      setUserNameType(itemData?.user_name_type);
      let filteredDistricts = filterDistrictsByDivisionId(
        districts,
        itemData?.loc_division_id,
      );
      setDistrictList(filteredDistricts);

      let filteredUpazilas = filterUpazilasByDistrictId(
        upazilas,
        itemData?.loc_district_id,
      );
      setUpazilaList(filteredUpazilas);
    } else {
      reset(initialValues);
    }
  }, [itemData, districts, upazilas]);

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

  const onSubmit: SubmitHandler<YouthPersonalInfo> = async (
    data: YouthPersonalInfo,
  ) => {
    if (data.physical_disability_status == PhysicalDisabilityStatus.NO) {
      data.physical_disabilities = [];
    }

    const response = await updateYouthPersonalInfo(data);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='personal_info.label' />}}
        />,
      );
      profileInfoMutate();
      onEditPageClose();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
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
              <CancelButton onClick={onEditPageClose} isLoading={isLoading} />
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </React.Fragment>
          }
          onClose={onEditPageClose}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Avatar
                style={{
                  border: '0.5px solid lightgray',
                }}
                alt='Travis Howard'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMjeeornJdOe6FD8JTzqih-CByVmSWpSD0g&usqp=CAU'
                sx={{width: 100, height: 100}}
              />
            </Grid>
            <Grid style={{marginTop: '20px'}} item xs={12} md={8}>
              <input
                type='file'
                accept='image*'
                style={{display: 'none'}}
                id='contained-button-file'
              />
              <label htmlFor='contained-button-file'>
                <Button variant='contained' color='primary' component='span'>
                  <CloudUploadOutlinedIcon
                    style={{marginRight: '5px', fontSize: 30}}
                  />{' '}
                  Upload new picture
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='first_name'
                label={messages['common.first_name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='first_name_en'
                label={messages['common.first_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='last_name'
                label={messages['common.last_name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='last_name_en'
                label={messages['common.last_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            {itemData?.user_name_type != UserNameType.EMAIL && (
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='email'
                  label={messages['common.email']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
            )}
            {itemData?.user_name_type != UserNameType.MOBILE && (
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='mobile'
                  label={messages['common.mobile']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='skills'
                label={messages['common.select_your_skills']}
                isLoading={false}
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
              <FormRadioButtons
                id='physical_disability_status'
                label={'common.physical_disability'}
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
                  label={messages['common.physical_disability_title']}
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
              <CustomFormSelect
                id='loc_division_id'
                label={messages['divisions.label']}
                isLoading={isLoadingDivisions}
                control={control}
                options={divisions}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
                onChange={onDivisionChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='loc_district_id'
                label={messages['districts.label']}
                isLoading={false}
                control={control}
                options={districtList}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
                onChange={onDistrictChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='loc_upazila_id'
                label={messages['upazilas.label']}
                isLoading={false}
                control={control}
                options={upazilaList}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='village_or_area'
                label={messages['common.village_or_area_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='village_or_area_en'
                label={messages['common.village_or_area_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='house_n_road'
                label={messages['common.house_n_road_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='house_n_road_en'
                label={messages['common.house_n_road_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='zip_or_postal_code'
                label={messages['common.zip_or_postal_code']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='bio'
                label={messages['common.bio_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
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
                isLoading={isLoading}
                multiline={true}
                rows={3}
              />
            </Grid>
            <Grid item xs={8}>
              <label htmlFor='contained-button-file'>
                <Button variant='contained' color='primary' component='span'>
                  <CloudUploadOutlinedIcon
                    style={{marginRight: '20px', fontSize: 30}}
                  />{' '}
                  Upload CV
                </Button>
              </label>
              <input
                type='file'
                accept='image/pdf/doc/*'
                style={{display: 'none'}}
                id='contained-button-file'
              />
            </Grid>
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default PersonalInformationEdit;
