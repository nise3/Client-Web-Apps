import React, {FC, useCallback, useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import {Box, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomCheckbox from '../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import {
  ResultCodeAppeared,
  ResultCodeDivisions,
  ResultCodeGrade,
} from '../../profile/utilities/EducationEnums';
import {passingYears} from '../../../../@softbd/utilities/helpers';
import CustomFilterableFormSelect from '../../../../@softbd/elements/input/CustomFilterableFormSelect';

interface SectionSSCFormProps {
  errors: any;
  control: any;
  register: any;
  getValues: any;
  examDegrees: Array<any>;
  eduBoards: Array<any>;
  eduGroups: Array<any>;
  countries: Array<any>;
  result: Array<any>;
}

const SectionSscForm: FC<SectionSSCFormProps> = ({
  errors,
  register,
  control,
  getValues,
  examDegrees,
  eduBoards,
  countries,
  result,
  eduGroups,
}) => {
  const {messages} = useIntl();
  const [isForeignInstitute, setIsForeignInstitute] = useState<boolean>(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  useEffect(() => {
    if (getValues) {
      const sscInfo: any = getValues('ssc_info');
      const isForeignInstituteValue: any = sscInfo?.is_foreign_institute;

      setIsForeignInstitute(isForeignInstituteValue);
      if (sscInfo.result) {
        onResultChange(sscInfo.result);
      }
    }
  }, [getValues, result]);

  const onResultChange = useCallback(
    (resultId: number | undefined) => {
      if (resultId) {
        const filteredResult = result.filter((res: any) => res.id == resultId);
        setSelectedResult(
          Array.isArray(filteredResult) ? filteredResult[0] : filteredResult,
        );
      } else {
        setSelectedResult(null);
      }
    },
    [result],
  );

  return (
    <Box sx={{boxShadow: '0px 0px 5px 5px #e9e9e9', padding: '15px'}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={'h6'}>
            {messages['course_registration.education_ssc_title']}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='ssc_info[exam_degree_id]'
            label={messages['education.education_exam_degree']}
            isLoading={false}
            control={control}
            options={examDegrees}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='ssc_info[edu_group_id]'
            label={messages['education.group']}
            isLoading={false}
            control={control}
            options={eduGroups}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='ssc_info[edu_board_id]'
            label={messages['education.board']}
            isLoading={false}
            control={control}
            options={eduBoards}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='ssc_info[institute_name]'
            label={messages['common.institute_name_bn']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='ssc_info[institute_name_en]'
            label={messages['common.institute_name_en']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomCheckbox
            id='ssc_info[is_foreign_institute]'
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

        {Boolean(isForeignInstitute) && (
          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              required
              id='ssc_info[foreign_institute_country_id]'
              label={messages['education.foreign_institute_country']}
              isLoading={false}
              control={control}
              options={countries}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              errorInstance={errors}
            />
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='ssc_info[result]'
            label={messages['education.result']}
            isLoading={false}
            control={control}
            options={result}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={onResultChange}
          />
        </Grid>

        {selectedResult && ResultCodeDivisions.includes(selectedResult.code) && (
          <Grid item xs={12} md={6}>
            <CustomTextInput
              id='ssc_info[marks_in_percentage]'
              type={'number'}
              label={messages['education.marks']}
              register={register}
              errorInstance={errors}
              isLoading={false}
            />
          </Grid>
        )}

        {selectedResult && selectedResult.code == ResultCodeGrade && (
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6} md={6}>
                <CustomTextInput
                  id='ssc_info[cgpa_scale]'
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
              <Grid item xs={6} md={6}>
                <CustomTextInput
                  id='ssc_info[cgpa]'
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
          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              required
              id='ssc_info[year_of_passing]'
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
          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              required
              id='ssc_info[expected_year_of_passing]'
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
      </Grid>
    </Box>
  );
};

export default SectionSscForm;
