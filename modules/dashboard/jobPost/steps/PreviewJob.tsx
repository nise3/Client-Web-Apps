import React from 'react';
import {Box, Button, Card, CardContent, Grid, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import {EmploymentStatus} from '../enums/EmploymentStatus';
import {Body2, H3, H6} from '../../../../@softbd/elements/common';
import JobPreviewSubComponent from './components/JobPreviewSubComponent';

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
    not_applicable: false,
    employment_status: [1, 2],
    deadline: '2022-01-20',
  },
  step2: {
    job_location: 'Anywhere in Bangladesh',
    min_salary: 10000,
    max_salary: 50000,
    salary_show_type: 1,
    additional_salary_info: 'Negotiable based on experience.',
    job_responsibilities:
      'Develop, Test and Deploy web application.\nWrite clean and organized code',
  },
  step3: {
    experience_status: 1,
    min_experience: 3,
    max_experience: null,
    min_age: 27,
    max_age: 45,
    can_fresher_apply: true,
  },
  step4: {
    companyName: 'SOFT-BD',
  },
  step5: {},
  step6: {},
  publish_date: '2021-09-11',
};

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

  return (
    <Box mt={3}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <H3>{data.step1.job_title}</H3>
          <H6 fontWeight={'bold'}>{data.step4.companyName}</H6>
          <JobPreviewSubComponent title={'Vacancy'}>
            {data.step1.not_applicable
              ? 'N/A'
              : formatNumber(data.step1.vacancy)}
          </JobPreviewSubComponent>

          <JobPreviewSubComponent title={'Job Responsibilities'}>
            {data.step2.job_responsibilities}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.employment_status'] as string}>
            {getJobNature()}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.educational_requirements'] as string}>
            hi
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.experience_requirements'] as string}>
            hi
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['job_posting.additional_requirements'] as string}>
            hi
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['common.job_location'] as string}>
            {data.step2.job_location}
          </JobPreviewSubComponent>
          <JobPreviewSubComponent
            title={messages['common.salary'] as string}
            childContainerProps={{
              sx: {
                paddingLeft: '0',
              },
            }}>
            {data.step2.additional_salary_info &&
            data.step2.additional_salary_info != '' ? (
              <ul>
                <li>{getSalary()}</li>
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
            Other
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
              <Body2 sx={{marginTop: '6px'}}>
                <b>Salary: </b>
                {getSalary()}
              </Body2>
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
        <Grid item xs={12}></Grid>
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
    </Box>
  );
};

export default PreviewJob;
