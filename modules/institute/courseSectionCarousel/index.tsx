import React from 'react';
import {Box, Button} from '@mui/material';
import {Link} from '../../../@softbd/elements/common';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import Carousel from 'react-multi-carousel';
import makeStyles from '@mui/styles/makeStyles';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import {ArrowRightAlt} from '@mui/icons-material';
import {useRouter} from 'next/router';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxItem: {
      background: theme.palette.background.paper,
      borderRadius: 4 * parseInt(theme.shape.borderRadius.toString()),
      padding: '20px 10px 60px 10px',
      margin: 0,
    },
    button: {
      borderRadius: 20,
    },
  }),
);

const img =
  'https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60';

const CourseSectionCarousel = ({courses}: any) => {
  const classes = useStyles();
  const router = useRouter();
  const path = router.pathname;
  const {messages} = useIntl();

  return (
    <>
      <Box>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay={true}
          autoPlaySpeed={3000}
          centerMode={false}
          className=''
          containerClass='container-with-dots'
          dotListClass=''
          draggable
          focusOnSelect={false}
          infinite
          itemClass=''
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 4,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          // showDots
          sliderClass=''
          slidesToSlide={1}
          swipeable>
          {courses.map((item: any) => (
            <Box key={item.id} className={classes.boxItem}>
              <Link href={`/institute/course-details/${item.id}`}>
                <CourseCardComponent
                  course={{
                    id: item.id,
                    cover_image: img,
                    title: item.title,
                    institute_title: item.institute_title,
                    course_fee: item.course_fee,
                    created_at: getMomentDateFormat(
                      item.created_at,
                      'DD MMM, YYYY',
                    ),
                    duration: item.duration,
                    total_enroll: item.total_enroll,
                  }}
                />
              </Link>
            </Box>
          ))}
        </Carousel>
      </Box>
      <Box display='flex' justifyContent='center'>
        <Link href={`${path}/courses`}>
          <Button
            variant='outlined'
            size='large'
            endIcon={<ArrowRightAlt />}
            className={classes.button}>
            {messages['common.see_more']}
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default CourseSectionCarousel;
