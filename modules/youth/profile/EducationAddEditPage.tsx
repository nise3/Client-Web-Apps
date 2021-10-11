import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
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
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {Grid, Zoom, Box} from '@mui/material';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomHookForm from './component/CustomHookForm';
import {
  useFetchEducation,
  useFetchEducationExamsBoardsEduGroupsAndSubjects,
} from '../../../services/youthManagement/hooks';
import {YouthEducation} from '../../../services/youthManagement/typing';
import {
  createEducation,
  updateEducation,
} from '../../../services/youthManagement/EducationService';
import ResultType from './utilities/ResultType';

interface EducationAddEditPageProps {
  itemId: number | null;
  onClose: () => void;
}

const passingYears = () => {
  let passingYearsArray = [];
  for (let i = 2021; i > 1971; i--) {
    passingYearsArray.push({year: i});
  }
  return passingYearsArray;
};

const initialValues = {
  exam: '',
  board: '',
  institution: '',
  roll_no: '',
  reg_no: '',
  group: '',
  result_type: '',
  result: '',
  passing_year: '',
};

const EducationAddEditPage: FC<EducationAddEditPageProps> = ({
  itemId,
  onClose: onEducationEditPageClose,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const {
    data: itemData,
    isLoading,
    mutate: mutateEducation,
  } = useFetchEducation(itemId);
  const {data: educationsData, isLoading: isLoadingEducationsData} =
    useFetchEducationExamsBoardsEduGroupsAndSubjects();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      exam: yup
        .string()
        .label(messages['education.exam'] as string)
        .required(),
      board: yup.string().label(messages['education.board'] as string),
      institution: yup
        .string()
        .label(messages['education.institution'] as string),
      roll_no: yup.string().label(messages['education.roll_no'] as string),
      reg_no: yup.string().label(messages['education.reg_no'] as string),
      group: yup.string().label(messages['education.group'] as string),
      result_type: yup
        .string()
        .label(messages['education.result_type'] as string),
      result: yup.string().label(messages['education.result'] as string),
      passing_year: yup
        .string()
        .label(messages['education.passing_year'] as string),
    });
  }, [messages]);

  const resultTypes = useMemo(
    () => [
      {
        id: ResultType.DIVISION,
        label: messages['common.result_type_division'],
      },
      {
        id: ResultType.GRADE_POINT,
        label: messages['common.result_type_grade'],
      },
    ],
    [messages],
  );

  const {
    control,
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const isEdit = itemId != null;

  console.log('item id: ', itemId);
  console.log('all: ', educationsData);

  useEffect(() => {
    if (itemData) {
      reset({
        exam: itemData.exam,
        board: itemData?.board,
        institution: itemData?.institution,
        roll_no: itemData?.roll_no,
        reg_no: itemData?.reg_no,
        group: itemData?.group,
        result_type: itemData?.result_type,
        result: itemData?.result,
        passing_year: itemData?.passing_year,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<YouthEducation> = async (
    data: YouthEducation,
  ) => {
    const response = itemId
      ? await updateEducation(itemId, data)
      : await createEducation(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='education.label' />}}
        />,
      );
      mutateEducation();
      onEducationEditPageClose();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='education.label' />}}
        />,
      );
      onEducationEditPageClose();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Zoom in={true}>
      <Box>
        <CustomHookForm
          title={messages['education.label']}
          handleSubmit={handleSubmit(onSubmit)}
          actions={
            <React.Fragment>
              <CancelButton
                onClick={onEducationEditPageClose}
                isLoading={isLoading}
              />
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </React.Fragment>
          }
          onClose={onEducationEditPageClose}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='institute_name'
                label={messages['institute.label']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='institute_name_en'
                label={messages['institute.label']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='examination_id'
                label={messages['education.exam']}
                isLoading={isLoadingEducationsData}
                control={control}
                options={educationsData?.examinations}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='board_id'
                label={messages['education.board']}
                isLoading={isLoadingEducationsData}
                control={control}
                options={educationsData?.boards}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='edu_group_id'
                label={messages['education.group']}
                isLoading={isLoadingEducationsData}
                control={control}
                options={educationsData?.edu_groups}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='major_or_subject_id'
                label={messages['education.major_subject']}
                isLoading={isLoadingEducationsData}
                control={control}
                options={educationsData?.major_subjects}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='roll_number'
                label={messages['education.roll_no']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='registration_number'
                label={messages['education.reg_no']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='result_type'
                label={messages['education.result_type']}
                isLoading={isLoading}
                control={control}
                options={resultTypes}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='division_type_result'
                label={messages['education.result']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='cgpa_gpa_max_value'
                label={messages['education.result']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
              <CustomTextInput
                id='received_cgpa_gpa'
                label={messages['education.result']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='passing_year'
                label={messages['education.passing_year']}
                isLoading={isLoading}
                control={control}
                options={passingYears()}
                optionValueProp={'year'}
                optionTitleProp={['year']}
                errorInstance={errors}
              />
            </Grid>
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default EducationAddEditPage;
