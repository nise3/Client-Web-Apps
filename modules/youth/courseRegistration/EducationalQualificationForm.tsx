import React, {FC, useCallback, useState} from 'react';
import {Grid} from '@mui/material';
import CourseConfigKeys from '../../../@softbd/utilities/CourseConfigKeys';
import SectionPscForm from './educationQualification/SectionPSCForm';
import {useFetchEducationExamsBoardsEduGroupsAndSubjects} from '../../../services/youthManagement/hooks';
import SectionJscForm from './educationQualification/SectionJSCForm';
import SectionSscForm from './educationQualification/SectionSSCForm';
import SectionHscForm from './educationQualification/SectionHSCForm';
import SectionHonoursForm from './educationQualification/SectionHonoursForm';
import SectionMastersForm from './educationQualification/SectionMastersForm';
import {useFetchCountries} from '../../../services/locationManagement/hooks';
import SectionPhdForm from './educationQualification/SectionPhdForm';
import SectionDiplomaForm from './educationQualification/SectionDiplomaForm';
import {EducationLevel} from '../profile/utilities/EducationEnums';

interface EducationalQualificationFormProps {
  register: any;
  errors: any;
  control: any;
  visibleFieldKeys: Array<string>;
}

const EducationalQualificationForm: FC<EducationalQualificationFormProps> = ({
  register,
  errors,
  control,
  visibleFieldKeys,
}) => {
  const {data: educationsData} =
    useFetchEducationExamsBoardsEduGroupsAndSubjects();
  const [countryFilters] = useState<any>({});
  const {data: countries} = useFetchCountries(countryFilters);

  const getExamDegreesByLevel = useCallback(
    (levelCode: string) => {
      return educationsData?.education_level_with_degrees?.find(
        (eduLevel: any) => eduLevel.code == levelCode,
      )?.exam_degrees;
    },
    [educationsData],
  );

  return (
    <Grid container spacing={2}>
      {visibleFieldKeys &&
        visibleFieldKeys.includes(CourseConfigKeys.EDUCATION_PSC_KEY) && (
          <Grid item xs={12}>
            <SectionPscForm
              errors={errors}
              control={control}
              register={register}
              examDegrees={getExamDegreesByLevel(EducationLevel.PSC)}
              eduBoards={educationsData?.edu_boards}
              countries={countries}
              result={educationsData?.result}
            />
          </Grid>
        )}
      {visibleFieldKeys &&
        visibleFieldKeys.includes(CourseConfigKeys.EDUCATION_JSC_KEY) && (
          <Grid item xs={12}>
            <SectionJscForm
              errors={errors}
              control={control}
              register={register}
              examDegrees={getExamDegreesByLevel(EducationLevel.JSC)}
              eduBoards={educationsData?.edu_boards}
              countries={countries}
              result={educationsData?.result}
            />
          </Grid>
        )}
      {visibleFieldKeys &&
        visibleFieldKeys.includes(CourseConfigKeys.EDUCATION_SSC_KEY) && (
          <Grid item xs={12}>
            <SectionSscForm
              errors={errors}
              control={control}
              register={register}
              examDegrees={getExamDegreesByLevel(EducationLevel.SSC)}
              eduBoards={educationsData?.edu_boards}
              eduGroups={educationsData?.edu_groups}
              countries={countries}
              result={educationsData?.result}
            />
          </Grid>
        )}
      {visibleFieldKeys &&
        visibleFieldKeys.includes(CourseConfigKeys.EDUCATION_HSC_KEY) && (
          <Grid item xs={12}>
            <SectionHscForm
              errors={errors}
              control={control}
              register={register}
              examDegrees={getExamDegreesByLevel(EducationLevel.HSC)}
              eduBoards={educationsData?.edu_boards}
              eduGroups={educationsData?.edu_groups}
              countries={countries}
              result={educationsData?.result}
            />
          </Grid>
        )}
      {visibleFieldKeys &&
        visibleFieldKeys.includes(CourseConfigKeys.EDUCATION_DIPLOMA_KEY) && (
          <Grid item xs={12}>
            <SectionDiplomaForm
              errors={errors}
              control={control}
              register={register}
              examDegrees={getExamDegreesByLevel(EducationLevel.DIPLOMA)}
              countries={countries}
              result={educationsData?.result}
            />
          </Grid>
        )}
      {visibleFieldKeys &&
        visibleFieldKeys.includes(CourseConfigKeys.EDUCATION_HONOURS_KEY) && (
          <Grid item xs={12}>
            <SectionHonoursForm
              errors={errors}
              control={control}
              register={register}
              examDegrees={getExamDegreesByLevel(EducationLevel.HONOURS)}
              countries={countries}
              result={educationsData?.result}
            />
          </Grid>
        )}
      {visibleFieldKeys &&
        visibleFieldKeys.includes(CourseConfigKeys.EDUCATION_MASTERS_KEY) && (
          <Grid item xs={12}>
            <SectionMastersForm
              errors={errors}
              control={control}
              register={register}
              examDegrees={getExamDegreesByLevel(EducationLevel.MASTERS)}
              countries={countries}
              result={educationsData?.result}
            />
          </Grid>
        )}
      {visibleFieldKeys &&
        visibleFieldKeys.includes(CourseConfigKeys.EDUCATION_PHD_KEY) && (
          <Grid item xs={12}>
            <SectionPhdForm
              errors={errors}
              control={control}
              register={register}
              countries={countries}
              result={educationsData?.result}
            />
          </Grid>
        )}
    </Grid>
  );
};

export default EducationalQualificationForm;
