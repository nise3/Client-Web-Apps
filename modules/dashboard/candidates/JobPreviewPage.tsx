import React from 'react';
import {Box, Button, Card, CardContent, Grid, Typography} from '@mui/material';
import {Body1, Body2, H3, S1, S2} from '../../../@softbd/elements/common';
import JobPreviewSubComponent from '../jobLists/jobPost/steps/components/JobPreviewSubComponent';
import {
  EmploymentStatus,
  Gender,
  LunchFacilityType,
  ResumeReceivingOptions,
  SalaryReviewType,
  SalaryShowOption,
  SHOW,
  WorkPlaceTypes,
} from '../jobLists/jobPost/enums/JobPostEnums';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {styled} from '@mui/material/styles';

const PREFIX = 'JobPreviewPage';

const classes = {
  footerTitle: `${PREFIX}-footerTitle`,
  otherBenefit: `${PREFIX}-otherBenefit`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.footerTitle}`]: {
    display: 'inline-block',
    paddingBottom: '10px',
    borderBottom: '2px solid #d5d5d5',
  },
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
  [`& ul`]: {
    listStyleType: 'disclosure-closed',
  },
  [`& ul>li`]: {
    marginTop: '5px',
  },
}));

interface JobPreviewPageProps {
  job: any;
}

const JobPreviewPage = ({job}: JobPreviewPageProps) => {
  const {messages, formatNumber, formatDate} = useIntl();

  const getJobNature = () => {
    let jobNature: Array<string> = [];
    if (job?.primary_job_information?.employment_types) {
      job?.primary_job_information?.employment_types.map((types: any) => {
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

    if (
      job?.additional_job_information?.is_salary_info_show ==
      SalaryShowOption.SALARY
    ) {
      salaryText =
        '৳ ' +
        formatNumber(job?.additional_job_information?.salary_min) +
        ' - ' +
        formatNumber(job?.additional_job_information?.salary_max) +
        ` (${messages['common.monthly']})`;
    } else if (
      job?.additional_job_information?.is_salary_info_show ==
      SalaryShowOption.NEGOTIABLE
    ) {
      salaryText = messages['common.negotiable'];
    }

    return salaryText;
  };

  const getExperienceText = () => {
    if (job?.candidate_requirements?.is_experience_needed == 1) {
      let experienceText: any = '';
      if (
        job?.candidate_requirements?.minimum_year_of_experience &&
        job?.candidate_requirements?.maximum_year_of_experience
      ) {
        experienceText = (
          <IntlMessages
            id={'job_preview.experience_from_to'}
            values={{
              from: job?.candidate_requirements?.minimum_year_of_experience,
              to: job?.candidate_requirements?.maximum_year_of_experience,
            }}
          />
        );
      } else if (job?.candidate_requirements?.minimum_year_of_experience) {
        experienceText = (
          <IntlMessages
            id={'job_preview.experience_at_least'}
            values={{
              from: job?.candidate_requirements?.minimum_year_of_experience,
            }}
          />
        );
      } else if (job?.candidate_requirements?.maximum_year_of_experience) {
        experienceText = (
          <IntlMessages
            id={'job_preview.experience_at_most'}
            values={{
              from: job?.candidate_requirements?.maximum_year_of_experience,
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
    let ageText = '';

    if (
      job?.candidate_requirements?.age_minimum &&
      job?.candidate_requirements?.age_maximum
    ) {
      ageText =
        job?.candidate_requirements?.age_minimum +
        ' to ' +
        job?.candidate_requirements?.age_maximum +
        ' years';
    } else if (job?.candidate_requirements?.age_minimum) {
      ageText =
        'At least ' + job?.candidate_requirements?.age_minimum + ' years';
    } else if (job?.candidate_requirements?.age_maximum) {
      ageText =
        'At most ' + job?.candidate_requirements?.age_maximum + ' years';
    }

    return ageText;
  };

  const getJobContext = () => {
    let strArr: Array<string> = [];
    strArr = job?.additional_job_information?.job_context.split('\n');
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
    if (job?.additional_job_information?.job_responsibilities) {
      strArr =
        job?.additional_job_information?.job_responsibilities.split('\n');
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

    if (job?.candidate_requirements?.other_educational_qualification) {
      additionalEducationRequirement =
        job?.candidate_requirements?.other_educational_qualification.split(
          '\n',
        );
    }

    let educationalInstitutes = '';

    if (job?.candidate_requirements?.preferred_educational_institutions) {
      educationalInstitutes =
        job?.candidate_requirements?.preferred_educational_institutions
          .map((ins: any) => ins.name)
          .join(', ');
    }

    let professionalCertificates = '';

    if (job?.candidate_requirements?.professional_certifications) {
      professionalCertificates =
        job?.candidate_requirements?.professional_certifications
          .map((cert: any) => cert.title)
          .join(', ');
    }

    let trainingOrTradeCourse = '';

    if (job?.candidate_requirements?.trainings) {
      trainingOrTradeCourse = job?.candidate_requirements?.trainings
        .map((course: any) => course.title)
        .join(', ');
    }

    let skillText = '';
    if (job?.candidate_requirements?.skills) {
      skillText = job?.candidate_requirements?.skills
        .map((skill: any) => skill.title)
        .join(', ');
    }
    if (
      additionalEducationRequirement.length > 0 ||
      job?.candidate_requirements?.degrees?.length > 0 ||
      educationalInstitutes ||
      professionalCertificates ||
      trainingOrTradeCourse ||
      skillText
    ) {
      isShowNotApplicable = false;
    }

    return (
      <ul style={{paddingLeft: '20px'}}>
        {job?.candidate_requirements?.degrees?.map(
          (degree: any, index: number) => (
            <li key={index}>
              {degree?.exam_degree?.title} in {degree?.major_subject}
            </li>
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
    if (job?.candidate_requirements?.is_experience_needed == 1) {
      let experienceText = getExperienceText();

      let experienceAreas = '';
      if (job?.candidate_requirements?.area_of_experiences) {
        experienceAreas = job?.candidate_requirements?.area_of_experiences
          ?.map((experience: any) => experience.title)
          .join(', ');
      }

      let experienceBusinessAreas = '';
      if (job?.candidate_requirements?.area_of_businesses) {
        experienceBusinessAreas =
          job?.candidate_requirements?.area_of_businesses
            ?.map((business: any) => business.title)
            .join(', ');
      }

      return (
        <ul style={{paddingLeft: '20px'}}>
          <li>{experienceText}</li>
          {job?.candidate_requirements?.is_freshers_encouraged == 1 && (
            <li>{messages['job_post.is_fresher_applicable']}</li>
          )}
          <li>
            {messages['job_preview.experience_area_label']}
            <ul style={{listStyleType: 'square'}}>
              <li>{experienceAreas}</li>
            </ul>
          </li>
          <li>
            {messages['job_preview.business_area_label']}
            <ul style={{listStyleType: 'square'}}>
              <li>{experienceBusinessAreas}</li>
            </ul>
          </li>
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
    job?.candidate_requirements?.genders.map((gender: any) => {
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

    if (male && female) {
      return 'Both male and female are allowed to apply';
    } else if (male && other) {
      return 'Both male and third genders are allowed to apply';
    } else if (female && other) {
      return 'Both females and third genders are allowed to apply';
    } else if (male) {
      return 'Only males are allowed to apply';
    } else if (female) {
      return 'Only females are allowed to apply';
    } else {
      return 'Only third genders are allowed to apply';
    }
  };

  const getAdditionalRequirements = () => {
    let strArr: Array<string> = [];
    if (job?.candidate_requirements?.additional_requirements) {
      strArr = job?.candidate_requirements?.additional_requirements.split('\n');
    }

    let isShowNotApplicable = true;
    if (
      getAgeText() ||
      strArr.length > 0 ||
      job?.candidate_requirements?.genders.length > 0 ||
      job?.candidate_requirements?.person_with_disability == 1
    ) {
      isShowNotApplicable = false;
    }

    return (
      <ul style={{paddingLeft: '20px'}}>
        {getAgeText() && <li>Age {getAgeText()}</li>}
        {job?.candidate_requirements?.genders.length > 0 &&
          job?.candidate_requirements?.genders.length < 3 && (
            <li>{getGenderText()}</li>
          )}
        {strArr.map((item: string, index) => (
          <li key={index}>{item}</li>
        ))}
        {job?.candidate_requirements?.person_with_disability == 1 && (
          <li>{messages['job_preview.person_with_disability']}</li>
        )}
        {isShowNotApplicable && <li>{messages['common.n_a']}</li>}
      </ul>
    );
  };

  const getWorkplace = () => {
    let workplaceStrArr: Array<string> = [];

    job?.additional_job_information?.work_places.map((workplace: any) => {
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
    if (job?.additional_job_information?.is_other_benefits == 1) {
      let salaryReviewText = null;
      if (job?.additional_job_information?.salary_review) {
        salaryReviewText =
          (messages['job_preview.salary_review'] as string) +
          (job?.additional_job_information?.salary_review ==
          SalaryReviewType.YEARLY
            ? messages['common.yearly']
            : messages['common.half_yearly']);
      }
      let lunchFacilitiesText = null;
      if (job?.additional_job_information?.lunch_facilities) {
        lunchFacilitiesText =
          (messages['job_preview.lunch_facilities'] as string) +
          (job?.additional_job_information?.lunch_facilities ==
          LunchFacilityType.FULL_SUBSIDIZE
            ? messages['common.full_subsidize']
            : messages['common.partially_subsidize']);
      }

      let othersArr: Array<string> = [];
      if (job?.additional_job_information?.others) {
        othersArr = job?.additional_job_information?.others.split('\n');
      }

      return (
        <React.Fragment>
          <ul style={{paddingLeft: '20px'}}>
            {salaryReviewText && <li>{salaryReviewText}</li>}
            {lunchFacilitiesText && <li>{lunchFacilitiesText}</li>}
            {job?.additional_job_information?.festival_bonus && (
              <li>
                {messages['job_preview.festival_bonus']}{' '}
                {job?.additional_job_information?.festival_bonus} (
                {messages['common.yearly']})
              </li>
            )}
          </ul>
          <Box
            sx={{
              marginTop: '-15px',
              marginLeft: '-30px',
            }}>
            {(job?.additional_job_information?.other_benefits || []).map(
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
    if (job?.company_info_visibility?.is_company_name_visible == SHOW) {
      if (job?.primary_job_information?.industry_association_id) {
        if (job?.primary_job_information?.organization_id) {
          return job?.primary_job_information?.organization_title;
        } else {
          return job?.primary_job_information?.industry_association_title;
        }
      } else if (job?.primary_job_information?.organization_id) {
        return job?.primary_job_information?.organization_title;
      } else {
        return '';
      }
    } else {
      return job?.company_info_visibility?.company_name;
    }
  };

  const getCompanyAddress = () => {
    let address: string = '';

    if (job?.primary_job_information?.industry_association_id) {
      if (job?.primary_job_information?.organization_id) {
        address = job?.primary_job_information?.organization_address;
      } else {
        address = job?.primary_job_information?.industry_association_address;
      }
    } else if (job?.primary_job_information?.organization_id) {
      address = job?.primary_job_information?.organization_address;
    }

    return (
      <React.Fragment>
        <Body2>{address}</Body2>
      </React.Fragment>
    );
  };

  return (
    <StyledBox mt={3}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <H3>{job?.primary_job_information?.job_title}</H3>
          <S1 fontWeight={'bold'}>{getCompanyName()}</S1>
          <JobPreviewSubComponent title={messages['common.vacancy']}>
            {job?.primary_job_information?.no_of_vacancies
              ? formatNumber(job?.primary_job_information?.no_of_vacancies)
              : messages['common.n_a']}
          </JobPreviewSubComponent>

          {job?.additional_job_information?.job_context && (
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
          {job?.additional_job_information?.work_places && (
            <JobPreviewSubComponent title={messages['job_posting.workplace']}>
              {getWorkplace()}
            </JobPreviewSubComponent>
          )}
          <JobPreviewSubComponent title={messages['common.job_location']}>
            {job?.additional_job_information?.job_locations
              ?.map((location: any) => location.title)
              .join(', ')}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent title={messages['common.salary']}>
            {job?.additional_job_information?.additional_salary_info &&
            job?.additional_job_information?.additional_salary_info != '' ? (
              <ul style={{paddingLeft: '20px'}}>
                {job?.additional_job_information?.is_salary_info_show !=
                  SalaryShowOption.NOTHING && <li>{getSalary()}</li>}
                <li>
                  {job?.additional_job_information?.additional_salary_info}
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
            Nise Online Job Posting.
          </JobPreviewSubComponent>
          {job?.primary_job_information?.published_at && (
            <JobPreviewSubComponent
              title={messages['job_posting.published_on']}>
              {formatDate(job.primary_job_information.published_at, {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </JobPreviewSubComponent>
          )}
        </Grid>
        <Grid item xs={1} md={4}>
          <Typography>
            <b>{messages['job_preview.job_sector_occupation']}</b>{' '}
            {job?.primary_job_information?.job_sector_title}/
            {job?.primary_job_information?.occupation_title}
          </Typography>
          <Card sx={{border: '1px solid #bbbbbb', marginTop: '10px'}}>
            <Box
              sx={{
                backgroundColor: 'common.black',
                padding: '10px',
                color: 'common.white',
              }}>
              {messages['job_preview.job_summary']}
            </Box>
            <CardContent>
              {job.primary_job_information.published_at && (
                <Body2>
                  <b>{messages['job_posting.published_on']}</b>{' '}
                  {formatDate(job.primary_job_information.published_at, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Body2>
              )}
              <Body2 sx={{marginTop: '6px'}}>
                <b>{messages['job_preview_summary.vacancy']} </b>
                {job?.primary_job_information?.no_of_vacancies
                  ? formatNumber(job?.primary_job_information?.no_of_vacancies)
                  : messages['common.n_a']}
              </Body2>
              <Body2 sx={{marginTop: '6px'}}>
                <b>{messages['job_preview_summary.job_nature']} </b>
                {getJobNature()}
              </Body2>
              <Body2 sx={{marginTop: '6px'}}>
                <b>{messages['job_preview_summary.age']} </b>
                {getAgeText() ? getAgeText() : messages['common.n_a']}
              </Body2>
              <Body2 sx={{marginTop: '6px'}}>
                <b>{messages['job_preview_summary.experience']} </b>
                {getExperienceText()}
              </Body2>
              <Body2 sx={{marginTop: '6px'}}>
                <b>{messages['job_preview_summary.job_location']} </b>
                {job?.additional_job_information?.job_locations
                  ?.map((location: any) => location.title)
                  .join(', ')}
              </Body2>
              {job?.additional_job_information?.is_salary_info_show !=
                SalaryShowOption.NOTHING && (
                <Body2 sx={{marginTop: '6px'}}>
                  <b>{messages['job_preview_summary.salary']} </b>
                  {getSalary()}
                </Body2>
              )}
              <Body2 sx={{marginTop: '6px'}}>
                <b>{messages['job_preview_summary.application_deadline']} </b>
                {job?.primary_job_information?.application_deadline
                  ? formatDate(
                      job.primary_job_information.application_deadline,
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      },
                    )
                  : ''}
              </Body2>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} textAlign={'center'} mt={2}>
          <S2 fontWeight={'bold'} className={classes.footerTitle}>
            {messages['job_preview.read_before_apply']}
          </S2>
          {job?.primary_job_information
            ?.special_instruction_for_job_seekers && (
            <Body2 mt={2} color={'grey.600'}>
              {
                job?.primary_job_information
                  ?.special_instruction_for_job_seekers
              }
            </Body2>
          )}
          {job?.primary_job_information?.is_photograph_enclose_with_resume ==
            1 && (
            <S2 mt={1}>
              <IntlMessages
                id={'job_preview.photograph_enclose_with_resume'}
                values={{
                  photo: (
                    <span style={{color: 'red'}}>
                      *{messages['job_preview.photograph']}
                    </span>
                  ),
                }}
              />
            </S2>
          )}

          <Button
            color={'primary'}
            size={'medium'}
            variant={'contained'}
            sx={{marginTop: '15px'}}>
            {messages['common.apply_online']}
          </Button>

          {job?.primary_job_information?.resume_receiving_option ==
            ResumeReceivingOptions.EMAIL && (
            <Box mt={3}>
              <S2>{messages['common.email']}</S2>
              <Body2 color={'grey.600'}>
                <IntlMessages
                  id={'job_preview.send_your_cv'}
                  values={{
                    email: (
                      <a
                        style={{
                          color: 'blue',
                          textDecoration: 'underline',
                          fontWeight: 'bold',
                        }}
                        href={'mailto:' + job?.primary_job_information?.email}>
                        {job?.primary_job_information?.email}{' '}
                      </a>
                    ),
                  }}
                />
                {/*{job?.primary_job_information?.is_use_nise3_mail_system ==
                  1 && (
                  <React.Fragment>
                    <IntlMessages
                      id={'job_preview.or_from_nise_account'}
                      values={{
                        nise: <span style={{fontWeight: 'bold'}}>NISE</span>,
                      }}
                    />
                    <Link
                      style={{
                        color: 'blue',
                        textDecoration: 'underline',
                      }}
                      href={''}
                      target={'_blank'}>
                      {messages['common.click_here']}
                    </Link>
                  </React.Fragment>
                )}*/}
              </Body2>
            </Box>
          )}

          {job?.primary_job_information?.resume_receiving_option ==
            ResumeReceivingOptions.HARD_COPY && (
            <Box mt={3}>
              <S2 fontWeight={'bold'}>{messages['job_posting.hard_copy']}</S2>
              <Body2 color={'grey.600'} sx={{whiteSpace: 'break-spaces'}}>
                {job?.primary_job_information?.instruction_for_hard_copy}
              </Body2>
            </Box>
          )}

          {job?.primary_job_information?.resume_receiving_option ==
            ResumeReceivingOptions.WALK_IN_INTERVIEW && (
            <Box mt={3}>
              <S2 fontWeight={'bold'}>
                {messages['job_posting.walk_in_interview']}
              </S2>
              <Body2 color={'grey.600'} sx={{whiteSpace: 'break-spaces'}}>
                {
                  job?.primary_job_information
                    ?.instruction_for_walk_in_interview
                }
              </Body2>
            </Box>
          )}

          <Body1 mt={2}>
            {messages['job_preview_summary.application_deadline']}{' '}
            {job?.primary_job_information?.application_deadline
              ? formatDate(job.primary_job_information.application_deadline, {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
              : ''}
          </Body1>
        </Grid>
        <Grid
          item
          xs={12}
          mt={4}
          sx={{
            borderTop: '1px solid #e9e9e9',
          }}>
          <S2 fontWeight={'bold'} mb={1}>
            {messages['job_preview.company_information']}
          </S2>
          <Box color={'grey.600'}>
            <Body2>{getCompanyName()}</Body2>
            {job?.company_info_visibility?.is_company_address_visible == SHOW &&
              getCompanyAddress()}
          </Box>
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default JobPreviewPage;
