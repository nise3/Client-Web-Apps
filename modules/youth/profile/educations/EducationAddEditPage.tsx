import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
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
import CustomCheckbox from '../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import {useFetchCountries} from '../../../../services/locationManagement/hooks';

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
  education_level_id: '',
  institute_name: '',
  is_foreign_institute: false,
  exam_degree_id: '',
  edu_board_id: '',
  edu_group_id: '',
  foreign_institute_country_id: '',
  result: '',
  year_of_passing: '',
};

const divisionResultCodes = [
  'FIRST_DIVISION',
  'SECOND_DIVISION',
  'THIRD_DIVISION',
];

const gradeCode = 'GRADE';
const educationLevelCodePHD = 'PHD';

const educationLevelCodeWithGroup = [
  'PSC_5_PASS',
  'JSC_JDC_8_PASS',
  'SECONDARY',
  'HIGHER_SECONDARY',
  'DIPLOMA',
];

const educationLevelCodeWithBoard = [
  'PSC_5_PASS',
  'JSC_JDC_8_PASS',
  'SECONDARY',
  'HIGHER_SECONDARY',
];

const EducationAddEditPage: FC<EducationAddEditPageProps> = ({
  itemId,
  onClose: onEducationEditPageClose,
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

  const [countryFilters] = useState<any>({});
  const {data: countries, isLoading: isLoadingCountries} =
    useFetchCountries(countryFilters);

  const [isForeignInstitute, setIsForeignInstitute] = useState<boolean>(false);
  const [selectedEducationLevel, setSelectedEducationLevel] =
    useState<any>(null);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      institute_name: yup
        .string()
        .title()
        .label(messages['common.institute_name_bn'] as string),
      education_level_id: yup
        .string()
        .required()
        .label(messages['education.education_level'] as string),
      edu_board_id:
        selectedEducationLevel &&
        educationLevelCodeWithBoard.includes(selectedEducationLevel.code)
          ? yup
              .string()
              .required()
              .label(messages['education.board'] as string)
          : yup.string(),
      edu_group_id:
        selectedEducationLevel &&
        educationLevelCodeWithGroup.includes(selectedEducationLevel.code)
          ? yup
              .string()
              .required()
              .label(messages['education.group'] as string)
          : yup.string(),
      result: yup
        .string()
        .required()
        .label(messages['education.result'] as string),
      year_of_passing: yup
        .string()
        .required()
        .label(messages['education.passing_year'] as string),
    });
  }, [messages, selectedEducationLevel]);

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
        education_level_id: itemData?.education_level_id,
        exam_degree_id: itemData?.exam_degree_id,
        major_or_concentration: itemData?.major_or_concentration,
        major_or_concentration_en: itemData?.major_or_concentration_en,
        edu_board_id: itemData?.edu_board_id,
        edu_group_id: itemData?.edu_group_id,
        foreign_institute_country_id: itemData?.foreign_institute_country_id,
        result: itemData?.result,
        marks_in_percentage: itemData?.marks_in_percentage,
        cgpa_scale: itemData?.cgpa_scale,
        cgpa: itemData?.cgpa,
        year_of_passing: itemData?.year_of_passing,
        duration: itemData?.duration,
        achievements: itemData?.achievements,
        achievements_en: itemData?.achievements_en,
      });
      setIsForeignInstitute(itemData?.is_foreign_institute == 1);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onEducationLevelChange = useCallback(
    (eduLevelId: number) => {
      if (eduLevelId) {
        const educationLevel =
          educationsData?.education_level_with_degrees.filter(
            (educationLevel: any) => educationLevel.id == eduLevelId,
          );

        setSelectedEducationLevel(
          Array.isArray(educationLevel) ? educationLevel[0] : educationLevel,
        );
      } else {
        setSelectedEducationLevel(null);
      }
    },
    [educationsData],
  );

  const onResultChange = useCallback(
    (resultId: number) => {
      if (resultId) {
        const result = educationsData?.result.filter(
          (res: any) => res.id == resultId,
        );
        setSelectedResult(Array.isArray(result) ? result[0] : result);
      } else {
        setSelectedResult(null);
      }
    },
    [educationsData],
  );

  const onSubmit: SubmitHandler<YouthEducation> = async (
    data: YouthEducation,
  ) => {
    data.is_foreign_institute = 1;
    if (!isForeignInstitute) {
      data.is_foreign_institute = 0;
      delete data.foreign_institute_country_id;
    }

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
              <CustomFormSelect
                id='education_level_id'
                label={messages['education.education_level']}
                isLoading={isLoadingEducationsData}
                control={control}
                options={educationsData?.education_level_with_degrees}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={onEducationLevelChange}
              />
            </Grid>

            {selectedEducationLevel &&
              selectedEducationLevel.code != educationLevelCodePHD && (
                <Grid item xs={12} md={6}>
                  <CustomFormSelect
                    id='exam_degree_id'
                    label={messages['education.education_exam_degree']}
                    isLoading={isLoadingEducationsData}
                    control={control}
                    options={selectedEducationLevel?.exam_degrees}
                    optionValueProp={'id'}
                    optionTitleProp={['title']}
                    errorInstance={errors}
                  />
                </Grid>
              )}

            {selectedEducationLevel &&
              selectedEducationLevel.code == educationLevelCodePHD && (
                <React.Fragment>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='exam_degree_name'
                      label={
                        messages['education.education_exam_degree_name_bn']
                      }
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='exam_degree_name_en'
                      label={
                        messages['education.education_exam_degree_name_en']
                      }
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                </React.Fragment>
              )}

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='major_or_concentration'
                label={messages['education.major_group_name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='major_or_concentration_en'
                label={messages['education.major_group_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='edu_board_id'
                label={messages['education.board']}
                isLoading={isLoadingEducationsData}
                control={control}
                options={educationsData?.edu_boards}
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

            <Grid item xs={12}>
              <CustomCheckbox
                id='is_foreign_institute'
                label={messages['education.is_foreign_institute']}
                register={register}
                errorInstance={errors}
                checked={isForeignInstitute}
                onChange={() => {
                  setIsForeignInstitute((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>

            {isForeignInstitute && (
              <Grid item xs={12} md={6}>
                <CustomFormSelect
                  id='foreign_institute_country_id'
                  label={messages['education.foreign_institute_country']}
                  isLoading={isLoadingCountries}
                  control={control}
                  options={countries}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='result'
                label={messages['education.result']}
                isLoading={isLoadingCountries}
                control={control}
                options={educationsData?.result}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={onResultChange}
              />
            </Grid>

            {selectedResult &&
              divisionResultCodes.includes(selectedResult.code) && (
                <Grid item xs={12} md={6}>
                  <CustomTextInput
                    id='marks_in_percentage'
                    label={messages['education.marks']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                  />
                </Grid>
              )}

            {selectedResult && selectedResult.code == gradeCode && (
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={6}>
                    <CustomTextInput
                      id='cgpa_scale'
                      label={messages['education.cgpa_scale']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <CustomTextInput
                      id='cgpa'
                      label={messages['education.cgpa']}
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
                id='year_of_passing'
                label={messages['education.passing_year']}
                isLoading={isLoading}
                control={control}
                options={passingYears()}
                optionValueProp={'year'}
                optionTitleProp={['year']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='duration'
                label={messages['education.duration']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='achievements'
                label={messages['education.achievements_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='achievements_en'
                label={messages['education.achievements_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default EducationAddEditPage;
