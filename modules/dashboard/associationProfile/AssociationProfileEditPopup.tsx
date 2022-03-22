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
import {useFetchAssociationTrades} from '../../../services/organaizationManagement/hooks';
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
import {
  FORM_PLACEHOLDER,
  isLatLongValid,
} from '../../../@softbd/common/constants';

interface AssociationProfileEditPopupProps {
  onClose: () => void;
  userData: any;
  mutateAssociation: any;
}

const AssociationProfileEditPopup: FC<AssociationProfileEditPopupProps> = ({
  userData,
  mutateAssociation,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  const [associationTradeFilter] = useState({});
  const {updateSuccessMessage} = useSuccessMessage();

  const {data: associationTrades, isLoading: isLoadingTrades} =
    useFetchAssociationTrades(associationTradeFilter);

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
      trade_id: yup
        .string()
        .trim()
        .required()
        .label(messages['association.association_trades'] as string),
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
      skills: yup
        .array()
        .of(yup.object().shape({}))
        .min(1, messages['common.must_have_one_skill'] as string)
        .label(messages['common.skills'] as string),
      location_latitude: yup
        .string()
        .test(
          'lat-err',
          `${messages['common.location_latitude']} ${messages['common.not_valid']}`,
          (value) => isLatLongValid(value as string),
        ),
      location_longitude: yup
        .string()
        .test(
          'long-err',
          `${messages['common.location_longitude']} ${messages['common.not_valid']}`,
          (value) => isLatLongValid(value as string),
        ),
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
    if (userData) {
      reset({
        logo: userData?.logo,
        title: userData?.title,
        trade_id: userData?.trade_id,
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
      await updateIndustryAssocProfile(data);
      updateSuccessMessage('industry_association_reg.label');
      props.onClose();
      mutateAssociation();
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
            id='logo'
            defaultFileUrl={userData?.logo}
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
            label={messages['association.association_name']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='trade_id'
            isLoading={isLoadingTrades}
            label={messages['association.association_trades']}
            control={control}
            options={associationTrades}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
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

        <Grid item xs={12}>
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
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='location_latitude'
            label={messages['common.location_latitude']}
            register={register}
            errorInstance={errors}
            placeholder={FORM_PLACEHOLDER.LATITUDE}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='location_longitude'
            label={messages['common.location_longitude']}
            register={register}
            errorInstance={errors}
            placeholder={FORM_PLACEHOLDER.LONGITUDE}
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
            required
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
      </Grid>
    </HookFormMuiModal>
  );
};

export default AssociationProfileEditPopup;
