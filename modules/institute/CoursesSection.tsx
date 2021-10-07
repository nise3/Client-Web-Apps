import React from 'react';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Box, Button, Container, Grid} from '@mui/material';
import {ArrowRightAlt} from '@mui/icons-material';
import {Fade} from 'react-awesome-reveal';
import UnderlinedHeading from './UnderlinedHeading';
// import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import CourseCardComponent from '../../@softbd/elements/CourseCardComponent';
import Carousel from 'react-multi-carousel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        marginTop: '50px',
      },
      [theme.breakpoints.down('xl')]: {
        // marginTop: '200px',
      },
    },
    subheading: {
      textAlign: 'center',
      marginBottom: 48,
    },
    boxItem: {
      background: theme.palette.background.paper,
      borderRadius: 4 * parseInt(theme.shape.borderRadius.toString()),
      padding: '20px 10px 60px 10px',
      margin: 0,
    },
    icon: {
      fontSize: '72px',
      color: theme.palette.primary.main,
    },
    desc: {
      color: theme.palette.primary.dark,
    },
    button: {
      borderRadius: 20,
    },

    rootMobileView: {
      [theme.breakpoints.down('xl')]: {
        marginTop: '235px',
      },
    },
  }),
);

const img =
  'https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60';
const sample = {
  image: img,
  title: 'Hello World!',
  providerName: 'Diane Croenwett',
  providerLogo: img,
  fee: '3000',
  createDate: 'Mar 19,2020',
  progress: 60,
};

const CoursesSection = () => {
  const classes = useStyles();

  return (
    <Grid container xl={12} className={classes.root}>
      <Container
        maxWidth='lg'
        className={classes.rootMobileView}
        disableGutters>
        <Fade direction='up'>
          <UnderlinedHeading>কোর্স সমূহ</UnderlinedHeading>
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
            showDots
            sliderClass=''
            slidesToSlide={1}
            swipeable>
            {[1, 2, 3, 4, 5, 6].map((v, i) => (
              <Box key={i} className={classes.boxItem}>
                <CourseCardComponent course={sample} />
              </Box>
            ))}
          </Carousel>
          <Box display='flex' justifyContent='center' mt={8}>
            <Button
              variant='outlined'
              size='large'
              endIcon={<ArrowRightAlt />}
              className={classes.button}>
              আরও দেখুন
            </Button>
          </Box>
        </Fade>
      </Container>
    </Grid>
  );
};
export default CoursesSection;
