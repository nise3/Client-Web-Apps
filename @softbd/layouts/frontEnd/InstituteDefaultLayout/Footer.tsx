import React, {useCallback} from 'react';
import {Box, Button, Container, Grid, Typography} from '@mui/material';
import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import LogoCustomizable from '../../../elements/common/LogoCustomizable';
import {H6, Text, Link} from '../../../elements/common';
import {
  ArrowForwardIos,
  ArrowRightAlt,
  Email,
  Home,
  LocalPhone,
} from '@mui/icons-material';
import clsx from 'clsx';
import {useIntl} from 'react-intl';
import GoToTop from '../../../../modules/goToTop';
import {LINK_SIGNUP} from '../../../common/appLinks';
import {getSSOLoginUrl} from '../../../common/SSOConfig';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
      background: theme.palette.grey.A100,
    },
    foot: {
      marginTop: '50px',
    },
    container: {
      padding: '20px',
    },
    footerImage: {
      width: '280px',
    },
    softbdImage: {
      width: '147px',
    },
    button: {
      borderRadius: 20,
    },
    primary: {
      color: theme.palette.primary.main,
    },
    bullet: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 15,
    },
  }),
);

const Footer = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  const redirectToSSO = useCallback(() => {
    window.location.href = getSSOLoginUrl();
  }, []);

  return (
    <>
      <Grid container className={clsx(classes.root, classes.container)}>
        <Container maxWidth='lg'>
          <Grid container spacing={4}>
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
                <Link href={'/sc/about-us'}>
                  <Button
                    variant='outlined'
                    size='large'
                    endIcon={<ArrowRightAlt />}
                    className={classes.button}>
                    {messages['footer.details']}
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4} p={0} sx={{marginTop: 3}}>
              <H6 className={classes.primary}>{messages['footer.contact']}</H6>
              <Box display='flex' mt={4}>
                <Box flex='0 0 40px'>
                  <Home className={classes.primary} />
                </Box>
                <Box flex='1'>
                  <Text>
                    বাংলাদেশ শিল্প কারিগরি সহায়তা কেন্দ্র (বিটাক) ১১৬ (খ),
                    তেজগাঁও শিল্প এলাকা ঢাকা - ১২০৮
                  </Text>
                </Box>
              </Box>
              <Box display='flex' mt={4}>
                <Box flex='0 0 40px'>
                  <Email className={classes.primary} />
                </Box>
                <Box flex='1'>
                  <Text>ict@btac.gov.bd</Text>
                </Box>
              </Box>
              <Box display='flex' mt={4}>
                <Box flex='0 0 40px'>
                  <LocalPhone className={classes.primary} />
                </Box>
                <Box flex='1'>
                  <Text>++৮৮-০২-৯৯৩৯৪৯৩, ++৮৮-০২-৮৩৮৪৮৪৮৪</Text>
                </Box>
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
                      sx={{fontSize: '16px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.online_courses']}
                  </Text>
                  <Link
                    href={'/institute/notice-board'}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '16px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.news']}
                  </Link>
                  <Link
                    href={'/institute/recent-activities'}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '16px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.events']}
                  </Link>
                  <Link href={'/sc/about-us'} className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '16px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.about_us']}
                  </Link>
                  <Link href={'/institute/contact'} className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '16px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.contact']}
                  </Link>
                </Box>
                <Box>
                  <Link href={'/institute/faq'} className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '16px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.question_and_answer']}
                  </Link>
                  <Link
                    href={''}
                    onClick={redirectToSSO}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '16px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.login']}
                  </Link>
                  <Link href={LINK_SIGNUP} className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '16px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.sign_up']}
                  </Link>
                  <Link
                    href={'/sc/terms-and-conditions'}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '16px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.terms_and_conditions']}
                  </Link>
                  <Link href={'/sc/privacy-policy'} className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '16px'}}
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
      </Grid>

      <Grid container className={classes.foot}>
        <Container maxWidth='lg'>
          <Grid item container spacing={7}>
            <Grid item md={4}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box component={'span'} fontWeight='fontWeightBold'>
                  {messages['footer.implementation']}
                </Box>
              </Typography>
              <Box component={'span'}>
                <img
                  src={'/images/footer-img-white.png'}
                  alt='crema-logo'
                  className={classes.footerImage}
                />
              </Box>
            </Grid>
            <Grid item md={6} />
            <Grid item md={2}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box component={'span'} fontWeight='fontWeightBold'>
                  {messages['footer.technical_assistance']}
                </Box>
              </Typography>
              <Link href={'https://softbdltd.com/'}>
                <Box component={'span'}>
                  <img
                    src='/images/softbd.png'
                    alt='crema-logo'
                    className={classes.softbdImage}
                  />
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <GoToTop />
    </>
  );
};

export default Footer;
