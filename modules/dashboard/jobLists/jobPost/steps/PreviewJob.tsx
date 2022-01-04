import React from 'react';
import {Box, Button, Card, CardContent, Grid, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import {
  Body1,
  Body2,
  H3,
  Link,
  S1,
  S2,
} from '../../../../../@softbd/elements/common';
import JobPreviewSubComponent from './components/JobPreviewSubComponent';
import {styled} from '@mui/material/styles';
import {
  EmploymentStatus,
  Gender,
  ResumeReceivingOptions,
  SHOW,
} from '../enums/JobPostEnums';

interface Props {
  jobId: string;
  onBack: () => void;
  onContinue: () => void;
}

const data = {
  primary_job_information: {
    job_title: 'Software Engineer',
    job_sector_title: 'IT',
    occupation_title: 'Telecommunication',
    no_of_vacancies: 5,
    is_number_of_vacancy_na: 0,
    employment_types: [
      {
        id: 1,
        title: 'ফুল টাইম',
      },
      {
        id: 2,
        title: 'খন্ডকালীন',
      },
    ],
    application_deadline: '2022-01-20',
    published_at: '2021-09-11',
    is_photograph_enclose_with_resume: 1,
    special_instruction_for_job_seekers:
      'We are looking for a talented and experienced (2+ years) PHP developer, who able to work php framework preferably (cakephp, laravel) . The developer should work with AngularJS/ReactJS/VueJS. Having knowledge in Python is good. Knowing Android / IOS will be added advantage.',
    is_apply_online: 0,
    resume_receiving_option: 1,
    email: 'admin@softbdltd.com',
    is_use_nise3_mail_system: 1,
    instruction_for_hard_copy:
      'Apply procedure 1\n' +
      'Apply procedure 2 sdlkfj sdkfskdjfsk jskd slkdjflskd jskldfjsdkl fjsdklfj slkdfj kdfjsdl fjksdl kf\n' +
      'Apply procedure 3\nApply procedure 4',
    instruction_for_walk_in_interview:
      'Apply procedure 1\n' +
      'Apply procedure 2 sdlkfj sdkfskdjfsk jskd slkdjflskd jskldfjsdkl fjsdklfj slkdfj kdfjsdl fjksdl kf\n' +
      'Apply procedure 3\nApply procedure 4',
  },
  additional_job_information: {
    job_locations: ['Anywhere in Bangladesh'],
    salary_min: 10000,
    salary_max: 50000,
    is_salary_info_show: 1,
    additional_salary_info: 'Negotiable based on experience.',
    job_context: 'Job Context 1\nJob Context 2\nJob Context 3',
    job_responsibilities:
      'Develop, Test and Deploy web application.\nWrite clean and organized code',
    job_place_type: 0,
    work_places: [1, 2],
    is_other_benefits: 1,
    other_benefits: [4, 5, 6, 7, 9, 10],
    lunch_facilities: 1,
    salary_review: 1,
    festival_bonus: 2,
    others:
      'Excellent environment to learn\nOther benefits as per company policies',
  },
  candidate_requirement: {
    experience_status: 1,
    min_experience: 3,
    max_experience: null,
    min_age: 27,
    max_age: 45,
    is_fresher_applicable: true,
    area_of_experience: [
      'Cake PHP',
      'Develop API',
      'HTML & CSS',
      'Programmer/Software Engineer',
      'Software Development',
    ],
    area_of_business: ['IT Enabled Service', 'Software Company'],
    genders: [1, 2],
    additional_requirements:
      'Advanced programming Skill in PHP\nExperience on PHP framework Laravel\n' +
      'Experience with cloud-based infrastructure and platform services\n' +
      'Experience with AngularJS, jQuery or React etc.\nExperience with MySQL, MongoDB, PostgreSQL.\n' +
      'Ability to express ideas clearly within the team\n' +
      'Should have experience in integrating 3rd party APIs like Google map, ' +
      'payment gateways, service APIs etc\nShould have knowledge working in Linux Environment\n' +
      'Manage individual project priorities, deadlines and deliverable.\n' +
      'Knowledge in Git, Docker is plus.\nGood understanding of requirements analysis and database design.\n' +
      'Team player with excellent English Communication skills\n' +
      'Must be able to handle multiple projects and deadline\n' +
      'Technical blog or open source contribution will be considered as added advantage.',
    skills: [
      'Ability to work under pressure',
      'HTML & CSS',
      'Cake PHP',
      'Develop API',
    ],
    educations: [
      {
        education_level_title: 'Bachelor',
        exam_degree_title: 'Bachelor in Engineering (BEng)',
        major_concentration: 'CSE, Math, Physics',
      },
    ],
    other_educational_qualification:
      'Bachelor/Masters degree from recognise institute',
    is_person_with_disability_can_apply: true,
    preferred_educational_institute: [
      'BGC Trust University Bangladesh, Chittagong',
      'Chittagong University of Engineering and Technology',
    ],
    training_trade_course: ['Java Training', 'PHP'],
    professional_Certificate: ['Java Certificate', 'JavaScript Certificate'],
  },
  company_info_visibility: {
    is_company_name_visible: 0,
    company_name: 'SOFT-BD',
    company_name_en: 'SOFT-BD',
    is_company_address_visible: 0,
    company_industry_type: 1,
    is_company_business_visible: 0,
  },
};

const PREFIX = 'JobPreview';

const classes = {
  footerTitle: `${PREFIX}-footerTitle`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.footerTitle}`]: {
    display: 'inline-block',
    paddingBottom: '10px',
    borderBottom: '2px solid #d5d5d5',
  },
  [`& ul>li`]: {
    marginTop: '5px',
  },
}));

const PreviewJob = ({jobId, onBack, onContinue}: Props) => {
  const {messages, formatNumber, formatDate} = useIntl();

  //const {data, isLoading} = useFetchJob(jobId);

  const onReadyToProcess = () => {
    try {
      onContinue();
    } catch (error: any) {}
  };

  const getJobNature = () => {
    let jobNature: Array<string> = [];
    if (data?.primary_job_information?.employment_types) {
      data?.primary_job_information?.employment_types.map((types: any) => {
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
    let salaryText = '';

    if (data?.additional_job_information?.is_salary_info_show == 1) {
      salaryText =
        'Tk. ' +
        data?.additional_job_information?.salary_min +
        ' - ' +
        data?.additional_job_information?.salary_max +
        '(monthly)';
    } else if (data?.additional_job_information?.is_salary_info_show == 3) {
      salaryText = 'Negotiable';
    }

    return salaryText;
  };

  const getExperienceText = () => {
    if (data?.candidate_requirement?.experience_status == 1) {
      let experienceText = '';
      if (
        data?.candidate_requirement?.min_experience &&
        data?.candidate_requirement?.max_experience
      ) {
        experienceText =
          data?.candidate_requirement?.min_experience +
          ' to ' +
          data?.candidate_requirement?.max_experience +
          ' year(s)';
      } else if (data?.candidate_requirement?.min_experience) {
        experienceText =
          'At least ' +
          data?.candidate_requirement?.min_experience +
          ' year(s)';
      } else if (data?.candidate_requirement?.max_experience) {
        experienceText =
          'At most ' + data?.candidate_requirement?.max_experience + ' year(s)';
      }
      return experienceText;
    } else {
      return 'N/A';
    }
  };

  const getAgeText = () => {
    let ageText = '';

    if (
      data?.candidate_requirement?.min_age &&
      data?.candidate_requirement?.max_age
    ) {
      ageText =
        data?.candidate_requirement?.min_age +
        ' to ' +
        data?.candidate_requirement?.max_age +
        ' years';
    } else if (data?.candidate_requirement?.min_age) {
      ageText = 'At least ' + data?.candidate_requirement?.min_age + ' years';
    } else if (data?.candidate_requirement?.max_age) {
      ageText = 'At most ' + data?.candidate_requirement?.max_age + ' years';
    }

    return ageText;
  };

  const getJobContext = () => {
    let strArr: Array<string> = [];
    strArr = data?.additional_job_information?.job_context.split('\n');
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
    if (data?.additional_job_information?.job_responsibilities) {
      strArr =
        data?.additional_job_information?.job_responsibilities.split('\n');
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

    if (data?.candidate_requirement?.other_educational_qualification) {
      additionalEducationRequirement =
        data?.candidate_requirement?.other_educational_qualification.split(
          '\n',
        );
    }

    let educationalInstitutes = '';

    if (data?.candidate_requirement?.preferred_educational_institute) {
      data?.candidate_requirement?.preferred_educational_institute.map(
        (ins: any, index) => {
          educationalInstitutes += index != 0 ? ', ' : '';
          educationalInstitutes += ins;
        },
      );
    }

    let professionalCertificates = '';

    if (data?.candidate_requirement?.professional_Certificate) {
      data?.candidate_requirement?.professional_Certificate.map(
        (cert: any, index) => {
          professionalCertificates += index != 0 ? ', ' : '';
          professionalCertificates += cert;
        },
      );
    }

    let trainingOrTradeCourse = '';

    if (data?.candidate_requirement?.training_trade_course) {
      data?.candidate_requirement?.training_trade_course.map(
        (course: any, index) => {
          trainingOrTradeCourse += index != 0 ? ', ' : '';
          trainingOrTradeCourse += course;
        },
      );
    }

    let skillText = '';
    if (data?.candidate_requirement?.skills) {
      skillText = data?.candidate_requirement?.skills.join(', ');
    }
    return (
      <ul style={{paddingLeft: '20px'}}>
        {data?.candidate_requirement?.educations.map(
          (education: any, index) => (
            <li key={index}>
              {education.exam_degree_title} in {education.major_concentration}
            </li>
          ),
        )}
        {additionalEducationRequirement.map((req: string, index) => (
          <li key={index}>{req}</li>
        ))}
        {educationalInstitutes && (
          <li>{educationalInstitutes} students will get preference</li>
        )}
        {professionalCertificates && (
          <li>Professional Certification: {professionalCertificates}</li>
        )}
        {trainingOrTradeCourse && (
          <li>Training/ Trade Course: {trainingOrTradeCourse}</li>
        )}
        <li>Skill Required: {skillText}</li>
      </ul>
    );
  };

  const getExperienceRequirements = () => {
    if (data?.candidate_requirement?.experience_status == 1) {
      let experienceText = getExperienceText();

      let experienceAreas = '';
      if (data?.candidate_requirement?.area_of_experience) {
        experienceAreas =
          data?.candidate_requirement?.area_of_experience.join(', ');
      }

      let experienceBusinessAreas = '';
      if (data?.candidate_requirement?.area_of_business) {
        experienceBusinessAreas =
          data?.candidate_requirement?.area_of_business.join(', ');
      }

      return (
        <ul style={{paddingLeft: '20px'}}>
          <li>{experienceText}</li>
          {data?.candidate_requirement?.is_fresher_applicable && (
            <li>Freshers are encouraged to apply</li>
          )}
          <li>
            The applicant should have experience in following area(s):
            <ul style={{listStyleType: 'square'}}>
              <li>{experienceAreas}</li>
            </ul>
          </li>
          <li>
            The applicant should have experience in following business area(s):
            <ul style={{listStyleType: 'square'}}>
              <li>{experienceBusinessAreas}</li>
            </ul>
          </li>
        </ul>
      );
    } else {
      return 'N/A';
    }
  };

  const getGenderText = () => {
    let male = false;
    let female = false;
    let other = false;
    data?.candidate_requirement?.genders.map((gender: number) => {
      switch (gender) {
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
    if (data?.candidate_requirement?.additional_requirements) {
      strArr = data?.candidate_requirement?.additional_requirements.split('\n');
    }

    return (
      <ul style={{paddingLeft: '20px'}}>
        <li>Age {getAgeText()}</li>
        {data?.candidate_requirement?.genders.length > 0 &&
          data?.candidate_requirement?.genders.length < 3 && (
            <li>{getGenderText()}</li>
          )}
        {strArr.map((item: string, index) => (
          <li key={index}>{item}</li>
        ))}
        {data?.candidate_requirement?.is_person_with_disability_can_apply && (
          <li>Person with disability are encouraged to apply</li>
        )}
      </ul>
    );
  };

  const getWorkplace = () => {
    let workplaceStrArr: Array<string> = [];

    data?.additional_job_information?.work_places.map((place: number) => {
      if (place == 1) {
        workplaceStrArr.push(messages['common.work_at_office'] as string);
      } else if (place == 2) {
        workplaceStrArr.push(messages['common.work_from_home'] as string);
      }
    });

    return (
      <ul style={{paddingLeft: '20px'}}>
        <li>{workplaceStrArr.join(', ')}</li>
      </ul>
    );
  };

  const getOtherBenefits = () => {
    if (data?.additional_job_information?.is_other_benefits == 1) {
      let salaryReviewText = null;
      if (data?.additional_job_information?.salary_review) {
        salaryReviewText =
          'Salary review: ' +
          (data?.additional_job_information?.salary_review == 1
            ? 'Yearly'
            : 'Half-yearly');
      }
      let lunchFacilitiesText = null;
      if (data?.additional_job_information?.lunch_facilities) {
        lunchFacilitiesText =
          'Lunch Facilities: ' +
          (data?.additional_job_information?.lunch_facilities == 1
            ? 'Full subsidize'
            : 'Partially subsidize');
      }

      let othersArr: Array<string> = [];
      if (data?.additional_job_information?.others) {
        othersArr = data?.additional_job_information?.others.split('\n');
      }

      return (
        <ul style={{paddingLeft: '20px'}}>
          {salaryReviewText && <li>{salaryReviewText}</li>}
          {lunchFacilitiesText && <li>{lunchFacilitiesText}</li>}
          {data?.additional_job_information?.festival_bonus && (
            <li>
              Festival bonus: {data?.additional_job_information?.festival_bonus}{' '}
              (Yearly)
            </li>
          )}
          {(data?.additional_job_information?.other_benefits || []).map(
            (item: number) => {
              switch (item) {
                case 1:
                  return <li>T/A</li>;
                case 2:
                  return <li>Mobile bill</li>;
                case 3:
                  return <li>Pension Policy</li>;
                case 4:
                  return <li>Tour allowance</li>;
                case 5:
                  return <li>Credit card</li>;
                case 6:
                  return <li>Medical allowance</li>;
                case 7:
                  return (
                    <li>Performance bonus will be reviewed by team leader</li>
                  );
                case 8:
                  return <li>Profit share</li>;
                case 9:
                  return <li>Provident fund</li>;
                case 10:
                  return <li>Weekly 2 holidays</li>;
                case 11:
                  return <li>Insurance</li>;
                case 12:
                  return <li>Gratuity</li>;
                case 13:
                  return <li>Over time allowance</li>;
              }
            },
          )}
          {othersArr.map((other: string, index) => (
            <li key={index}>{other}</li>
          ))}
        </ul>
      );
    } else {
      return 'N/A';
    }
  };

  const getCompanyName = () => {
    if (data?.company_info_visibility?.is_company_name_visible == SHOW) {
      return data?.company_info_visibility?.company_name;
    } else {
      return data?.company_info_visibility?.company_name;
    }
  };

  const getCompanyAddress = () => {
    return (
      <React.Fragment>
        <Body2>
          8th & 15th Floor, 52/1 Hasan Holdings Limited, New Eskaton Road, Dhaka
          1000
        </Body2>
        <Body2>
          Web:{' '}
          <Link href={'www.softbdltd.com'} target={'_blank'}>
            www.softbdltd.com
          </Link>
        </Body2>
      </React.Fragment>
    );
  };

  const getCompanyBusiness = () => {
    return <Body2>Business: Web Development and IT Services</Body2>;
  };

  return (
    <StyledBox mt={3}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <H3>{data?.primary_job_information?.job_title}</H3>
          <S1 fontWeight={'bold'}>
            {data?.company_info_visibility?.company_name}
          </S1>
          <JobPreviewSubComponent title={'Vacancy'}>
            {data?.primary_job_information?.is_number_of_vacancy_na
              ? 'N/A'
              : formatNumber(data?.primary_job_information?.no_of_vacancies)}
          </JobPreviewSubComponent>

          {data?.additional_job_information?.job_context && (
            <JobPreviewSubComponent title={'Job Responsibilities'}>
              {getJobContext()}
            </JobPreviewSubComponent>
          )}

          <JobPreviewSubComponent title={'Job Responsibilities'}>
            {getResponsibilities()}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.employment_status'] as string}>
            {getJobNature()}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.educational_requirements'] as string}>
            {getEducationalRequirements()}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.experience_requirements'] as string}>
            {getExperienceRequirements()}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.additional_requirements'] as string}>
            {getAdditionalRequirements()}
          </JobPreviewSubComponent>
          {data?.additional_job_information?.work_places && (
            <JobPreviewSubComponent title={'Workplace'}>
              {getWorkplace()}
            </JobPreviewSubComponent>
          )}
          <JobPreviewSubComponent
            title={messages['common.job_location'] as string}>
            {data?.additional_job_information?.job_locations?.join(', ')}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent title={messages['common.salary'] as string}>
            {data?.additional_job_information?.additional_salary_info &&
            data?.additional_job_information?.additional_salary_info != '' ? (
              <ul style={{paddingLeft: '20px'}}>
                {data?.additional_job_information?.is_salary_info_show != 2 && (
                  <li>{getSalary()}</li>
                )}
                <li>
                  {data?.additional_job_information?.additional_salary_info}
                </li>
              </ul>
            ) : (
              getSalary()
            )}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={
              messages['job_posting.compensation_and_other_benefits'] as string
            }>
            {getOtherBenefits()}
          </JobPreviewSubComponent>

          <JobPreviewSubComponent
            title={messages['job_posting.job_source'] as string}>
            Nise3 Online Job Posting.
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.published_on'] as string}>
            {formatDate(data?.primary_job_information?.published_at, {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </JobPreviewSubComponent>
        </Grid>
        <Grid item xs={1} md={4}>
          <Typography>
            <b>Category:</b> {data?.primary_job_information?.job_sector_title}/
            {data?.primary_job_information?.occupation_title}
          </Typography>
          <Card sx={{border: '1px solid #bbbbbb', marginTop: '10px'}}>
            <Box
              sx={{
                backgroundColor: 'common.black',
                padding: '10px',
                color: 'common.white',
              }}>
              Job Summary
            </Box>
            <CardContent>
              <Body2>
                <b>{messages['job_posting.published_on']}</b>{' '}
                {formatDate(data?.primary_job_information?.published_at, {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </Body2>
              <Body2 sx={{marginTop: '6px'}}>
                <b>Vacancy: </b>
                {data?.primary_job_information?.is_number_of_vacancy_na
                  ? 'N/A'
                  : formatNumber(
                      data?.primary_job_information?.no_of_vacancies,
                    )}
              </Body2>
              <Body2 sx={{marginTop: '6px'}}>
                <b>Job Nature: </b>
                {getJobNature()}
              </Body2>
              <Body2 sx={{marginTop: '6px'}}>
                <b>Age: </b>
                {getAgeText()}
              </Body2>
              <Body2 sx={{marginTop: '6px'}}>
                <b>Experience: </b>
                {getExperienceText()}
              </Body2>
              <Body2 sx={{marginTop: '6px'}}>
                <b>Job Location: </b>
                {data?.additional_job_information?.job_locations?.join(', ')}
              </Body2>
              {data?.additional_job_information?.is_salary_info_show != 2 && (
                <Body2 sx={{marginTop: '6px'}}>
                  <b>Salary: </b>
                  {getSalary()}
                </Body2>
              )}
              <Body2 sx={{marginTop: '6px'}}>
                <b>Application Deadline: </b>
                {formatDate(
                  data?.primary_job_information?.application_deadline,
                  {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  },
                )}
              </Body2>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} textAlign={'center'} mt={2}>
          <S2 fontWeight={'bold'} className={classes.footerTitle}>
            Read Before Apply
          </S2>
          {data?.primary_job_information
            ?.special_instruction_for_job_seekers && (
            <Body2 mt={2} color={'grey.600'}>
              {
                data?.primary_job_information
                  ?.special_instruction_for_job_seekers
              }
            </Body2>
          )}
          {data?.primary_job_information?.is_photograph_enclose_with_resume ==
            1 && (
            <S2 mt={1}>
              <span style={{color: 'red'}}>*Photograph</span> must be enclosed
              with the resume.
            </S2>
          )}

          <S2 fontWeight={'bold'} mt={2}>
            Apply Procedure
          </S2>

          {data?.primary_job_information?.is_apply_online == 1 && (
            <Button
              color={'primary'}
              size={'medium'}
              variant={'contained'}
              sx={{marginTop: '15px'}}>
              Apply Online
            </Button>
          )}

          {data?.primary_job_information?.resume_receiving_option ==
            ResumeReceivingOptions.EMAIL && (
            <Box mt={3}>
              <S2>Email</S2>
              <Body2 color={'grey.600'}>
                Send your CV to{' '}
                <span style={{fontWeight: 'bold'}}>
                  {data?.primary_job_information?.email}{' '}
                </span>
                {data?.primary_job_information?.is_use_nise3_mail_system ==
                  1 && (
                  <React.Fragment>
                    or to Email CV from{' '}
                    <span style={{fontWeight: 'bold'}}>NISE3</span> account{' '}
                    <Link href={''} target={'_blank'}>
                      Click here
                    </Link>
                  </React.Fragment>
                )}
              </Body2>
            </Box>
          )}

          {data?.primary_job_information?.resume_receiving_option ==
            ResumeReceivingOptions.HARD_COPY && (
            <Box mt={3}>
              <S2 fontWeight={'bold'}>Hard Copy</S2>
              <Body2 color={'grey.600'} sx={{whiteSpace: 'break-spaces'}}>
                {data?.primary_job_information?.instruction_for_hard_copy}
              </Body2>
            </Box>
          )}

          {data?.primary_job_information?.resume_receiving_option ==
            ResumeReceivingOptions.WALK_IN_INTERVIEW && (
            <Box mt={3}>
              <S2 fontWeight={'bold'}>Walk in Interview</S2>
              <Body2 color={'grey.600'} sx={{whiteSpace: 'break-spaces'}}>
                {
                  data?.primary_job_information
                    ?.instruction_for_walk_in_interview
                }
              </Body2>
            </Box>
          )}

          <Body1 mt={2}>
            Application Deadline:{' '}
            {formatDate(data?.primary_job_information?.application_deadline, {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
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
            Company Information
          </S2>
          <Box color={'grey.600'}>
            <Body2>{getCompanyName()}</Body2>
            {data?.company_info_visibility?.is_company_address_visible ==
              SHOW && getCompanyAddress()}
            {data?.company_info_visibility?.is_company_business_visible ==
              SHOW && <Body2>{getCompanyBusiness()}</Body2>}
          </Box>
        </Grid>
      </Grid>
      <Box mt={3} display={'flex'} justifyContent={'space-between'}>
        <Button onClick={onBack} variant={'outlined'} color={'primary'}>
          {messages['common.previous']}
        </Button>
        <Button
          onClick={onReadyToProcess}
          variant={'contained'}
          color={'primary'}>
          {messages['common.ready_to_process']}
        </Button>
      </Box>
    </StyledBox>
  );
};

export default PreviewJob;
