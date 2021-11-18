import React, {useCallback} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, Container, Grid, Typography} from '@mui/material';
import LogoCustomizable from '../../../elements/common/LogoCustomizable';
import {H6, Link, Text} from '../../../elements/common';
import {
  ArrowForwardIos,
  ArrowRightAlt,
  Email,
  Home,
  LocalPhone,
} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import GoToTop from '../../../../modules/goToTop';
import {LINK_SIGNUP} from '../../../common/appLinks';
import {getSSOLoginUrl} from '../../../common/SSOConfig';

const PREFIX = 'Footer';

const classes = {
  foot: `${PREFIX}-foot`,
  container: `${PREFIX}-container`,
  footerImage: `${PREFIX}-footerImage`,
  softbdImage: `${PREFIX}-softbdImage`,
  primary: `${PREFIX}-primary`,
  bullet: `${PREFIX}-bullet`,
};

const StyledContainer = styled(Grid)(({theme}) => ({
  marginTop: '50px',
  background: theme.palette.grey.A100,
  padding: '20px',

  [`& .${classes.primary}`]: {
    color: theme.palette.primary.main,
  },

  [`& .${classes.bullet}`]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
}));

const StyledFoot = styled(Grid)(({theme}) => ({
  marginTop: '50px',

  [`& .${classes.footerImage}`]: {
    width: '280px',
  },

  [`& .${classes.softbdImage}`]: {
    width: '147px',
  },

  [`& .${classes.primary}`]: {
    color: theme.palette.primary.main,
  },

  [`& .${classes.bullet}`]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
}));

const Footer = () => {
  const {messages} = useIntl();

  const redirectToSSO = useCallback(() => {
    window.location.href = getSSOLoginUrl();
  }, []);

  return (
    <>
      <StyledContainer container>
        <Container maxWidth='lg'>
          <Grid container spacing={8}>
            <Grid item xs={12} md={6} lg={4} p={0}>
              <LogoCustomizable
                instituteName='Bangladesh Industrial Technical Assistance Centre'
                instituteLogo='/images/bitac-logo.jpg'
              />
              <Box mt={4}>
                <Text>
                  গনপ্রজাতন্ত্রী বাংলাদেশ সরকারের রূপকল্প ২০২১ বাস্তবায়নে
                  যুবকদের আত্মকর্মসংস্থান ও স্বাবলম্বী করে তোলার লক্ষে "অনলাইনে
                  বিভিন্ন প্রশিক্ষন কোর্সের পরিচালনা ও পর্যবেক্ষন করা"।{' '}
                </Text>
              </Box>
              <Box display='flex' justifyContent='left' mt={4}>
                <Link href={'/institute/sc/about-us'}>
                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    endIcon={<ArrowRightAlt />}>
                    {messages['footer.details']}
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4} p={0} sx={{marginTop: 3}}>
              <H6 className={classes.primary}>{messages['footer.contact']}</H6>
              <Box display='flex' mt={4}>
                <Home className={classes.primary} />
                <Text style={{marginLeft: '6px'}}>
                  বাংলাদেশ শিল্প কারিগরি সহায়তা কেন্দ্র (বিটাক) ১১৬ (খ), তেজগাঁও
                  শিল্প এলাকা ঢাকা - ১২০৮
                </Text>
              </Box>
              <Box display='flex' mt={4}>
                <Email className={classes.primary} />
                <Text style={{marginTop: '2px', marginLeft: '6px'}}>
                  ict@btac.gov.bd
                </Text>
              </Box>
              <Box display='flex' mt={4}>
                <LocalPhone className={classes.primary} />
                <Text style={{marginLeft: '6px'}}>
                  ++৮৮-০২-৯৯৩৯৪৯৩, ++৮৮-০২-৮৩৮৪৮৪৮৪
                </Text>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={4} p={0} sx={{marginTop: 3}}>
              <H6 className={classes.primary}>
                {messages['footer.important_links']}
              </H6>
              <Box display='flex' mt={4} justifyContent='space-between'>
                <Box>
                  <Text className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '10px', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.online_courses']}
                  </Text>
                  <Link
                    href={'/institute/notice-board'}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '10px', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.news']}
                  </Link>
                  <Link
                    href={'/institute/recent-activities'}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '10px', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.events']}
                  </Link>
                  <Link
                    href={'/institute/sc/about-us'}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '10px', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.about_us']}
                  </Link>
                  <Link href={'/institute/contact'} className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '10px', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.contact']}
                  </Link>
                </Box>
                <Box>
                  <Link href={'/institute/faqs'} className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '10px', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.question_and_answer']}
                  </Link>
                  <Link onClick={redirectToSSO} className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '10px', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.login']}
                  </Link>
                  <Link href={LINK_SIGNUP} className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '10px', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.sign_up']}
                  </Link>
                  <Link
                    href={'/institute/sc/terms-and-conditions'}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '10px', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.terms_and_conditions']}
                  </Link>
                  <Link
                    href={'/institute/sc/privacy-policy'}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '10px', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.privacy_policy']}
                    নীতি
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </StyledContainer>
      <StyledFoot container>
        <Container maxWidth='lg'>
          <Grid item container spacing={7}>
            <Grid item md={4}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box component={'span'} fontWeight='fontWeightBold'>
                  {messages['footer.implementation']}
                </Box>
              </Typography>
              <a
                target='_blank'
                href='https://a2i.gov.bd/'
                rel='noopener noreferrer'>
                <Box component={'span'}>
                  <img
                    src={'/images/footer-img.png'}
                    alt='crema-logo'
                    className={classes.footerImage}
                  />
                </Box>
              </a>
            </Grid>
            <Grid item md={6} />
            <Grid item md={2}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box component={'span'} fontWeight='fontWeightBold'>
                  {messages['footer.technical_assistance']}
                </Box>
              </Typography>
              <a
                target='_blank'
                href='https://softbdltd.com/'
                rel='noopener noreferrer'>
                <Box component={'span'}>
                  <img
                    src={'/images/softbd.png'}
                    alt='crema-logo'
                    className={classes.softbdImage}
                  />
                </Box>
              </a>
            </Grid>
          </Grid>
        </Container>
      </StyledFoot>
      <GoToTop />
    </>
  );
};

export default Footer;
