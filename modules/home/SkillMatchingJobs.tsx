import {Box, Button, Card, Container, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {AccessTime, ArrowRightAlt, Info} from '@mui/icons-material';
import React from 'react';
import {H3} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import VerticalBar from './components/VerticalBar';

const PREFIX = 'SkillMatchingJobs';

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

let items = [
  {
    img: '/images/skill-matching-job-3.png',
    title: 'ওটি অ্যাসিস্ট্যান্ট',
    experience: '1-৩ বছর অভিজ্ঞতা',
    location: 'আশুলিয়াা',
  },
  {
    img: '/images/skill-matching-job-4.png',
    title: 'মেডিক্যাল সহকারী',
    experience: 'প্রযোজ্য নয়',
    location: 'রূপগঞ্জ',
  },
  {
    img: '/images/skill-matching-job-5.png',
    title: 'সিসিটিভি টেকনিশিয়ান',
    experience: '২ বছর অভিজ্ঞতা',
    location: 'ঢাকা',
  },
  {
    img: '/images/skill-matching-job-6.png',
    title: 'অটোমোবাইল ইঞ্জিনিয়ার',
    experience: '৫-৭ বছর অভিজ্ঞতা',
    location: 'উত্তরা',
  },
  {
    img: '/images/skill-matching-job-7.png',
    title: 'কম্পিউটার অপারেটর',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'মিরপুর',
  },
  {
    img: '/images/skill-matching-job-8.png',
    title: 'ডাটা এন্ট্রি অপারেটর',
    experience: 'প্রযোজ্য নয়়',
    location: 'ঢাকা',
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
            style={{
              fontSize: '2.063rem',
              marginBottom: '50px',
              marginTop: '10px',
            }}
            className={classes.title}
            justifyContent={'center'}>
            <VerticalBar />
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
