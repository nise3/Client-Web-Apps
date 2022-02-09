import {Box, Button, Container, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {ArrowRightAlt} from '@mui/icons-material';
import React, {useState} from 'react';
import {H2} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import VerticalBar from './components/VerticalBar';
import {useFetchPublicJobs} from '../../services/IndustryManagement/hooks';
import JobCardComponent from '../../@softbd/elements/JobCardComponent';
import BoxContentSkeleton from '../youth/profile/component/BoxContentSkeleton';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';
import JobCategory from '../../@softbd/utilities/JobCategorie';
import PageSizes from '../../@softbd/utilities/PageSizes';
import Link from 'next/link';
import {LINK_FRONTEND_JOBS} from '../../@softbd/common/appLinks';

const PREFIX = 'NisePopularJobs';

const classes = {
  title: `${PREFIX}-title`,
  courseItem: `${PREFIX}-courseItem`,
  image: `${PREFIX}-image`,
  timeDetails: `${PREFIX}-timeDetails`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  marginTop: '50px',

  [`& .${classes.title}`]: {
    color: '#682988',
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.courseItem}`]: {
    position: 'relative',
    boxShadow: '2px 8px 7px #ddd',
    border: '1px solid #ddd',
  },

  [`& .${classes.image}`]: {
    width: '100%',
    height: '125px',
  },

  [`& .${classes.timeDetails}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  '& .react-multi-carousel-list': {
    padding: '20px 0px',
  },
}));

const PopularJobs = () => {
  const {messages} = useIntl();
  const [jobFilters] = useState<any>({
    page_size: PageSizes.EIGHT,
  });
  const {data: jobs, isLoading} = useFetchPublicJobs(jobFilters);

  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg'>
        <Box
          style={{
            fontSize: '2.063rem',
            marginBottom: '50px',
            marginTop: '10px',
          }}
          className={classes.title}
          justifyContent={'center'}>
          <VerticalBar />
          <H2 style={{fontSize: '2rem', fontWeight: 'bold'}}>
            {messages['nise.popular_jobs']}
          </H2>
        </Box>
        <Box mb={2}>
          {isLoading ? (
            <BoxContentSkeleton />
          ) : jobs && jobs.length > 0 ? (
            <CustomCarousel>
              {jobs.map((job: any, index: number) => (
                <Box mr={1} ml={1} key={index}>
                  <JobCardComponent job={job} isGridView={true} />
                </Box>
              ))}
            </CustomCarousel>
          ) : (
            <NoDataFoundComponent />
          )}
        </Box>
        {jobs && jobs?.length > 0 && (
          <Grid item container justifyContent='center'>
            <Link
              href={`${LINK_FRONTEND_JOBS}/${JobCategory.POPULAR}`}
              passHref>
              <Button
                sx={{borderRadius: '10px'}}
                variant='outlined'
                color='primary'
                endIcon={<ArrowRightAlt />}>
                {messages['common.see_more']}
              </Button>
            </Link>
          </Grid>
        )}
      </Container>
    </StyledGrid>
  );
};

export default PopularJobs;
