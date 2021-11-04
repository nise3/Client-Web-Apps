import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import Genders from '../../../@softbd/utilities/Genders';
import {nationalities} from '../../../@softbd/utilities/Nationalities';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import PhysicalDisabilityStatus from '../../../@softbd/utilities/PhysicalDisabilityStatus';
import PhysicalDisabilities from '../../../@softbd/utilities/PhysicalDisabilities';
import MaritalStatus from '../../../@softbd/utilities/MaritalStatus';
import FreedomFighterStatus from '../../../@softbd/utilities/FreedomFighterStatus';
import Religions from '../../../@softbd/utilities/Religions';
import CourseConfigKeys from '../../../@softbd/utilities/CourseConfigKeys';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {
  useFetchPublicPrograms,
  useFetchPublicTrainingCenters,
} from '../../../services/youthManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';

interface PersonalInfoFormProps {
  course: any;
  register: any;
  errors: any;
  control: any;
  getValues: any;
  visibleFieldKeys: Array<string>;
}

const PersonalInfoForm: FC<PersonalInfoFormProps> = ({
  course,
  register,
  errors,
  control,
  getValues,
  visibleFieldKeys,
}) => {
  const {messages} = useIntl();
  const [trainingCenterFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
    institute_id: course?.institute_id,
  });
  const {data: trainingCenters, isLoading: isLoadingTrainingCenters} =
    useFetchPublicTrainingCenters(trainingCenterFilters);
  const [programmeFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
    institute_id: course?.institute_id,
  });
  const {data: programmes, isLoading: isLoadingProgrammes} =
    useFetchPublicPrograms(programmeFilters);

  const [disabilityStatus, setDisabilityStatus] = useState<number>(
    PhysicalDisabilityStatus.NO,
  );
  const [isBelongToEthnicGroup, setIsBelongToEthnicGroup] =
    useState<boolean>(false);

  useEffect(() => {
    if (getValues) {
      const doesBelongsToEthnicGroup: any = getValues(
        'does_belong_to_ethnic_group',
      );

      setIsBelongToEthnicGroup(doesBelongsToEthnicGroup);
    }
  }, [getValues]);

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

  const onDisabilityStatusChange = useCallback((value: number) => {
    setDisabilityStatus(value);
  }, []);

  return (
    <Grid container spacing={2}>
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
          required
          id='last_name'
          label={messages['common.last_name_bn']}
          register={register}
          errorInstance={errors}
          isLoading={false}
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

      <Grid item xs={12} md={6}>
        <CustomTextInput
          required
          id='mobile'
          label={messages['common.mobile']}
          register={register}
          errorInstance={errors}
          isLoading={false}
          inputProps={{
            disabled: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          required
          id='email'
          label={messages['common.email']}
          register={register}
          errorInstance={errors}
          isLoading={false}
          inputProps={{
            disabled: true,
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomFilterableFormSelect
          required
          id='training_center_id'
          label={messages['training_center.label']}
          isLoading={isLoadingTrainingCenters}
          control={control}
          options={trainingCenters}
          optionValueProp={'id'}
          optionTitleProp={['title_en', 'title']}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CustomFilterableFormSelect
          id='programme_id'
          label={messages['programme.label']}
          isLoading={isLoadingProgrammes}
          control={control}
          options={programmes}
          optionValueProp='id'
          optionTitleProp={['title_en', 'title']}
          errorInstance={errors}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomDateTimeField
          required
          id='date_of_birth'
          label={messages['common.date_of_birth']}
          register={register}
          errorInstance={errors}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomFilterableFormSelect
          required
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

      <Grid item xs={12} md={6}>
        <CustomFilterableFormSelect
          required
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

      <Grid item xs={12} md={6}>
        <CustomFilterableFormSelect
          required
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

      {visibleFieldKeys &&
        visibleFieldKeys.includes(CourseConfigKeys.FREEDOM_FIGHTER_KEY) && (
          <Grid item xs={12} md={6}>
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
        )}

      {visibleFieldKeys &&
        visibleFieldKeys.includes(CourseConfigKeys.DISABILITY_KEY) && (
          <React.Fragment>
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
                defaultValue={'0'}
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
          </React.Fragment>
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

      {visibleFieldKeys &&
        visibleFieldKeys.includes(CourseConfigKeys.ETHNIC_GROUP_KEY) && (
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
        )}

      {/*<Grid item xs={12}>
        <label htmlFor='contained-button-file'>
          <Button variant='contained' color='primary' component='label'>
            Upload passport size photo
            <input
              type='file'
              accept='image/*'
              // onChange={imageHandler}
              hidden
            />
          </Button>
        </label>

        <label htmlFor='contained-button-file'>
          <Button variant='contained' color='primary' component='label'>
            Upload signature
            <input
              type='file'
              accept='image/*'
              // onChange={imageHandler}
              hidden
            />
          </Button>
        </label>
      </Grid>*/}
    </Grid>
  );
};

export default PersonalInfoForm;
