import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../../@softbd/utilities/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../../@softbd/libs/yup';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {Grid, Zoom, Box} from '@mui/material';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomHookForm from '../component/CustomHookForm';
import {
  useFetchEducation,
  useFetchEducationExamsBoardsEduGroupsAndSubjects,
} from '../../../../services/youthManagement/hooks';
import {YouthEducation} from '../../../../services/youthManagement/typing';
import {
  createEducation,
  updateEducation,
} from '../../../../services/youthManagement/EducationService';
import ResultType from '../utilities/ResultType';

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
  institute_name: '',
  institute_name_en: '',
  examination_id: '',
  board_id: '',
  edu_group_id: '',
  major_or_subject_id: '',
  roll_number: '',
  registration_number: '',
  result_type: ResultType.DIVISION,
  division_type_result: '',
  cgpa_gpa_max_value: '',
  received_cgpa_gpa: '',
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
  const [resultType, setResultType] = useState<string>(ResultType.DIVISION);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      institute_name: yup
        .string()
        .title()
        .label(messages['common.institute_name_bn'] as string),
      examination_id: yup
        .string()
        .required()
        .label(messages['education.exam'] as string),
      roll_number: yup
        .string()
        .required()
        .label(messages['education.roll_no'] as string),
      registration_number: yup
        .string()
        .required()
        .label(messages['education.reg_no'] as string),
      result_type: yup
        .string()
        .required()
        .label(messages['education.result_type'] as string),
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

  useEffect(() => {
    if (itemData) {
      reset({
        institute_name: itemData?.institute_name,
        institute_name_en: itemData?.institute_name_en,
        examination_id: itemData?.examination_id,
        board_id: itemData?.board_id,
        edu_group_id: itemData?.edu_group_id,
        major_or_subject_id: itemData?.major_or_subject_id,
        roll_number: itemData?.roll_number,
        registration_number: itemData?.registration_number,
        result_type: itemData?.result_type,
        division_type_result: itemData?.division_type_result,
        cgpa_gpa_max_value: itemData?.cgpa_gpa_max_value,
        received_cgpa_gpa: itemData?.received_cgpa_gpa,
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
                label={messages['common.institute_name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='institute_name_en'
                label={messages['common.institute_name_en']}
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
                optionTitleProp={['label']}
                errorInstance={errors}
                onChange={(type: string) => {
                  setResultType(type);
                }}
              />
            </Grid>
            {resultType == ResultType.DIVISION && (
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='division_type_result'
                  label={messages['education.result']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
            )}
            {resultType == ResultType.GRADE_POINT && (
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={6}>
                    <CustomTextInput
                      id='cgpa_gpa_max_value'
                      label={messages['common.total_cgpa']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <CustomTextInput
                      id='received_cgpa_gpa'
                      label={messages['common.earned_cgpa']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
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
