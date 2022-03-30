import {Box, Button, Container, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {ArrowRightAlt} from '@mui/icons-material';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {LINK_FRONTEND_JOBS} from '../../@softbd/common/appLinks';
import {Link} from '../../@softbd/elements/common';
import JobCategory from '../../@softbd/utilities/JobCategorie';
import PageSizes from '../../@softbd/utilities/PageSizes';
import {useFetchPublicJobs} from '../../services/IndustryManagement/hooks';
import BoxContentSkeleton from '../youth/profile/component/BoxContentSkeleton';
import JobCardComponent from '../../@softbd/elements/JobCardComponent';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';
import UnderlinedHeading from '../../@softbd/elements/common/UnderlinedHeading';

const PREFIX = 'JobCircularSection';

const classes = {
  title: `${PREFIX}-title`,
  courseItem: `${PREFIX}-courseItem`,
  image: `${PREFIX}-image`,
  timeDetails: `${PREFIX}-timeDetails`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  marginTop: '60px',

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
const JobCircularSection = () => {
  const {messages} = useIntl();
  const [jobFilters] = useState<any>({
    page_size: PageSizes.EIGHT,
  });
  const {data: jobs, isLoading} = useFetchPublicJobs(jobFilters);

  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg'>
        <UnderlinedHeading>{messages['menu.job_circular']}</UnderlinedHeading>
        <Box mb={2} sx={{marginTop: '-16px'}}>
          {isLoading ? (
            <BoxContentSkeleton />
          ) : jobs && jobs.length > 0 ? (
            <CustomCarousel itemsInDesktop={3}>
              {jobs.map((job: any, index: number) => (
                <Box mr={1} ml={1} key={index}>
                  <JobCardComponent job={job} isGridView={true} />
                </Box>
              ))}
            </CustomCarousel>
          ) : (
            <NoDataFoundComponent messageType={messages['common.job']} />
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

export default JobCircularSection;
