import React from 'react';
import {Container, Grid} from '@mui/material';
import JobCardComponent from './components/JobCardComponent';
import PostLoadingSkeleton from '../../youth/common/PostLoadingSkeleton';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {useIntl} from 'react-intl';

let jobs = [
  {
    id: 1,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-3.png',
    title: 'ওটি অ্যাসিস্ট্যান্ট',
    experience: '১-৩ বছর অভিজ্ঞতা',
    location: 'আশুলিয়াা',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
  {
    id: 2,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-4.png',
    title: 'মেডিক্যাল সহকারী',
    experience: 'প্রযোজ্য নয়',
    location: 'রূপগঞ্জ',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
  {
    id: 3,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-5.png',
    title: 'সিসিটিভি টেকনিশিয়ান',
    experience: '২ বছর অভিজ্ঞতা',
    location: 'ঢাকা',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
  {
    id: 4,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-6.png',
    title: 'অটোমোবাইল ইঞ্জিনিয়ার',
    experience: '৫-৭ বছর অভিজ্ঞতা',
    location: 'উত্তরা',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
  {
    id: 5,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-7.png',
    title: 'কম্পিউটার অপারেটর',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'মিরপুর',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
  {
    id: 6,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-8.png',
    title: 'ডাটা এন্ট্রি অপারেটর',
    experience: 'প্রযোজ্য নয়়',
    location: 'ঢাকা',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
];

/*const {data: freelancerLists, isLoading: isLoadingFreelancers} =
  useFetchYouths(freelancerFilters);*/
const isLoadingJob = false;

const JobCircular = () => {
  const {messages} = useIntl();
  return (
    <Container maxWidth={'lg'}>
      <Grid container spacing={3}>
        {isLoadingJob ? (
          <PostLoadingSkeleton />
        ) : (
          jobs?.map((job: any) => {
            return (
              <Grid item xs={12} sm={12} md={12} key={job.id}>
                <JobCardComponent job={job} />
              </Grid>
            );
          })
        )}

        {jobs && jobs.length <= 0 && (
          <NoDataFoundComponent
            message={messages['common.no_data_found'] as string}
          />
        )}
      </Grid>
    </Container>
  );
};

export default JobCircular;
