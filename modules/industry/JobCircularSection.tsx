import {Box, Button, Card, Container, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {ArrowRightAlt, BusinessCenter, LocationOn} from '@mui/icons-material';
import React from 'react';
import {useIntl} from 'react-intl';
import {industryDomain} from '../../@softbd/common/constants';
import {
  LINK_FRONTEND_INDUSTRY_JOB_CIRCULAR,
  LINK_FRONTEND_YOUTH_JOB_CIRCULAR_DETAILS,
} from '../../@softbd/common/appLinks';
import {Link} from '../../@softbd/elements/common';
import UnderlinedHeadingH1 from '../../@softbd/elements/common/UnderlinedHeadingH1';

const PREFIX = 'JobCircularSection';

const classes = {
  title: `${PREFIX}-title`,
  courseItem: `${PREFIX}-courseItem`,
  image: `${PREFIX}-image`,
  timeDetails: `${PREFIX}-timeDetails`,
  company: `${PREFIX}-company`,
  iconMargin: `${PREFIX}-iconMargin`,
  taka: `${PREFIX}-taka`,
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
    height: '90px',
  },

  [`& .${classes.timeDetails}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.company}`]: {
    color: theme.palette.warning.light,
  },

  [`& .${classes.taka}`]: {
    margin: '0 10px 0 5px',
  },

  '& .react-multi-carousel-list': {
    padding: '20px 0px',
  },

  [`& .${classes.iconMargin}`]: {
    marginRight: '10px',
    maxWidth: theme.breakpoints.values.xl,
    [theme.breakpoints.up('xs')]: {
      marginRight: '5px',
    },
  },
}));

let items = [
  {
    id: 1,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-3.png',
    title: 'ওটি অ্যাসিস্ট্যান্ট',
    experience: '১-৩ বছর অভিজ্ঞতা',
    location: 'আশুলিয়াা',
    remuneration: '50000-60000',
  },
  {
    id: 2,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-4.png',
    title: 'মেডিক্যাল সহকারী',
    experience: 'প্রযোজ্য নয়',
    location: 'রূপগঞ্জ',
    remuneration: '50000-60000',
  },
  {
    id: 3,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-5.png',
    title: 'সিসিটিভি টেকনিশিয়ান',
    experience: '২ বছর অভিজ্ঞতা',
    location: 'ঢাকা',
    remuneration: '50000-60000',
  },
  {
    id: 4,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-6.png',
    title: 'অটোমোবাইল ইঞ্জিনিয়ার',
    experience: '৫-৭ বছর অভিজ্ঞতা',
    location: 'উত্তরা',
    remuneration: '50000-60000',
  },
  {
    id: 5,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-7.png',
    title: 'কম্পিউটার অপারেটর',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'মিরপুর',
    remuneration: '50000-60000',
  },
  {
    id: 6,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-8.png',
    title: 'ডাটা এন্ট্রি অপারেটর',
    experience: 'প্রযোজ্য নয়়',
    location: 'ঢাকা',
    remuneration: '50000-60000',
  },
];

const JobCircularSection = () => {
  const {messages} = useIntl();
  /*const authUser = useAuthUser<YouthAuthUser>();*/

  const cardItem = (item: any, key: number) => {
    return (
      <Box mr={1} ml={1} key={key}>
        <Card className={classes.courseItem}>
          <Box>
            <img
              className={classes.image}
              src={item.logo}
              alt={item.title}
              title={item.title}
            />
          </Box>
          <Box p={2}>
            <Typography
              variant='subtitle2'
              gutterBottom={true}
              className={classes.company}>
              {item.company}
            </Typography>

            <Typography
              variant='subtitle1'
              gutterBottom={true}
              style={{lineHeight: '1'}}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                {item.title}
              </Box>
            </Typography>

            <Typography gutterBottom={true} className={classes.timeDetails}>
              <BusinessCenter className={classes.iconMargin} />{' '}
              {item.experience}
            </Typography>

            <Typography gutterBottom={true} className={classes.timeDetails}>
              <LocationOn className={classes.iconMargin} /> {item.location}
            </Typography>

            <Typography gutterBottom={true} className={classes.timeDetails}>
              <Box
                component={'span'}
                fontWeight='fontWeightBold'
                className={classes.taka}>
                &#2547;
              </Box>
              {item.remuneration} {messages['common.taka']}
            </Typography>
          </Box>
          <Box style={{margin: '0 0 20px 21px'}}>
            <Link
              /*href={
                                                            authUser
                                                              ? industryDomain() +
                                                                LINK_FRONTEND_YOUTH_JOB_CIRCULAR_DETAILS +
                                                                item?.id
                                                              : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                                                          }>*/
              href={
                industryDomain() +
                LINK_FRONTEND_YOUTH_JOB_CIRCULAR_DETAILS +
                `/${item.id}`
              }>
              <Button variant={'contained'} color={'primary'}>
                {messages['industry.apply_now']}
              </Button>
            </Link>
          </Box>
        </Card>
      </Box>
    );
  };

  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg'>
        <UnderlinedHeadingH1>
          {messages['menu.job_circular']}
        </UnderlinedHeadingH1>
        <Box mb={2}>
          <CustomCarousel itemsInDesktop={3}>
            {items.map((item: any, key: number) => cardItem(item, key))}
          </CustomCarousel>
        </Box>
        <Grid item container justifyContent='center'>
          <Link href={LINK_FRONTEND_INDUSTRY_JOB_CIRCULAR}>
            <Button
              sx={{borderRadius: '10px'}}
              variant='outlined'
              data-test-id='jobceicular-more'
              color='primary'
              endIcon={<ArrowRightAlt />}>
              {messages['common.see_more']}
            </Button>
          </Link>
        </Grid>
      </Container>
    </StyledGrid>
  );
};

export default JobCircularSection;
