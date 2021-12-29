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
import {Gender, EmploymentStatus} from '../enums/JobPostEnums';

interface Props {
  onBack: () => void;
  onContinue: () => void;
}

const data = {
  step1: {
    job_title: 'Software Engineer',
    job_sector_title: 'IT',
    occupation_title: 'Telecommunication',
    vacancy: 5,
    not_applicable: true,
    employment_status: [1, 2],
    deadline: '2022-01-20',
    is_photograph_enclosed: true,
    special_instruction:
      'We are looking for a talented and experienced (2+ years) PHP developer, who able to work php framework preferably (cakephp, laravel) . The developer should work with AngularJS/ReactJS/VueJS. Having knowledge in Python is good. Knowing Android / IOS will be added advantage.',
    is_apply_online: true,
    resume_receiving_status: 1,
    email: 'admin@softbdltd.com',
    use_nise3_email: true,
    hard_copy:
      'Apply procedure 1\n' +
      'Apply procedure 2 sdlkfj sdkfskdjfsk jskd slkdjflskd jskldfjsdkl fjsdklfj slkdfj kdfjsdl fjksdl kf\n' +
      'Apply procedure 3\nApply procedure 4',
    walk_in_interview:
      'Apply procedure 1\n' +
      'Apply procedure 2 sdlkfj sdkfskdjfsk jskd slkdjflskd jskldfjsdkl fjsdklfj slkdfj kdfjsdl fjksdl kf\n' +
      'Apply procedure 3\nApply procedure 4',
  },
  step2: {
    job_location: 'Anywhere in Bangladesh',
    min_salary: 10000,
    max_salary: 50000,
    salary_show_type: 1,
    additional_salary_info: 'Negotiable based on experience.',
    job_context: 'Job Context 1\nJob Context 2\nJob Context 3',
    job_responsibilities:
      'Develop, Test and Deploy web application.\nWrite clean and organized code',
    workplace: [1, 2],
    compensation_other_benefits: true,
    facilities: [4, 5, 6, 7, 9, 10],
    lunch_facilities: 1,
    salary_review: 1,
    festival_bonus: 2,
    others:
      'Excellent environment to learn\nOther benefits as per company policies',
  },
  step3: {
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
  step4: {
    is_show_company_name: true,
    companyName: 'SOFT-BD',
    is_show_company_address: true,
    company_industry_type: 1,
    is_show_company_business: true,
  },
  step5: {},
  step6: {},
  publish_date: '2021-09-11',
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

const PreviewJob = ({onBack, onContinue}: Props) => {
  const {messages, formatNumber, formatDate} = useIntl();

  const onReadyToProcess = () => {
    try {
      onContinue();
    } catch (error: any) {}
  };

  const getJobNature = () => {
    let jobNature: Array<string> = [];
    if (data.step1.employment_status) {
      data.step1.employment_status.map((status: number) => {
        switch (status) {
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

    if (data.step2.salary_show_type == 1) {
      salaryText =
        'Tk. ' +
        data.step2.min_salary +
        ' - ' +
        data.step2.max_salary +
        '(monthly)';
    } else if (data.step2.salary_show_type == 3) {
      salaryText = 'Negotiable';
    }

    return salaryText;
  };

  const getExperienceText = () => {
    if (data.step3.experience_status == 1) {
      let experienceText = '';
      if (data.step3.min_experience && data.step3.max_experience) {
        experienceText =
          data.step3.min_experience +
          ' to ' +
          data.step3.max_experience +
          ' year(s)';
      } else if (data.step3.min_experience) {
        experienceText = 'At least ' + data.step3.min_experience + ' year(s)';
      } else if (data.step3.max_experience) {
        experienceText = 'At most ' + data.step3.max_experience + ' year(s)';
      }
      return experienceText;
    } else {
      return 'N/A';
    }
  };

  const getAgeText = () => {
    let ageText = '';

    if (data.step3.min_age && data.step3.max_age) {
      ageText = data.step3.min_age + ' to ' + data.step3.max_age + ' years';
    } else if (data.step3.min_age) {
      ageText = 'At least ' + data.step3.min_age + ' years';
    } else if (data.step3.max_age) {
      ageText = 'At most ' + data.step3.max_age + ' years';
    }

    return ageText;
  };

  const getJobContext = () => {
    let strArr: Array<string> = [];
    strArr = data.step2.job_context.split('\n');
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
    if (data.step2.job_responsibilities) {
      strArr = data.step2.job_responsibilities.split('\n');
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

    if (data.step3.other_educational_qualification) {
      additionalEducationRequirement =
        data.step3.other_educational_qualification.split('\n');
    }

    let educationalInstitutes = '';

    if (data.step3.preferred_educational_institute) {
      data.step3.preferred_educational_institute.map((ins: any, index) => {
        educationalInstitutes += index != 0 ? ', ' : '';
        educationalInstitutes += ins;
      });
    }

    let professionalCertificates = '';

    if (data.step3.professional_Certificate) {
      data.step3.professional_Certificate.map((cert: any, index) => {
        professionalCertificates += index != 0 ? ', ' : '';
        professionalCertificates += cert;
      });
    }

    let trainingOrTradeCourse = '';

    if (data.step3.training_trade_course) {
      data.step3.training_trade_course.map((course: any, index) => {
        trainingOrTradeCourse += index != 0 ? ', ' : '';
        trainingOrTradeCourse += course;
      });
    }

    let skillText = '';
    if (data.step3.skills) {
      skillText = data.step3.skills.join(', ');
    }
    return (
      <ul style={{paddingLeft: '20px'}}>
        {data.step3.educations.map((education: any, index) => (
          <li key={index}>
            {education.exam_degree_title} in {education.major_concentration}
          </li>
        ))}
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
    if (data.step3.experience_status == 1) {
      let experienceText = getExperienceText();

      let experienceAreas = '';
      if (data.step3.area_of_experience) {
        experienceAreas = data.step3.area_of_experience.join(', ');
      }

      let experienceBusinessAreas = '';
      if (data.step3.area_of_business) {
        experienceBusinessAreas = data.step3.area_of_business.join(', ');
      }

      return (
        <ul style={{paddingLeft: '20px'}}>
          <li>{experienceText}</li>
          {data.step3.is_fresher_applicable && (
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
    data.step3.genders.map((gender: number) => {
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
    if (data.step3.additional_requirements) {
      strArr = data.step3.additional_requirements.split('\n');
    }

    return (
      <ul style={{paddingLeft: '20px'}}>
        <li>Age {getAgeText()}</li>
        {data.step3.genders.length > 0 && data.step3.genders.length < 3 && (
          <li>{getGenderText()}</li>
        )}
        {strArr.map((item: string, index) => (
          <li key={index}>{item}</li>
        ))}
        {data.step3.is_person_with_disability_can_apply && (
          <li>Person with disability are encouraged to apply</li>
        )}
      </ul>
    );
  };

  const getWorkplace = () => {
    let workplaceStrArr: Array<string> = [];

    data.step2.workplace.map((place: number) => {
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
    if (data.step2.compensation_other_benefits) {
      let salaryReviewText = null;
      if (data.step2.salary_review) {
        salaryReviewText =
          'Salary review: ' +
          (data.step2.salary_review == 1 ? 'Yearly' : 'Half-yearly');
      }
      let lunchFacilitiesText = null;
      if (data.step2.lunch_facilities) {
        lunchFacilitiesText =
          'Lunch Facilities: ' +
          (data.step2.lunch_facilities == 1
            ? 'Full subsidize'
            : 'Partially subsidize');
      }

      let othersArr: Array<string> = [];
      if (data.step2.others) {
        othersArr = data.step2.others.split('\n');
      }

      return (
        <ul style={{paddingLeft: '20px'}}>
          {salaryReviewText && <li>{salaryReviewText}</li>}
          {lunchFacilitiesText && <li>{lunchFacilitiesText}</li>}
          {data.step2.festival_bonus && (
            <li>Festival bonus: {data.step2.festival_bonus} (Yearly)</li>
          )}
          {(data.step2.facilities || []).map((item: number) => {
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
          })}
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
    if (data.step4.is_show_company_name) {
      return data.step4.companyName;
    } else {
      return data.step4.companyName;
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
          <H3>{data.step1.job_title}</H3>
          <S1 fontWeight={'bold'}>{data.step4.companyName}</S1>
          <JobPreviewSubComponent title={'Vacancy'}>
            {data.step1.not_applicable
              ? 'N/A'
              : formatNumber(data.step1.vacancy)}
          </JobPreviewSubComponent>

          {data.step2.job_context && (
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
          {data.step2.workplace && (
            <JobPreviewSubComponent title={'Workplace'}>
              {getWorkplace()}
            </JobPreviewSubComponent>
          )}
          <JobPreviewSubComponent
            title={messages['common.job_location'] as string}>
            {data.step2.job_location}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent title={messages['common.salary'] as string}>
            {data.step2.additional_salary_info &&
            data.step2.additional_salary_info != '' ? (
              <ul style={{paddingLeft: '20px'}}>
                {data.step2.salary_show_type != 2 && <li>{getSalary()}</li>}
                <li>{data.step2.additional_salary_info}</li>
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
            {formatDate(data.publish_date, {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </JobPreviewSubComponent>
        </Grid>
        <Grid item xs={1} md={4}>
          <Typography>
            <b>Category:</b> {data.step1.job_sector_title}/
            {data.step1.occupation_title}
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
                {formatDate(data.publish_date, {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </Body2>
              <Body2 sx={{marginTop: '6px'}}>
                <b>Vacancy: </b>
                {data.step1.not_applicable
                  ? 'N/A'
                  : formatNumber(data.step1.vacancy)}
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
                {data.step2.job_location}
              </Body2>
              {data.step2.salary_show_type != 2 && (
                <Body2 sx={{marginTop: '6px'}}>
                  <b>Salary: </b>
                  {getSalary()}
                </Body2>
              )}
              <Body2 sx={{marginTop: '6px'}}>
                <b>Application Deadline: </b>
                {formatDate(data.step1.deadline, {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </Body2>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} textAlign={'center'} mt={2}>
          <S2 fontWeight={'bold'} className={classes.footerTitle}>
            Read Before Apply
          </S2>
          {data.step1.special_instruction && (
            <Body2 mt={2} color={'grey.600'}>
              {data.step1.special_instruction}
            </Body2>
          )}
          {data.step1.is_photograph_enclosed && (
            <S2 mt={1}>
              <span style={{color: 'red'}}>*Photograph</span> must be enclosed
              with the resume.
            </S2>
          )}

          <S2 fontWeight={'bold'} mt={2}>
            Apply Procedure
          </S2>

          {data.step1.is_apply_online && (
            <Button
              color={'primary'}
              size={'medium'}
              variant={'contained'}
              sx={{marginTop: '15px'}}>
              Apply Online
            </Button>
          )}

          {data.step1.resume_receiving_status == 1 && (
            <Box mt={3}>
              <S2>Email</S2>
              <Body2 color={'grey.600'}>
                Send your CV to{' '}
                <span style={{fontWeight: 'bold'}}>{data.step1.email} </span>
                {data.step1.use_nise3_email && (
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

          {data.step1.resume_receiving_status == 2 && (
            <Box mt={3}>
              <S2 fontWeight={'bold'}>Hard Copy</S2>
              <Body2 color={'grey.600'} sx={{whiteSpace: 'break-spaces'}}>
                {data.step1.hard_copy}
              </Body2>
            </Box>
          )}

          {data.step1.resume_receiving_status == 3 && (
            <Box mt={3}>
              <S2 fontWeight={'bold'}>Walk in Interview</S2>
              <Body2 color={'grey.600'} sx={{whiteSpace: 'break-spaces'}}>
                {data.step1.walk_in_interview}
              </Body2>
            </Box>
          )}

          <Body1 mt={2}>
            Application Deadline:{' '}
            {formatDate(data.step1.deadline, {
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
            {data.step4.is_show_company_address && getCompanyAddress()}
            {data.step4.is_show_company_business && (
              <Body2>{getCompanyBusiness()}</Body2>
            )}
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
