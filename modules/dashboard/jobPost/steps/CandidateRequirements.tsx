import React, {useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import yup from '../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import {Box, Button, Grid, Typography} from '@mui/material';
import CustomEducationalQualificationFieldArray from '../CustomFieldArrayJobRequirements';
import CustomSelectAutoComplete from '../../../youth/registration/CustomSelectAutoComplete';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import FormRadioButtons from '../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomFilterableFormSelect from '../../../../@softbd/elements/input/CustomFilterableFormSelect';

interface Props {
  onBack: () => void;
  onContinue: () => void;
}
const experienceYears: Array<any> = [];

for (let i = 1; i <= 50; i++) experienceYears.push({id: i, title: i});

const CandidateRequirements = ({onBack, onContinue}: Props) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  const [notExperienced, setNotExperienced] = useState<boolean>(true);
  const demoOptions = [
    {
      id: 1,
      title: 'test1',
    },
    {
      id: 2,
      title: 'test2',
    },
    {
      id: 3,
      title: 'test3',
    },
  ];

  const onChangeIsExperienced = (value: any) => {
    console.log('exper');
    setNotExperienced((prev) => !prev);
  };
  const validationSchema = useMemo(() => {
    return yup.object().shape({});
  }, [messages]);
  const {
    register,
    setError,
    control,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setValue('array_field', [
      {education_level: '', education_exam_degree: '', major_group_name: ''},
    ]);
  }, []);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      console.log('data', data);

      //do data save work here

      onContinue();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Box mt={3} mb={3}>
      <Typography mb={2} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.candidates_requirement']}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant={'h6'}>Educational Qualification</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <CustomEducationalQualificationFieldArray
              id='array_field'
              labelLanguageId={[
                'education.education_level',
                'education.education_exam_degree',
                'education.major_group_name_bn',
              ]}
              isLoading={false}
              control={control}
              register={register}
              errors={errors}
              options={[]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomSelectAutoComplete
              required
              id='preferred_educational_institute'
              label={messages['common.preferred_educational_institute']}
              control={control}
              options={demoOptions}
              optionTitleProp={['title', 'title_en']}
              optionValueProp={'id'}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              id='other_educational_qualification'
              label={messages['common.other_educational_qualification']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomSelectAutoComplete
              id='training_trade_course'
              label={messages['common.training_courses']}
              control={control}
              options={demoOptions}
              optionTitleProp={['title', 'title_en']}
              optionValueProp={'id'}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomSelectAutoComplete
              id='professional_certification'
              label={messages['common.professional_certification']}
              control={control}
              options={demoOptions}
              optionTitleProp={['title', 'title_en']}
              optionValueProp={'id'}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'h6'}>Experience and Business Area</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormRadioButtons
              id='experience_required'
              label={'common.experience_required'}
              radios={[
                {
                  key: '1',
                  label: messages['common.yes'],
                },
                {
                  key: '2',
                  label: messages['common.no'],
                },
              ]}
              control={control}
              defaultValue={'2'}
              isLoading={false}
              onChange={onChangeIsExperienced}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              id={'min_year_of_experience'}
              label={messages['common.min_year_of_experience']}
              isLoading={false}
              control={control}
              options={experienceYears}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              errorInstance={errors}
              isDisabled={notExperienced}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              id={'max_years_of_experience'}
              label={messages['common.max_years_of_experience']}
              isLoading={false}
              control={control}
              options={experienceYears}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              errorInstance={errors}
              isDisabled={notExperienced}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/*<CustomCheckbox
              id='is_permanent_address'
              label={'Freshers are encouraged to apply'}
              register={register}
              errorInstance={errors}
              checked={disabledPermanentAddress}
              onChange={() => {
                onChangeSameAsPresentCheck(!disabledPermanentAddress);
                setDisabledPermanentAddress((prev) => !prev);
              }}
              isLoading={false}
            />*/}
          </Grid>
        </Grid>
        <Box display={'flex'} justifyContent={'space-between'} mt={'15px'}>
          <Button onClick={onBack} variant={'outlined'} color={'primary'}>
            {messages['common.previous']}
          </Button>
          <Button
            disabled={isSubmitting}
            type={'submit'}
            variant={'contained'}
            color={'primary'}>
            {messages['common.save_and_continue']}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CandidateRequirements;
