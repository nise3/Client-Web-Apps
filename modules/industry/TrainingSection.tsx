import {Box, Button, Container, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {ArrowRightAlt} from '@mui/icons-material';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {Link} from '../../@softbd/elements/common';
import UnderlinedHeading from '../../@softbd/elements/common/UnderlinedHeading';
import TrainingCard from './TrainingCard';
import PageSizes from '../../@softbd/utilities/PageSizes';
import {useFetchCourseList} from '../../services/instituteManagement/hooks';

const PREFIX = 'TrainingSection';

const classes = {
  title: `${PREFIX}-title`,
};

const StyledGrid = styled(Grid)(() => ({
  marginTop: '50px',
  backgroundColor: '#fff',

  [`& .${classes.title}`]: {
    color: '#682988',
    display: 'flex',
    alignItems: 'center',
  },

  '& .react-multi-carousel-list': {
    padding: '16px 0px',
  },
}));

const TrainingSection = () => {
  const {messages} = useIntl();

  const [courseFilters] = useState<any>({page_size: PageSizes.TEN});
  const pathValue = 'popular';
  const {data: courseList} = useFetchCourseList(pathValue, courseFilters);

  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg'>
        {/** headline */}
        <UnderlinedHeading>{messages['industry.training']}</UnderlinedHeading>

        {/** Carousel content */}
        <Box mb={2}>
          {courseList && courseList.length > 0 ? (
            <CustomCarousel>
              {courseList.map((course: any, key: number) => (
                /*<Link passHref key={key} href={`/course-details/${course.id}`}>*/
                <Link passHref key={key}>
                  <Box mr={1} ml={1}>
                    <TrainingCard course={course} />
                  </Box>
                </Link>
              ))}
            </CustomCarousel>
          ) : (
            <Grid container sx={{justifyContent: 'center'}}>
              <Typography variant={'h6'}>
                {messages['common.no_data_found']}
              </Typography>
            </Grid>
          )}
        </Box>

        {/** see mor button */}
        {courseList && courseList?.length > 0 && (
          <Grid item container justifyContent='center' spacing={2}>
            {/*<Link href={'/course-list/popular'} passHref>*/}
            <Link passHref>
              <Button
                variant='outlined'
                color='primary'
                endIcon={<ArrowRightAlt />}
                style={{
                  marginTop: '15px',
                  marginBottom: '15px',
                  borderRadius: '10px',
                }}>
                {messages['common.see_more']}
              </Button>
            </Link>
          </Grid>
        )}
      </Container>
    </StyledGrid>
  );
};

export default TrainingSection;
