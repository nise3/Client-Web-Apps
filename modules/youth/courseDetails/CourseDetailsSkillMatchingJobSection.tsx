import React, {useEffect, useState} from 'react';
import {Button, Container, Grid} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {H2} from '../../../@softbd/elements/common';
import {useFetchPublicJobs} from '../../../services/IndustryManagement/hooks';
import JobCardComponent from '../../../@softbd/elements/JobCardComponent';
import BoxContentSkeleton from '../profile/component/BoxContentSkeleton';
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import Link from 'next/link';
import {LINK_FRONTEND_COURSE_SKILL_MATCHING_JOBS} from '../../../@softbd/common/appLinks';

interface CourseDetailsSkillMatchingJobSectionProps {
  skillIds: Array<number>;
  courseId: any;
}

const CourseDetailsSkillMatchingJobSection = ({
  skillIds,
  courseId,
}: CourseDetailsSkillMatchingJobSectionProps) => {
  const {messages} = useIntl();

  const [jobFilters, setJobFilters] = useState<any>(null);

  useEffect(() => {
    if (skillIds?.length > 0) {
      let params: any = {
        skill_ids: skillIds,
        page_size: PageSizes.FOUR,
      };
      setJobFilters(params);
    }
  }, [skillIds]);

  const {data: jobs, isLoading} = useFetchPublicJobs(jobFilters);

  return (
    <Container maxWidth={'lg'} style={{marginBottom: '5px'}}>
      <Grid container spacing={5} mt={'10px'}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container alignItems={'center'}>
            <Grid item xs={8} sm={9} md={10}>
              <H2 style={{fontWeight: 'bold', fontSize: '1.421875rem'}}>
                {messages['common.skill_matching_job']}
              </H2>
            </Grid>
            {jobs?.total_page > 1 && (
              <Grid item xs={4} sm={3} md={2} style={{textAlign: 'right'}}>
                <Link
                  href={`${LINK_FRONTEND_COURSE_SKILL_MATCHING_JOBS}${courseId}`}
                  passHref>
                  <Button
                    variant={'outlined'}
                    size={'medium'}
                    color={'primary'}>
                    {messages['common.see_all']}
                    <ChevronRight />
                  </Button>
                </Link>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {isLoading ? (
            <BoxContentSkeleton />
          ) : jobs && jobs.length > 0 ? (
            <Grid container spacing={5}>
              {jobs.map((job: any) => {
                return (
                  <Grid item xs={12} sm={4} md={3} key={job.id}>
                    <JobCardComponent job={job} isGridView={true} />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <NoDataFoundComponent
              messageType={messages['common.skill_matching_job']}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetailsSkillMatchingJobSection;
