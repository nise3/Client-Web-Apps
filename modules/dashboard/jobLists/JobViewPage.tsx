import {useRouter} from 'next/router';
import {styled} from '@mui/material/styles';
import {Box, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import {EmploymentStatus, Gender} from './jobPost/enums/JobPostEnums';
import React from 'react';
import {H3, S1} from '../../../@softbd/elements/common';
import JobPreviewSubComponent from './jobPost/steps/components/JobPreviewSubComponent';

const data: any = {
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
  candidate_requirements: {
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

const PREFIX = 'JobView';

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

const JobViewPage = () => {
  const {messages, formatNumber, formatDate} = useIntl();
  const router = useRouter();
  const {jobId} = router.query;

  console.log(': ', jobId);

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
    let salaryText: any = '';

    if (data?.additional_job_information?.is_salary_info_show == 1) {
      salaryText =
        '৳ ' +
        formatNumber(data?.additional_job_information?.salary_min) +
        ' - ' +
        formatNumber(data?.additional_job_information?.salary_max) +
        ` (${messages['common.monthly']})`;
    } else if (data?.additional_job_information?.is_salary_info_show == 3) {
      salaryText = messages['common.negotiable'];
    }

    return salaryText;
  };

  const getExperienceText = () => {
    if (data?.candidate_requirements?.experience_status == 1) {
      let experienceText = '';
      if (
        data?.candidate_requirements?.min_experience &&
        data?.candidate_requirements?.max_experience
      ) {
        experienceText =
          data?.candidate_requirements?.min_experience +
          ' to ' +
          data?.candidate_requirements?.max_experience +
          ' year(s)';
      } else if (data?.candidate_requirements?.min_experience) {
        experienceText =
          'At least ' +
          data?.candidate_requirements?.min_experience +
          ' year(s)';
      } else if (data?.candidate_requirements?.max_experience) {
        experienceText =
          'At most ' +
          data?.candidate_requirements?.max_experience +
          ' year(s)';
      }
      return experienceText;
    } else {
      return messages['common.n_a'];
    }
  };

  const getAgeText = () => {
    let ageText = '';

    if (
      data?.candidate_requirements?.min_age &&
      data?.candidate_requirements?.max_age
    ) {
      ageText =
        data?.candidate_requirements?.min_age +
        ' to ' +
        data?.candidate_requirements?.max_age +
        ' years';
    } else if (data?.candidate_requirements?.min_age) {
      ageText = 'At least ' + data?.candidate_requirements?.min_age + ' years';
    } else if (data?.candidate_requirements?.max_age) {
      ageText = 'At most ' + data?.candidate_requirements?.max_age + ' years';
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

    if (data?.candidate_requirements?.other_educational_qualification) {
      additionalEducationRequirement =
        data?.candidate_requirements?.other_educational_qualification.split(
          '\n',
        );
    }

    let educationalInstitutes = '';

    if (data?.candidate_requirements?.preferred_educational_institute) {
      data?.candidate_requirements?.preferred_educational_institute.map(
        (ins: any, index: number) => {
          educationalInstitutes += index != 0 ? ', ' : '';
          educationalInstitutes += ins;
        },
      );
    }

    let professionalCertificates = '';

    if (data?.candidate_requirements?.professional_Certificate) {
      data?.candidate_requirements?.professional_Certificate.map(
        (cert: any, index: number) => {
          professionalCertificates += index != 0 ? ', ' : '';
          professionalCertificates += cert;
        },
      );
    }

    let trainingOrTradeCourse = '';

    if (data?.candidate_requirements?.training_trade_course) {
      data?.candidate_requirements?.training_trade_course.map(
        (course: any, index: number) => {
          trainingOrTradeCourse += index != 0 ? ', ' : '';
          trainingOrTradeCourse += course;
        },
      );
    }

    let skillText = '';
    if (data?.candidate_requirements?.skills) {
      skillText = data?.candidate_requirements?.skills.join(', ');
    }
    return (
      <ul style={{paddingLeft: '20px'}}>
        {data?.candidate_requirements?.educations.map(
          (education: any, index: number) => (
            <li key={index}>
              {education.exam_degree_title} in {education.major_concentration}
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
      </ul>
    );
  };

  const getExperienceRequirements = () => {
    if (data?.candidate_requirements?.experience_status == 1) {
      let experienceText = getExperienceText();

      let experienceAreas = '';
      if (data?.candidate_requirements?.area_of_experience) {
        experienceAreas =
          data?.candidate_requirements?.area_of_experience.join(', ');
      }

      let experienceBusinessAreas = '';
      if (data?.candidate_requirements?.area_of_business) {
        experienceBusinessAreas =
          data?.candidate_requirements?.area_of_business.join(', ');
      }

      return (
        <ul style={{paddingLeft: '20px'}}>
          <li>{experienceText}</li>
          {data?.candidate_requirements?.is_fresher_applicable && (
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
    data?.candidate_requirements?.genders.map((gender: number) => {
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
    if (data?.candidate_requirements?.additional_requirements) {
      strArr =
        data?.candidate_requirements?.additional_requirements.split('\n');
    }

    return (
      <ul style={{paddingLeft: '20px'}}>
        <li>Age {getAgeText()}</li>
        {data?.candidate_requirements?.genders.length > 0 &&
          data?.candidate_requirements?.genders.length < 3 && (
            <li>{getGenderText()}</li>
          )}
        {strArr.map((item: string, index) => (
          <li key={index}>{item}</li>
        ))}
        {data?.candidate_requirements?.is_person_with_disability_can_apply && (
          <li>{messages['job_preview.person_with_disability']}</li>
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
          (messages['job_preview.salary_review'] as string) +
          (data?.additional_job_information?.salary_review == 1
            ? messages['common.yearly']
            : messages['common.half_yearly']);
      }
      let lunchFacilitiesText = null;
      if (data?.additional_job_information?.lunch_facilities) {
        lunchFacilitiesText =
          (messages['job_preview.lunch_facilities'] as string) +
          (data?.additional_job_information?.lunch_facilities == 1
            ? messages['common.full_subsidize']
            : messages['common.partially_subsidize']);
      }

      let othersArr: Array<string> = [];
      if (data?.additional_job_information?.others) {
        othersArr = data?.additional_job_information?.others.split('\n');
      }

      return (
        <React.Fragment>
          <ul style={{paddingLeft: '20px'}}>
            {salaryReviewText && <li>{salaryReviewText}</li>}
            {lunchFacilitiesText && <li>{lunchFacilitiesText}</li>}
            {data?.additional_job_information?.festival_bonus && (
              <li>
                {messages['job_preview.festival_bonus']}{' '}
                {data?.additional_job_information?.festival_bonus} (
                {messages['common.yearly']})
              </li>
            )}
          </ul>

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

  return (
    <StyledBox mb={2}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <H3>{data?.primary_job_information?.job_title}</H3>
          <S1 fontWeight={'bold'}>
            {data?.company_info_visibility?.company_name}
          </S1>
          <JobPreviewSubComponent title={messages['common.vacancy']}>
            {data?.primary_job_information?.no_of_vacancies
              ? formatNumber(data?.primary_job_information?.no_of_vacancies)
              : messages['common.n_a']}
          </JobPreviewSubComponent>

          {data?.additional_job_information?.job_context && (
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
          {data?.additional_job_information?.work_places && (
            <JobPreviewSubComponent title={messages['job_posting.workplace']}>
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
            {data?.primary_job_information?.published_at
              ? formatDate(data.primary_job_information.published_at, {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
              : ''}
          </JobPreviewSubComponent>
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default JobViewPage;
