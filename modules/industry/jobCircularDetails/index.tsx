import React, {useCallback, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import {Body1, Body2, H3, S1, S2} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import JobPreviewSubComponent from '../../dashboard/jobLists/jobPost/steps/components/JobPreviewSubComponent';
import {
  EmploymentStatus,
  Gender,
  LunchFacilityType,
  ResumeReceivingOptions,
  SalaryReviewType,
  SalaryShowOption,
  SHOW,
  WorkPlaceTypes,
} from '../../dashboard/jobLists/jobPost/enums/JobPostEnums';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useRouter} from 'next/router';
import {useFetchPublicJob} from '../../../services/IndustryAssociationManagement/hooks';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import {gotoLoginSignUpPage} from '../../../@softbd/common/constants';
import {LINK_YOUTH_SIGNUP} from '../../../@softbd/common/appLinks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import JobApplyPopup from '../../../@softbd/components/JobApplyPopup';
import {ArrowBack} from '@mui/icons-material';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';

const PREFIX = 'JobPreview';

const classes = {
  jobDetailsBox: `${PREFIX}-jobDetailsBox`,
  footerTitle: `${PREFIX}-footerTitle`,
  otherBenefit: `${PREFIX}-otherBenefit`,
  icons: `${PREFIX}-icons`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.jobDetailsBox}`]: {
    marginTop: '24px',
    border: '1px solid #cacaca',
    padding: '20px',
    background: '#fafafa',
    marginBottom: '20px',
  },
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
  [`& .${classes.icons}`]: {
    color: '#ffff',
    padding: '2px',
    borderRadius: '3px',
    marginRight: '10px',
    // '&:not(:last-child)': {marginRight: '10px'},
    float: 'right',
  },
}));

const JobCircularDetails = () => {
  const {messages, formatNumber, formatDate} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();
  const router = useRouter();
  const {jobCircularId} = router.query;

  const [jobFilters, setJobFilters] = useState<any>(null);
  const {data: jobData} = useFetchPublicJob(jobCircularId, jobFilters);

  const [isOpenJobApplyModal, setIsOpenJobApplyModal] = useState(false);

  useEffect(() => {
    if (authUser && authUser?.isYouthUser) {
      setJobFilters({
        youth_id: authUser.youthId,
      });
    }
  }, [authUser]);

  const closeJobApplyModal = useCallback(() => {
    setIsOpenJobApplyModal(false);
  }, []);

  const onJobApply = useCallback(() => {
    if (authUser) {
      setIsOpenJobApplyModal(true);
    } else {
      router.push(gotoLoginSignUpPage(LINK_YOUTH_SIGNUP));
    }
  }, []);

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
            gender2: messages['common.other'],
          }}
        />
      );
    } else if (male) {
      return (
        <IntlMessages
          id={'job_posting.application_gender_req_one'}
          values={{
            gender1: messages['common.male'],
          }}
        />
      );
    } else if (female) {
      return (
        <IntlMessages
          id={'job_posting.application_gender_req_two'}
          values={{
            gender1: messages['common.female'],
          }}
        />
      );
    } else {
      return (
        <IntlMessages
          id={'job_posting.application_gender_req_two'}
          values={{
            gender2: messages['common.other'],
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
      if (jobData?.primary_job_information?.industry_association_id) {
        if (jobData?.primary_job_information?.organization_id) {
          return jobData?.primary_job_information?.organization_title;
        } else {
          return jobData?.primary_job_information?.industry_association_title;
        }
      } else if (jobData?.primary_job_information?.organization_id) {
        return jobData?.primary_job_information?.organization_title;
      } else {
        return '';
      }
    } else {
      return jobData?.company_info_visibility?.company_name;
    }
  };

  const getCompanyAddress = () => {
    let address: string = '';

    if (jobData?.primary_job_information?.industry_association_id) {
      if (jobData?.primary_job_information?.organization_id) {
        address = jobData?.primary_job_information?.organization_address;
      } else {
        address =
          jobData?.primary_job_information?.industry_association_address;
      }
    } else if (jobData?.primary_job_information?.organization_id) {
      address = jobData?.primary_job_information?.organization_address;
    }

    return (
      <React.Fragment>
        <Body2>{address}</Body2>
      </React.Fragment>
    );
  };

  return (
    <StyledContainer>
      <Grid container sx={{marginTop: 2}}>
        <Grid item xs={6}>
          <Button
            key={1}
            startIcon={<ArrowBack />}
            sx={{marginRight: '10px'}}
            variant={'outlined'}
            onClick={() => router.back()}>
            {messages['common.back']}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Tooltip title={messages['common.download_label']}>
            <SystemUpdateAltOutlinedIcon
              className={classes.icons}
              sx={{
                backgroundColor: '#2fc94d',
              }}
            />
          </Tooltip>
          <Tooltip title={messages['common.print']}>
            <PrintOutlinedIcon
              className={classes.icons}
              sx={{
                backgroundColor: '#ffb700b8',
              }}
            />
          </Tooltip>
          <Tooltip title={messages['common.share_label']}>
            <ShareIcon
              className={classes.icons}
              sx={{
                backgroundColor: '#4E4E98',
              }}
            />
          </Tooltip>
          <Tooltip title={messages['common.like']}>
            <ThumbUpAltIcon
              className={classes.icons}
              sx={{
                backgroundColor: '#008fff',
              }}
            />
          </Tooltip>
        </Grid>
      </Grid>
      <Box mt={3} className={classes.jobDetailsBox}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <H3 sx={{color: 'primary.main'}}>
              {jobData?.primary_job_information?.job_title}
            </H3>
            <S1 fontWeight={'bold'}>{getCompanyName()}</S1>
            {jobData?.primary_job_information?.industry_association_id &&
            jobData?.primary_job_information?.organization_id ? (
              <Body2 mt={1}>
                <b>{messages['job.posted_by']}</b>{' '}
                {jobData?.primary_job_information?.industry_association_title}
              </Body2>
            ) : (
              <></>
            )}
            <JobPreviewSubComponent title={messages['common.vacancy']}>
              {jobData?.primary_job_information?.no_of_vacancies
                ? formatNumber(
                    jobData?.primary_job_information?.no_of_vacancies,
                  )
                : messages['common.n_a']}
            </JobPreviewSubComponent>

            {jobData?.additional_job_information?.job_context && (
              <JobPreviewSubComponent
                title={messages['job_posting.job_context']}>
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
            <JobPreviewSubComponent title={messages['common.job_location']}>
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
                    {
                      jobData?.additional_job_information
                        ?.additional_salary_info
                    }
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
                {formatDate(jobData?.primary_job_information.published_at, {
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
              {jobData?.primary_job_information?.job_sector_title}/
              {jobData?.primary_job_information?.occupation_title}
            </Typography>
            <Card
              sx={{
                border: '1px solid',
                borderColor: 'primary.main',
                marginTop: '10px',
              }}>
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  padding: '10px',
                  color: 'common.white',
                }}>
                {messages['job_preview.job_summary']}
              </Box>
              <CardContent>
                <Body2>
                  <b>
                    {messages['job_preview_summary.application_deadline']}{' '}
                    {jobData?.primary_job_information?.application_deadline
                      ? formatDate(
                          jobData.primary_job_information.application_deadline,
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          },
                        )
                      : ''}
                  </b>
                </Body2>
                {jobData?.primary_job_information.published_at && (
                  <Body2 sx={{marginTop: '6px'}}>
                    <b>{messages['job_posting.published_on']}</b>{' '}
                    {formatDate(jobData?.primary_job_information.published_at, {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Body2>
                )}
                <Body2 sx={{marginTop: '6px'}}>
                  <b>{messages['job_preview_summary.vacancy']} </b>
                  {jobData?.primary_job_information?.no_of_vacancies
                    ? formatNumber(
                        jobData?.primary_job_information?.no_of_vacancies,
                      )
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
                  {jobData?.additional_job_information?.job_locations
                    ?.map((location: any) => location.title)
                    .join(', ')}
                </Body2>
                {jobData?.additional_job_information?.is_salary_info_show !=
                  SalaryShowOption.NOTHING && (
                  <Body2 sx={{marginTop: '6px'}}>
                    <b>{messages['job_preview_summary.salary']} </b>
                    {getSalary()}
                  </Body2>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} textAlign={'center'} mt={2}>
            <S2 fontWeight={'bold'} className={classes.footerTitle}>
              {messages['job_preview.read_before_apply']}
            </S2>
            {jobData?.primary_job_information
              ?.special_instruction_for_job_seekers && (
              <Body2 mt={2} color={'grey.600'}>
                {
                  jobData?.primary_job_information
                    ?.special_instruction_for_job_seekers
                }
              </Body2>
            )}
            {jobData?.primary_job_information
              ?.is_photograph_enclose_with_resume == 1 && (
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

            <Box>
              {(!authUser || authUser?.isYouthUser) &&
                (jobData?.candidate_information?.has_applied == '1' ? (
                  <CustomChip
                    label={messages['common.applied']}
                    color={'primary'}
                    sx={{
                      marginTop: '20px',
                    }}
                  />
                ) : (
                  <Button
                    sx={{
                      marginTop: '20px',
                    }}
                    variant={'contained'}
                    color={'primary'}
                    onClick={onJobApply}>
                    {messages['industry.apply_now']}
                  </Button>
                ))}
            </Box>

            {jobData?.primary_job_information?.resume_receiving_option ==
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
                          href={
                            'mailto:' + jobData?.primary_job_information?.email
                          }>
                          {jobData?.primary_job_information?.email}{' '}
                        </a>
                      ),
                    }}
                  />
                  {/*{jobData?.primary_job_information?.is_use_nise3_mail_system ==
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

            {jobData?.primary_job_information?.resume_receiving_option ==
              ResumeReceivingOptions.HARD_COPY && (
              <Box mt={3}>
                <S2 fontWeight={'bold'}>{messages['job_posting.hard_copy']}</S2>
                <Body2 color={'grey.600'} sx={{whiteSpace: 'break-spaces'}}>
                  {jobData?.primary_job_information?.instruction_for_hard_copy}
                </Body2>
              </Box>
            )}

            {jobData?.primary_job_information?.resume_receiving_option ==
              ResumeReceivingOptions.WALK_IN_INTERVIEW && (
              <Box mt={3}>
                <S2 fontWeight={'bold'}>
                  {messages['job_posting.walk_in_interview']}
                </S2>
                <Body2 color={'grey.600'} sx={{whiteSpace: 'break-spaces'}}>
                  {
                    jobData?.primary_job_information
                      ?.instruction_for_walk_in_interview
                  }
                </Body2>
              </Box>
            )}

            <Body1 mt={2}>
              {messages['job_preview_summary.application_deadline']}{' '}
              {jobData?.primary_job_information?.application_deadline
                ? formatDate(
                    jobData.primary_job_information.application_deadline,
                    {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    },
                  )
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
              {jobData?.company_info_visibility?.is_company_address_visible ==
                SHOW && getCompanyAddress()}
            </Box>
          </Grid>
        </Grid>
      </Box>
      {isOpenJobApplyModal && (
        <JobApplyPopup job={jobData} onClose={closeJobApplyModal} />
      )}
    </StyledContainer>
  );
};

export default JobCircularDetails;
