import {useRouter} from 'next/router';
import {styled} from '@mui/material/styles';
import {Box, Button, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import {
  EmploymentStatus,
  Gender,
  LunchFacilityType,
  SalaryReviewType,
  SalaryShowOption,
  SHOW,
  WorkPlaceTypes,
} from './jobPost/enums/JobPostEnums';
import React, {useCallback} from 'react';
import {H3, S1} from '../../../@softbd/elements/common';
import JobPreviewSubComponent from './jobPost/steps/components/JobPreviewSubComponent';
import {ArrowBack} from '@mui/icons-material';
import {LINK_JOB_LIST} from '../../../@softbd/common/appLinks';
import {useFetchJobPreview} from '../../../services/IndustryManagement/hooks';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';

const PREFIX = 'JobView';

const classes = {
  otherBenefit: `${PREFIX}-otherBenefit`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.otherBenefit}`]: {
    display: 'inline-block',
    textAlign: 'center',
    marginTop: '20px',
    marginLeft: '40px',

    [`& .MuiSvgIcon-root`]: {
      display: 'block',
      margin: 'auto',
      color: theme.palette.primary.light,
    },
  },
  [`& ul>li`]: {
    marginTop: '5px',
  },
}));

const JobViewPage = () => {
  const {messages, formatNumber, formatDate} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();
  const router = useRouter();
  const {jobId} = router.query;
  const {data: jobData} = useFetchJobPreview(String(jobId));

  const getJobNature = () => {
    let jobNature: Array<string> = [];
    if (jobData?.primary_job_information?.employment_types) {
      jobData?.primary_job_information?.employment_types.map((types: any) => {
        switch (types.id) {
          case EmploymentStatus.FULL_TIME:
            jobNature.push(
              messages['job_posting.employment_status_full_time'] as string,
            );
            break;
          case EmploymentStatus.PART_TIME:
            jobNature.push(
              messages['job_posting.employment_status_part_time'] as string,
            );
            break;
          case EmploymentStatus.INTERNSHIP:
            jobNature.push(
              messages['job_posting.employment_status_internship'] as string,
            );
            break;
          case EmploymentStatus.CONTRACTUAL:
            jobNature.push(
              messages['job_posting.employment_status_contractual'] as string,
            );
            break;
          case EmploymentStatus.FREELANCE:
            jobNature.push(
              messages['job_posting.employment_status_freelance'] as string,
            );
            break;
        }
      });
    }
    return jobNature.join(', ');
  };

  const getSalary = () => {
    let salaryText: any = '';

    if (jobData?.additional_job_information?.is_salary_info_show == 1) {
      salaryText =
        '৳ ' +
        formatNumber(jobData?.additional_job_information?.salary_min) +
        ' - ' +
        formatNumber(jobData?.additional_job_information?.salary_max) +
        ` (${messages['common.monthly']})`;
    } else if (jobData?.additional_job_information?.is_salary_info_show == 3) {
      salaryText = messages['common.negotiable'];
    }

    return salaryText;
  };

  const getExperienceText = () => {
    if (jobData?.candidate_requirements?.is_experience_needed == 1) {
      let experienceText: any = '';
      if (
        jobData?.candidate_requirements?.minimum_year_of_experience &&
        jobData?.candidate_requirements?.maximum_year_of_experience
      ) {
        experienceText = (
          <IntlMessages
            id={'job_preview.experience_from_to'}
            values={{
              from: formatNumber(
                jobData?.candidate_requirements?.minimum_year_of_experience,
              ),
              to: formatNumber(
                jobData?.candidate_requirements?.maximum_year_of_experience,
              ),
            }}
          />
        );
      } else if (jobData?.candidate_requirements?.minimum_year_of_experience) {
        experienceText = (
          <IntlMessages
            id={'job_preview.experience_at_least'}
            values={{
              from: formatNumber(
                jobData?.candidate_requirements?.minimum_year_of_experience,
              ),
            }}
          />
        );
      } else if (jobData?.candidate_requirements?.maximum_year_of_experience) {
        experienceText = (
          <IntlMessages
            id={'job_preview.experience_at_most'}
            values={{
              from: formatNumber(
                jobData?.candidate_requirements?.maximum_year_of_experience,
              ),
            }}
          />
        );
      }
      return experienceText;
    } else {
      return messages['common.n_a'];
    }
  };

  const getAgeText = () => {
    let ageText: any = '';

    if (
      jobData?.candidate_requirements?.age_minimum &&
      jobData?.candidate_requirements?.age_maximum
    ) {
      ageText = (
        <IntlMessages
          id={'job_preview.age_from_to'}
          values={{
            from: formatNumber(jobData?.candidate_requirements?.age_minimum),
            to: formatNumber(jobData?.candidate_requirements?.age_maximum),
          }}
        />
      );
    } else if (jobData?.candidate_requirements?.age_minimum) {
      ageText = (
        <IntlMessages
          id={'job_preview.age_at_least'}
          values={{
            from: formatNumber(jobData?.candidate_requirements?.age_minimum),
          }}
        />
      );
    } else if (jobData?.candidate_requirements?.age_maximum) {
      ageText = (
        <IntlMessages
          id={'job_preview.age_at_most'}
          values={{
            from: formatNumber(jobData?.candidate_requirements?.age_minimum),
          }}
        />
      );
    }

    return ageText;
  };

  const getJobContext = () => {
    let strArr: Array<string> = [];
    strArr = jobData?.additional_job_information?.job_context.split('\n');
    if (strArr.length == 1) {
      return strArr[0];
    } else {
      return (
        <ul style={{paddingLeft: '20px'}}>
          {strArr.map((item: string, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
  };

  const getResponsibilities = () => {
    let strArr: Array<string> = [];
    if (jobData?.additional_job_information?.job_responsibilities) {
      strArr =
        jobData?.additional_job_information?.job_responsibilities.split('\n');
    }
    if (strArr.length == 0) {
      return '';
    } else if (strArr.length == 1) {
      return strArr[0];
    } else {
      return (
        <ul style={{paddingLeft: '20px'}}>
          {strArr.map((item: string, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
  };

  const getEducationalRequirements = () => {
    let additionalEducationRequirement: Array<string> = [];
    let isShowNotApplicable = true;

    if (jobData?.candidate_requirements?.other_educational_qualification) {
      additionalEducationRequirement =
        jobData?.candidate_requirements?.other_educational_qualification.split(
          '\n',
        );
    }

    let educationalInstitutes = '';

    if (jobData?.candidate_requirements?.preferred_educational_institutions) {
      educationalInstitutes =
        jobData?.candidate_requirements?.preferred_educational_institutions
          .map((ins: any) => ins.name)
          .join(', ');
    }

    let professionalCertificates = '';

    if (jobData?.candidate_requirements?.professional_certifications) {
      professionalCertificates =
        jobData?.candidate_requirements?.professional_certifications
          .map((cert: any) => cert.title)
          .join(', ');
    }

    let trainingOrTradeCourse = '';

    if (jobData?.candidate_requirements?.trainings) {
      trainingOrTradeCourse = jobData?.candidate_requirements?.trainings
        .map((course: any) => course.title)
        .join(', ');
    }

    let skillText = '';
    if (jobData?.candidate_requirements?.skills) {
      skillText = jobData?.candidate_requirements?.skills
        .map((skill: any) => skill.title)
        .join(', ');
    }

    if (
      additionalEducationRequirement.length > 0 ||
      jobData?.candidate_requirements?.degrees?.length > 0 ||
      educationalInstitutes ||
      professionalCertificates ||
      trainingOrTradeCourse ||
      skillText
    ) {
      isShowNotApplicable = false;
    }

    return (
      <ul style={{paddingLeft: '20px'}}>
        {jobData?.candidate_requirements?.degrees?.map(
          (degree: any, index: number) =>
            degree?.exam_degree ? (
              <li key={index}>
                {degree?.exam_degree?.title}
                {degree?.major_subject ? ' in ' + degree?.major_subject : ''}
              </li>
            ) : (
              <></>
            ),
        )}
        {additionalEducationRequirement.map((req: string, index) => (
          <li key={index}>{req}</li>
        ))}
        {educationalInstitutes && (
          <li>
            {educationalInstitutes}{' '}
            {messages['job_preview.prefer_institute_text']}
          </li>
        )}
        {professionalCertificates && (
          <li>
            {messages['job_preview.professional_cert']}{' '}
            {professionalCertificates}
          </li>
        )}
        {trainingOrTradeCourse && (
          <li>
            {messages['job_preview.training_or_trade']} {trainingOrTradeCourse}
          </li>
        )}
        {skillText && (
          <li>
            {messages['job_preview.skill_required']} {skillText}
          </li>
        )}
        {isShowNotApplicable && <li>{messages['common.n_a']}</li>}
      </ul>
    );
  };

  const getExperienceRequirements = () => {
    if (jobData?.candidate_requirements?.is_experience_needed == 1) {
      let experienceText = getExperienceText();

      let experienceAreas = '';
      if (jobData?.candidate_requirements?.area_of_experiences) {
        experienceAreas = jobData?.candidate_requirements?.area_of_experiences
          ?.map((experience: any) => experience.title)
          .join(', ');
      }

      let experienceBusinessAreas = '';
      if (jobData?.candidate_requirements?.area_of_businesses) {
        experienceBusinessAreas =
          jobData?.candidate_requirements?.area_of_businesses
            ?.map((business: any) => business.title)
            .join(', ');
      }

      let isShowNotApplicable = true;
      if (
        experienceText ||
        jobData?.candidate_requirements?.is_freshers_encouraged == 1 ||
        experienceAreas ||
        experienceBusinessAreas
      ) {
        isShowNotApplicable = false;
      }

      return (
        <ul style={{paddingLeft: '20px'}}>
          <li>{experienceText}</li>
          {jobData?.candidate_requirements?.is_freshers_encouraged == 1 && (
            <li>{messages['job_post.is_fresher_applicable']}</li>
          )}
          {experienceAreas && (
            <li>
              {messages['job_preview.experience_area_label']}
              <ul style={{listStyleType: 'square'}}>
                <li>{experienceAreas}</li>
              </ul>
            </li>
          )}
          {experienceBusinessAreas && (
            <li>
              {messages['job_preview.business_area_label']}
              <ul style={{listStyleType: 'square'}}>
                <li>{experienceBusinessAreas}</li>
              </ul>
            </li>
          )}
          {isShowNotApplicable && <li>{messages['common.n_a']}</li>}
        </ul>
      );
    } else {
      return messages['common.n_a'];
    }
  };

  const getGenderText = () => {
    let male = false;
    let female = false;
    let other = false;
    jobData?.candidate_requirements?.genders.map((gender: any) => {
      switch (gender.gender_id) {
        case Gender.MALE:
          male = true;
          break;
        case Gender.FEMALE:
          female = true;
          break;
        case Gender.OTHERS:
          other = true;
          break;
      }
    });

    if (male && female && other) {
      return messages['job_posting.application_gender_req_all'];
    } else if (male && female) {
      return (
        <IntlMessages
          id={'job_posting.application_gender_req_two'}
          values={{
            gender1: messages['common.male'],
            gender2: messages['common.female'],
          }}
        />
      );
    } else if (male && other) {
      return (
        <IntlMessages
          id={'job_posting.application_gender_req_two'}
          values={{
            gender1: messages['common.male'],
            gender2: messages['common.others'],
          }}
        />
      );
    } else if (female && other) {
      return (
        <IntlMessages
          id={'job_posting.application_gender_req_two'}
          values={{
            gender1: messages['common.female'],
            gender2: messages['common.others'],
          }}
        />
      );
    } else if (male) {
      return (
        <IntlMessages
          id={'job_posting.application_gender_req_one'}
          values={{
            gender: messages['common.male'],
          }}
        />
      );
    } else if (female) {
      return (
        <IntlMessages
          id={'job_posting.application_gender_req_one'}
          values={{
            gender: messages['common.female'],
          }}
        />
      );
    } else {
      return (
        <IntlMessages
          id={'job_posting.application_gender_req_one'}
          values={{
            gender: messages['common.others'],
          }}
        />
      );
    }
  };

  const getAdditionalRequirements = () => {
    let strArr: Array<string> = [];
    if (jobData?.candidate_requirements?.additional_requirements) {
      strArr =
        jobData?.candidate_requirements?.additional_requirements.split('\n');
    }

    let isShowNotApplicable = true;
    if (
      getAgeText() ||
      strArr.length > 0 ||
      jobData?.candidate_requirements?.genders.length > 0 ||
      jobData?.candidate_requirements?.person_with_disability == 1
    ) {
      isShowNotApplicable = false;
    }

    return (
      <ul style={{paddingLeft: '20px'}}>
        {getAgeText() && (
          <li>
            {' '}
            {messages['job_preview_summary.age']} {getAgeText()}
          </li>
        )}
        {jobData?.candidate_requirements?.genders.length > 0 &&
          jobData?.candidate_requirements?.genders.length <= 3 && (
            <li>{getGenderText()}</li>
          )}
        {strArr.map((item: string, index) => (
          <li key={index}>{item}</li>
        ))}
        {jobData?.candidate_requirements?.person_with_disability == 1 && (
          <li>{messages['job_preview.person_with_disability']}</li>
        )}
        {isShowNotApplicable && <li>{messages['common.n_a']}</li>}
      </ul>
    );
  };

  const getWorkplace = () => {
    let workplaceStrArr: Array<string> = [];

    jobData?.additional_job_information?.work_places.map((workplace: any) => {
      if (workplace.work_place_id == WorkPlaceTypes.HOME) {
        workplaceStrArr.push(messages['common.work_from_home'] as string);
      } else if (workplace.work_place_id == WorkPlaceTypes.OFFICE) {
        workplaceStrArr.push(messages['common.work_at_office'] as string);
      }
    });

    return (
      <ul style={{paddingLeft: '20px'}}>
        <li>{workplaceStrArr.join(', ')}</li>
      </ul>
    );
  };

  const otherBenefitComponent = (index: number, id: string, name: string) => {
    return (
      <Box key={index} className={classes.otherBenefit}>
        <img
          src={'/images/jobs/benefit_' + id + '.svg'}
          alt={name}
          style={{display: 'block', margin: 'auto'}}
        />
        {name}
      </Box>
    );
  };

  const getOtherBenefits = () => {
    if (jobData?.additional_job_information?.is_other_benefits == 1) {
      let salaryReviewText = null;
      if (jobData?.additional_job_information?.salary_review) {
        salaryReviewText =
          (messages['job_preview.salary_review'] as string) +
          (jobData?.additional_job_information?.salary_review ==
          SalaryReviewType.YEARLY
            ? messages['common.yearly']
            : messages['common.half_yearly']);
      }
      let lunchFacilitiesText = null;
      if (jobData?.additional_job_information?.lunch_facilities) {
        lunchFacilitiesText =
          (messages['job_preview.lunch_facilities'] as string) +
          (jobData?.additional_job_information?.lunch_facilities ==
          LunchFacilityType.FULL_SUBSIDIZE
            ? messages['common.full_subsidize']
            : messages['common.partially_subsidize']);
      }

      let othersArr: Array<string> = [];
      if (jobData?.additional_job_information?.others) {
        othersArr = jobData?.additional_job_information?.others.split('\n');
      }

      return (
        <React.Fragment>
          <ul style={{paddingLeft: '20px'}}>
            {salaryReviewText && <li>{salaryReviewText}</li>}
            {lunchFacilitiesText && <li>{lunchFacilitiesText}</li>}
            {jobData?.additional_job_information?.festival_bonus && (
              <li>
                {messages['job_preview.festival_bonus']}{' '}
                {jobData?.additional_job_information?.festival_bonus} (
                {messages['common.yearly']})
              </li>
            )}
          </ul>
          <Box
            sx={{
              marginTop: '-15px',
              marginLeft: '-30px',
            }}>
            {(jobData?.additional_job_information?.other_benefits || []).map(
              (otherBenefit: any, index: number) => {
                return otherBenefitComponent(
                  index,
                  otherBenefit?.id,
                  otherBenefit?.title,
                );
              },
            )}
          </Box>

          <ul style={{paddingLeft: '20px'}}>
            {othersArr.map((other: string, index) => (
              <li key={index}>{other}</li>
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      return messages['common.n_a'];
    }
  };

  const getCompanyName = () => {
    if (jobData?.company_info_visibility?.is_company_name_visible == SHOW) {
      if (authUser?.isIndustryAssociationUser) {
        return authUser?.industry_association
          ? authUser?.industry_association?.title
          : '';
      } else if (authUser?.isOrganizationUser) {
        return authUser?.organization ? authUser?.organization?.title : '';
      } else {
        return '';
      }
    } else {
      return jobData?.company_info_visibility?.company_name;
    }
  };

  const onGoBack = useCallback(() => {
    router
      .push({
        pathname: LINK_JOB_LIST,
      })
      .then(() => {});
  }, []);

  return (
    <StyledBox mb={2}>
      <Grid container>
        <Grid item xs={12} md={10} order={{xs: 2, md: 1}}>
          <H3>{jobData?.primary_job_information?.job_title}</H3>
          <S1 fontWeight={'bold'}>{getCompanyName()}</S1>
          <JobPreviewSubComponent title={messages['common.vacancy']}>
            {jobData?.primary_job_information?.no_of_vacancies
              ? formatNumber(jobData?.primary_job_information?.no_of_vacancies)
              : messages['common.n_a']}
          </JobPreviewSubComponent>

          {jobData?.additional_job_information?.job_context && (
            <JobPreviewSubComponent title={messages['job_posting.job_context']}>
              {getJobContext()}
            </JobPreviewSubComponent>
          )}

          <JobPreviewSubComponent
            title={messages['job_posting.job_responsibility']}>
            {getResponsibilities()}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.employment_status']}>
            {getJobNature()}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.educational_requirements']}>
            {getEducationalRequirements()}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.experience_requirements']}>
            {getExperienceRequirements()}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.additional_requirements']}>
            {getAdditionalRequirements()}
          </JobPreviewSubComponent>
          {jobData?.additional_job_information?.work_places && (
            <JobPreviewSubComponent title={messages['job_posting.workplace']}>
              {getWorkplace()}
            </JobPreviewSubComponent>
          )}
          <JobPreviewSubComponent
            title={messages['common.job_location'] as string}>
            {jobData?.additional_job_information?.job_locations
              ?.map((location: any) => location.title)
              .join(', ')}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent title={messages['common.salary']}>
            {jobData?.additional_job_information?.additional_salary_info &&
            jobData?.additional_job_information?.additional_salary_info !=
              '' ? (
              <ul style={{paddingLeft: '20px'}}>
                {jobData?.additional_job_information?.is_salary_info_show !=
                  SalaryShowOption.NOTHING && <li>{getSalary()}</li>}
                <li>
                  {jobData?.additional_job_information?.additional_salary_info}
                </li>
              </ul>
            ) : (
              getSalary()
            )}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.compensation_and_other_benefits']}>
            {getOtherBenefits()}
          </JobPreviewSubComponent>

          <JobPreviewSubComponent title={messages['job_posting.job_source']}>
            {messages['job.online_job_posting']}
          </JobPreviewSubComponent>
          {jobData?.primary_job_information?.published_at && (
            <JobPreviewSubComponent
              title={messages['job_posting.published_on']}>
              {formatDate(jobData.primary_job_information.published_at, {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </JobPreviewSubComponent>
          )}
        </Grid>
        <Grid item xs={12} md={2} order={{xs: 1, md: 2}} textAlign={'right'}>
          <Button
            variant={'contained'}
            color={'primary'}
            size={'small'}
            onClick={onGoBack}>
            <ArrowBack />
            {messages['common.back']}
          </Button>
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default JobViewPage;
