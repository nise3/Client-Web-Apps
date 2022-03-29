import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {Grid, Typography} from '@mui/material';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {SubmitHandler, useForm} from 'react-hook-form';
import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useIntl} from 'react-intl';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import RowStatus from '../../../@softbd/utilities/RowStatus';
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
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {updateIndustryAssocProfile} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CustomSelectAutoComplete from '../../youth/registration/CustomSelectAutoComplete';
import {useFetchSkills} from '../../../services/youthManagement/hooks';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {FORM_PLACEHOLDER} from '../../../@softbd/common/constants';
import {
  getMobilePhoneValidationSchema,
  getObjectArrayFromValueArray,
  getValuesFromObjectArray,
} from '../../../@softbd/utilities/helpers';
import {
  MOBILE_NUMBER_REGEX,
  PHONE_NUMBER_REGEX,
} from '../../../@softbd/common/patternRegex';
import CustomFieldArray from '../../../@softbd/elements/input/CustomFieldArray';
import TextEditor from '../../../@softbd/components/editor/TextEditor';

interface AssociationProfileEditPopupProps {
  onClose: () => void;
  userData: any;
}

const AssociationProfileEditPopup: FC<AssociationProfileEditPopupProps> = ({
  userData,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  const {updateSuccessMessage} = useSuccessMessage();

  const [divisionsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [districtsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [upazilasFilter] = useState({row_status: RowStatus.ACTIVE});

  const [skillFilter] = useState({});
  const {data: skillData, isLoading: isLoadingSkillData} =
    useFetchSkills(skillFilter);

  const [selectedSkillList, setSelectedSkillList] = useState<any>([]);

  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchDivisions(divisionsFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);

  const [districtsList, setDistrictsList] = useState<Array<District> | []>([]);
  const [upazilasList, setUpazilasList] = useState<Array<Upazila> | []>([]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['association.association_name'] as string),
      logo: yup
        .string()
        .trim()
        .required()
        .label(messages['common.logo'] as string),
      name_of_the_office_head: yup
        .string()
        .trim()
        .required()
        .label(messages['association.head_of_office_or_chairman'] as string),
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
        .label(messages['association.association_address'] as string),
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
      contact_person_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_designation'] as string),
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
    });
  }, []);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    if (userData) {
      reset({
        logo: userData?.logo,
        title: userData?.title,
        address: userData?.address,
        loc_division_id: userData?.loc_division_id,
        loc_district_id: userData?.loc_district_id,
        loc_upazila_id: userData?.loc_upazila_id,
        name_of_the_office_head: userData?.name_of_the_office_head,
        name_of_the_office_head_designation:
          userData?.name_of_the_office_head_designation,
        contact_person_name: userData?.contact_person_name,
        contact_person_designation: userData?.contact_person_designation,
        location_latitude: userData?.location_latitude,
        location_longitude: userData?.location_longitude,
        phone_numbers: getObjectArrayFromValueArray(userData?.phone_numbers),
        mobile_numbers: getObjectArrayFromValueArray(userData?.mobile_numbers),
      });
      setDistrictsList(
        filterDistrictsByDivisionId(districts, userData?.loc_division_id),
      );
      setUpazilasList(
        filterUpazilasByDistrictId(upazilas, userData?.loc_district_id),
      );
      setSelectedSkillList(userData?.skills);
    }
  }, [userData, districts, upazilas]);

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

  const onSkillChange = useCallback((options) => {
    setSelectedSkillList(options);
  }, []);

  const onSubmit: SubmitHandler<any> = async (data) => {
    let skillIds: any = [];
    if (selectedSkillList) {
      selectedSkillList.map((skill: any) => {
        skillIds.push(skill.id);
      });
    }
    data.skills = skillIds;

    try {
      data.phone_numbers = getValuesFromObjectArray(data.phone_numbers);
      data.mobile_numbers = getValuesFromObjectArray(data.mobile_numbers);

      await updateIndustryAssocProfile(data);
      updateSuccessMessage('industry_association_reg.label');
      props.onClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  console.log('errors: ', errors);
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
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
        </>
      }>
      <Grid container spacing={3} sx={{overflow: 'hidden'}}>
        <Grid item xs={12}>
          <Typography variant={'h6'}>
            {messages['association.association_information']}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FileUploadComponent
            required
            id='logo'
            defaultFileUrl={userData?.logo}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.image_path']}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['association.association_name']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
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
            onChange={changeDivisionAction}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
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
          <CustomFilterableFormSelect
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
            label={messages['association.head_of_office_or_chairman']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='name_of_the_office_head_designation'
            label={messages['association.designation']}
            register={register}
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
          />
        </Grid>
        <Grid item container xs={12} md={6} alignSelf='flex-start'>
          <CustomFieldArray
            id='mobile_numbers'
            labelLanguageId={'common.mobile'}
            control={control}
            register={register}
            errors={errors}
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
            required
            id='address'
            label={messages['association.association_address']}
            register={register}
            errorInstance={errors}
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
          <CustomSelectAutoComplete
            id='skills'
            label={messages['common.skills']}
            isLoading={isLoadingSkillData}
            control={control}
            options={skillData}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            defaultValue={selectedSkillList}
            errorInstance={errors}
            onChange={onSkillChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextEditor
            id={'description'}
            label={messages['common.description']}
            errorInstance={errors}
            value={userData?.description || ''}
            height={'300px'}
            key={1}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default AssociationProfileEditPopup;
