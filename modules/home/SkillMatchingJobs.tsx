import {Box, Button, Card, Container, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {AccessTime, ArrowRightAlt, Info} from '@mui/icons-material';
import React from 'react';
import {H3} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';

const PREFIX = 'SkillMatchingJobs';

const classes = {
  title: `${PREFIX}-title`,
  vBar: `${PREFIX}-vBar`,
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

  [`& .${classes.vBar}`]: {
    height: '33px',
    width: '2px',
    background: 'linear-gradient(45deg, #ec5c17,#5affab)',
    marginRight: '10px',
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
}));

let items = [
  {
    img: '/images/skill-matching-job1.jpg',
    title: 'ডাটা ইঞ্জিনিয়ারিং',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'তেজগাওঁ ঢাকা',
  },
  {
    img: '/images/skill-matching-job2.jpg',
    title: 'গ্রাফিক্স ডিজাইন',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'তেজগাওঁ ঢাকা',
  },
  {
    img: '/images/skill-matching-job1.jpg',
    title: 'ডাটা ইঞ্জিনিয়ারিং',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'তেজগাওঁ ঢাকা',
  },
  {
    img: '/images/skill-matching-job2.jpg',
    title: 'গ্রাফিক্স ডিজাইন',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'তেজগাওঁ ঢাকা',
  },
];

const SkillMatchingJobs = () => {
  const {messages} = useIntl();
  const cardItem = (item: any, key: number) => {
    return (
      <Box mr={1} ml={1} key={key}>
        <Card className={classes.courseItem}>
          <Box>
            <img
              className={classes.image}
              src={item.img}
              alt={item.title}
              title={item.title}
            />
          </Box>
          <Box p={2}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                {item.title}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box
                component={'span'}
                fontWeight='fontWeightBold'
                className={classes.timeDetails}>
                <AccessTime /> {item.experience}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box
                component={'span'}
                fontWeight='fontWeightBold'
                className={classes.timeDetails}>
                <Info /> {item.location}
              </Box>
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  };
  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg'>
        <H3>
          <Box
            style={{fontSize: '33px', marginBottom: '50px', marginTop: '10px'}}
            className={classes.title}
            justifyContent={'center'}>
            <Box className={classes.vBar} />
            <Box fontWeight='fontWeightBold'>
              {messages['nise.skill_matching_Job']}
            </Box>
          </Box>
        </H3>
        <Box mb={2}>
          <CustomCarousel>
            {items.map((item: any, key: number) => cardItem(item, key))}
          </CustomCarousel>
        </Box>
        <Grid item container justifyContent='center'>
          <Button
            sx={{borderRadius: '10px'}}
            variant='outlined'
            color='primary'
            endIcon={<ArrowRightAlt />}>
            {messages['common.see_more']}
          </Button>
        </Grid>
      </Container>
    </StyledGrid>
  );
};

export default SkillMatchingJobs;
