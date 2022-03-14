import React, {useCallback, useState} from 'react';
import {Divider, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {
  EducationLevelCodePHD,
  EducationLevelCodeWithBoard,
  EducationLevelCodeWithGroup,
  EducationLevelForMajorGroup,
  ResultCodeAppeared,
  ResultCodeDivisions,
  ResultCodeGrade,
} from '../../youth/profile/utilities/EducationEnums';
import {passingYears} from '../../../@softbd/utilities/helpers';

type Props = {
  id: string;
  isLoading?: boolean;
  register: any;
  errors: any;
  control: any;
  educationsData: any;
};

const AcademicQualificationFieldArray = ({
  id,
  isLoading,
  register,
  errors,
  control,
  educationsData,
}: Props) => {
  const {messages} = useIntl();

  const [selectedEducationLevel, setSelectedEducationLevel] =
    useState<any>(null);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const onEducationLevelChange = useCallback(
    (eduLevelId: number | undefined) => {
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
    (resultId: number | undefined) => {
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

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <CustomFilterableFormSelect
            required
            id={`${id}[education_level_id]`}
            label={messages['education.education_level']}
            isLoading={false}
            control={control}
            options={educationsData?.education_level_with_degrees}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={onEducationLevelChange}
          />
        </Grid>

        {selectedEducationLevel &&
          selectedEducationLevel.code != EducationLevelCodePHD && (
            <Grid item xs={12} md={3}>
              <CustomFilterableFormSelect
                required
                id={`${id}[exam_degree_id]`}
                label={messages['education.education_exam_degree']}
                isLoading={false}
                control={control}
                options={selectedEducationLevel?.exam_degrees}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
          )}

        {selectedEducationLevel &&
          selectedEducationLevel.code == EducationLevelCodePHD && (
            <React.Fragment>
              <Grid item xs={12} md={3}>
                <CustomTextInput
                  id={`${id}[exam_degree_name]`}
                  label={messages['education.education_exam_degree_name_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <CustomTextInput
                  id={`${id}[exam_degree_name_en]`}
                  label={messages['education.education_exam_degree_name_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>
            </React.Fragment>
          )}

        <Grid item xs={12} md={3}>
          <CustomTextInput
            required={
              selectedEducationLevel &&
              EducationLevelForMajorGroup.includes(selectedEducationLevel.code)
            }
            id={`${id}[major_or_concentration]`}
            label={messages['education.major_group_name_bn']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <CustomTextInput
            id={`${id}[major_or_concentration_en]`}
            label={messages['education.major_group_name_en']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>

        {selectedEducationLevel &&
          EducationLevelCodeWithBoard.includes(selectedEducationLevel.code) && (
            <Grid item xs={12} md={3}>
              <CustomFilterableFormSelect
                required
                id={`${id}[edu_board_id]`}
                label={messages['education.board']}
                isLoading={false}
                control={control}
                options={educationsData?.edu_boards}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
          )}
        {selectedEducationLevel &&
          EducationLevelCodeWithGroup.includes(selectedEducationLevel.code) && (
            <Grid item xs={12} md={3}>
              <CustomFilterableFormSelect
                required
                id={`${id}[edu_group_id]`}
                label={messages['education.group']}
                isLoading={false}
                control={control}
                options={educationsData?.edu_groups}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
          )}

        <Grid item xs={12} md={3}>
          <CustomTextInput
            required
            id={`${id}[institute_name]`}
            label={messages['common.institute_name']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomTextInput
            id={`${id}[institute_name_en]`}
            label={messages['common.institute_name_en']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <CustomFilterableFormSelect
            required
            id={`${id}[result]`}
            label={messages['education.result']}
            isLoading={false}
            control={control}
            options={educationsData?.result}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={onResultChange}
          />
        </Grid>

        {selectedResult && ResultCodeDivisions.includes(selectedResult.code) && (
          <Grid item xs={12} md={3}>
            <CustomTextInput
              required
              id={`${id}[marks_in_percentage]`}
              type={'number'}
              label={messages['education.marks']}
              register={register}
              errorInstance={errors}
              isLoading={false}
            />
          </Grid>
        )}

        {selectedResult && selectedResult.code == ResultCodeGrade && (
          <Grid item xs={12} md={3}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomTextInput
                  required
                  id={`${id}[cgpa_scale]`}
                  type={'number'}
                  inputProps={{
                    step: 0.01,
                  }}
                  label={messages['education.cgpa_scale']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  required
                  id={`${id}[cgpa]`}
                  type={'number'}
                  inputProps={{
                    step: 0.01,
                  }}
                  label={messages['education.cgpa']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        {selectedResult && selectedResult.code != ResultCodeAppeared && (
          <Grid item xs={12} md={3}>
            <CustomFilterableFormSelect
              required
              id={`${id}[year_of_passing]`}
              label={messages['education.passing_year']}
              isLoading={false}
              control={control}
              options={passingYears()}
              optionValueProp={'year'}
              optionTitleProp={['year']}
              errorInstance={errors}
            />
          </Grid>
        )}

        {selectedResult && selectedResult.code == ResultCodeAppeared && (
          <Grid item xs={12} md={3}>
            <CustomFilterableFormSelect
              required
              id={`${id}[expected_year_of_passing]`}
              label={messages['education.expected_passing_year']}
              isLoading={false}
              control={control}
              options={passingYears()}
              optionValueProp={'year'}
              optionTitleProp={['year']}
              errorInstance={errors}
            />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <CustomTextInput
            id={`${id}[duration]`}
            label={messages['education.duration']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider
            orientation={'vertical'}
            sx={{
              width: '100%',
              height: '2px',
              background: '#bcbcbc',
              border: 'none',
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AcademicQualificationFieldArray;
