import {Box, FormControlLabel, Grid, Switch, Zoom} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {getMomentDateFormat} from '../../../../@softbd/utilities/helpers';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../../@softbd/libs/yup';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../../../@softbd/elements/input/CustomDateTimeField';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import {
  useFetchJobExperience,
  useFetchPublicAreaOfBusiness,
  useFetchPublicAreaOfExperience,
} from '../../../../services/youthManagement/hooks';
import {
  createJobExperience,
  updateJobExperience,
} from '../../../../services/youthManagement/JobExperienceService';
import {YouthJobExperience} from '../../../../services/youthManagement/typing';
import CustomHookForm from '../component/CustomHookForm';
import useSuccessMessage from '../../../../@softbd/hooks/useSuccessMessage';
import CustomFilterableFormSelect from '../../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomSelectAutoComplete from '../../registration/CustomSelectAutoComplete';

interface JobExperienceAddEditProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  company_name: '',
  company_name_en: '',
  position: '',
  position_en: '',
  employment_type_id: '',
  location: '',
  location_en: '',
  job_responsibilities: '',
  job_responsibilities_en: '',
  start_date: '',
  end_date: '',
  is_currently_working: 1,
  area_of_experiences: [],
  area_of_businesses: [],
};

const JobExperienceAddEditPage: FC<JobExperienceAddEditProps> = ({
  itemId,
  onClose: closeJobExperienceAddEditPage,
}: JobExperienceAddEditProps) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {
    data: itemData,
    mutate: jobExperienceMutate,
    isLoading,
  } = useFetchJobExperience(itemId);
  const [currentWorkStatus, setCurrentWorkStatus] = useState<number>(1);

  const {data: areaOfBusinessData, isLoading: isLoadingAreaOfBusinessData} =
    useFetchPublicAreaOfBusiness();
  const {data: areaOfExperienceData, isLoading: isLoadingAreaOfExperienceData} =
    useFetchPublicAreaOfExperience();

  const [selectedAreaOfBusinessList, setSelectedAreaOfBusinessList] =
    useState<any>([]);
  const [selectedAreaOfExperienceList, setSelectedAreaOfExperienceList] =
    useState<any>([]);
  const employmentTypes = [
    {
      id: 1,
      title: messages['job_posting.employment_status_full_time'],
      title_en: 'Full-time',
    },
    {
      id: 2,
      title: messages['job_posting.employment_status_part_time'],
      title_en: 'Part-time',
    },
    {
      id: 3,
      title: messages['common.casual'],
      title_en: 'Casual',
    },
    {
      id: 4,
      title: 'ইন্টার্নশীপ',
      title_en: 'Apprentice/Trainee',
    },
  ];

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      company_name: yup
        .string()
        .required()
        .label(messages['common.company_name_bn'] as string),
      position: yup
        .string()
        .required()
        .label(messages['common.post_bn'] as string),
      employment_type_id: yup
        .string()
        .required()
        .label(messages['common.job_type'] as string),
      location: yup
        .string()
        .required()
        .label(messages['common.location_bn'] as string),
      start_date: yup
        .string()
        .trim()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(messages['common.start_date'] as string),
      end_date:
        currentWorkStatus == 0
          ? yup
              .string()
              .required()
              .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
              .label(messages['common.end_date'] as string)
          : yup.string(),
      area_of_experiences: yup
        .array()
        .of(yup.object())
        .min(1, messages['common.must_have_one_area_of_experiences'] as string)
        .label(messages['common.area_of_experience'] as string),
      area_of_businesses: yup
        .array()
        .of(yup.object())
        .min(1, messages['common.must_have_one_area_of_businesses'] as string)
        .label(messages['common.area_of_business'] as string),
    });
  }, [messages, currentWorkStatus]);

  const {
    control,
    handleSubmit,
    register,
    reset,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<YouthJobExperience>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        company_name: itemData.company_name,
        company_name_en: itemData?.company_name_en,
        position: itemData.position,
        position_en: itemData?.position_en,
        location: itemData.location,
        location_en: itemData?.location_en,
        job_responsibilities: itemData?.job_responsibilities,
        job_responsibilities_en: itemData?.job_responsibilities_en,
        start_date: itemData?.start_date
          ? getMomentDateFormat(itemData.start_date, 'YYYY-MM-DD')
          : '',
        end_date: itemData?.end_date
          ? getMomentDateFormat(itemData?.end_date, 'YYYY-MM-DD')
          : '',
        employment_type_id: itemData?.employment_type_id,
        area_of_businesses: itemData?.area_of_businesses,
        area_of_experiences: itemData?.area_of_experiences,
      });
      setCurrentWorkStatus(itemData?.is_currently_working);
      setSelectedAreaOfExperienceList(itemData?.area_of_experiences);
      setSelectedAreaOfBusinessList(itemData?.area_of_businesses);
    } else {
      reset(initialValues);
      setCurrentWorkStatus(initialValues.is_currently_working);
    }
  }, [itemData]);

  const onAreaOfExperienceChange = useCallback((options) => {
    setSelectedAreaOfExperienceList(options);
  }, []);

  const onAreaOfBusinessChange = useCallback((options) => {
    setSelectedAreaOfBusinessList(options);
  }, []);

  const onSubmit: SubmitHandler<YouthJobExperience> = async (
    data: YouthJobExperience,
  ) => {
    data.is_currently_working = currentWorkStatus;
    if (currentWorkStatus == 1) delete data.end_date;

    let areaOfExperienceIds: any = [];
    if (selectedAreaOfExperienceList) {
      selectedAreaOfExperienceList.map((experience: any) => {
        areaOfExperienceIds.push(experience.id);
      });
    }
    data.area_of_experiences = areaOfExperienceIds;

    let areaOfBusinessIds: any = [];
    if (selectedAreaOfBusinessList) {
      selectedAreaOfBusinessList.map((business: any) => {
        areaOfBusinessIds.push(business.id);
      });
    }
    data.area_of_businesses = areaOfBusinessIds;

    try {
      if (itemId) {
        await updateJobExperience(itemId, data);
        updateSuccessMessage('job_experience.label');
      } else {
        await createJobExperience(data);
        createSuccessMessage('job_experience.label');
      }
      jobExperienceMutate();
      closeJobExperienceAddEditPage();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const handleCurrentWorkStatusChange = (event: any) => {
    setCurrentWorkStatus(event.target.checked ? 1 : 0);
  };

  return (
    <Zoom in={true}>
      <Box>
        <CustomHookForm
          title={messages['common.job_experience']}
          handleSubmit={handleSubmit(onSubmit)}
          actions={
            <React.Fragment>
              <CancelButton
                onClick={closeJobExperienceAddEditPage}
                isLoading={isLoading}
              />
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </React.Fragment>
          }
          onClose={closeJobExperienceAddEditPage}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='company_name'
                label={messages['common.company_name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                inputProps={{
                  autofocus: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='company_name_en'
                label={messages['common.company_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='position'
                label={messages['common.post_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='position_en'
                label={messages['common.post_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='location'
                label={messages['common.location_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='location_en'
                label={messages['common.location_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomSelectAutoComplete
                required
                id='area_of_experiences'
                label={messages['common.area_of_experience']}
                isLoading={isLoadingAreaOfExperienceData}
                control={control}
                options={areaOfExperienceData}
                optionValueProp='id'
                optionTitleProp={['title']}
                defaultValue={selectedAreaOfExperienceList}
                errorInstance={errors}
                onChange={onAreaOfExperienceChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectAutoComplete
                required
                id='area_of_businesses'
                label={messages['common.area_of_business']}
                isLoading={isLoadingAreaOfBusinessData}
                control={control}
                options={areaOfBusinessData}
                optionValueProp='id'
                optionTitleProp={['title']}
                defaultValue={selectedAreaOfBusinessList}
                errorInstance={errors}
                onChange={onAreaOfBusinessChange}
              />
            </Grid>

            <Grid item container spacing={2} xs={12} md={12}>
              <Grid item xs={12} md={6}>
                <CustomFilterableFormSelect
                  required
                  id={'employment_type_id'}
                  label={messages['common.job_type']}
                  isLoading={isLoading}
                  control={control}
                  options={employmentTypes}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomDateTimeField
                required
                id='start_date'
                label={messages['job_experience.start_date']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {currentWorkStatus == 0 && (
                <CustomDateTimeField
                  required
                  id='end_date'
                  label={messages['job_experience.end_date']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              )}
              <FormControlLabel
                control={
                  <Switch
                    onChange={handleCurrentWorkStatusChange}
                    checked={currentWorkStatus == 1}
                  />
                }
                label={messages['common.currently_working_here'] as string}
              />
            </Grid>
            <Grid item container spacing={2} xs={12} md={12}>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='job_responsibilities'
                  label={messages['common.job_responsibilities_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                  multiline={true}
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='job_responsibilities_en'
                  label={messages['common.job_responsibilities_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                  multiline={true}
                  rows={3}
                />
              </Grid>
            </Grid>
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default JobExperienceAddEditPage;
