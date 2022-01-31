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
import {
  LINK_FRONTEND_INSTITUTE_CONTACT,
  LINK_FRONTEND_INSTITUTE_FAQ,
  LINK_FRONTEND_INSTITUTE_NOTICE_BOARD,
  LINK_FRONTEND_INSTITUTE_RECENT_ACTIVITIES,
  LINK_INSTITUTE_FRONTEND_STATIC_CONTENT,
  LINK_SIGNUP,
} from '../../../common/appLinks';
import {getSSOLoginUrl} from '../../../common/SSOConfig';
import {
  CONTENT_ID_ABOUT_US,
  CONTENT_ID_PRIVACY_POLICY,
  CONTENT_ID_TERMS_AND_CONDITIONS,
} from '../../../utilities/StaticContentConfigs';
import {gotoLoginSignUpPage} from '../../../common/constants';
import {useFetchPublicInstituteDetails} from '../../../../services/instituteManagement/hooks';

const PREFIX = 'Footer';

const classes = {
  foot: `${PREFIX}-foot`,
  container: `${PREFIX}-container`,
  footerImage: `${PREFIX}-footerImage`,
  softbdImage: `${PREFIX}-softbdImage`,
  primary: `${PREFIX}-primary`,
  bullet: `${PREFIX}-bullet`,
  textColor: `${PREFIX}-textColor`,
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
    color: theme.palette.grey[700],
  },

  [`& .${classes.textColor}`]: {
    color: theme.palette.grey[700],
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
  const {data: institute} = useFetchPublicInstituteDetails();

  const redirectToSSO = useCallback(() => {
    window.location.href = getSSOLoginUrl();
  }, []);

  const getAddress = () => {
    let address = '';
    let addrs = [];
    if (institute) {
      if (institute.address) {
        addrs.push(institute.address);
      }
      if (institute.upazila_title) {
        addrs.push(institute.upazila_title);
      }
      if (institute.district_title) {
        addrs.push(institute.district_title);
      }
      if (institute.division_title) {
        addrs.push(institute.division_title);
      }

      address = addrs.join(', ');
    }
    return address;
  };

  return (
    <>
      <StyledContainer container>
        <Container maxWidth='lg'>
          <Grid container spacing={8}>
            <Grid item xs={12} md={4} lg={4} p={0}>
              <LogoCustomizable
                instituteName={'যুব উন্নয়ন অধিদপ্তর'}
                instituteLogo='/images/DYD-and-gov-Logo.png'
              />
              <Box mt={4}>
                <Text className={classes.textColor}>
                  গনপ্রজাতন্ত্রী বাংলাদেশ সরকারের রূপকল্প ২০২১ বাস্তবায়নে
                  যুবকদের আত্মকর্মসংস্থান ও স্বাবলম্বী করে তোলার লক্ষে "অনলাইনে
                  বিভিন্ন প্রশিক্ষন কোর্সের পরিচালনা ও পর্যবেক্ষন করা"।
                </Text>
              </Box>
              <Box display='flex' justifyContent='left' mt={4}>
                <Link
                  href={
                    LINK_INSTITUTE_FRONTEND_STATIC_CONTENT + CONTENT_ID_ABOUT_US
                  }>
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
            <Grid item xs={12} md={4} lg={4} p={0} sx={{marginTop: 3}}>
              <H6 className={classes.primary}>{messages['footer.contact']}</H6>
              <Box display='flex' mt={4}>
                <Home className={classes.primary} />
                <Text style={{marginLeft: '6px'}} className={classes.textColor}>
                  {getAddress()}
                </Text>
              </Box>
              <Box display='flex' mt={4}>
                <Email className={classes.primary} />
                <Text
                  style={{marginTop: '2px', marginLeft: '6px'}}
                  className={classes.textColor}>
                  {institute?.email}
                </Text>
              </Box>
              <Box display='flex' mt={4}>
                <LocalPhone className={classes.primary} />
                <Text style={{marginLeft: '6px'}} className={classes.textColor}>
                  +৮৮-০২-৯৫৫৯৩৮৯
                </Text>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4} p={0} sx={{marginTop: 3}}>
              <H6 className={classes.primary}>
                {messages['footer.important_links']}
              </H6>
              <Box display='flex' mt={4} justifyContent='space-between'>
                <Box>
                  <Text className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.online_courses']}
                  </Text>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_NOTICE_BOARD}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.news']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_RECENT_ACTIVITIES}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.events']}
                  </Link>
                  <Link
                    href={
                      LINK_INSTITUTE_FRONTEND_STATIC_CONTENT +
                      CONTENT_ID_ABOUT_US
                    }
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.about_us']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_CONTACT}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.contact']}
                  </Link>
                  <Link
                    target={'_blank'}
                    href={
                      'https://file.nise3.xyz/uploads/tx9keh3ZscWs1v1M1CJOH0Aj1exPoa1638871975.pdf'
                    }
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.user_manual']}
                  </Link>
                </Box>
                <Box>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_FAQ}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.question_and_answer']}
                  </Link>
                  <Link onClick={redirectToSSO} className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.login']}
                  </Link>
                  <Link
                    href={gotoLoginSignUpPage(LINK_SIGNUP)}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.sign_up']}
                  </Link>
                  <Link
                    href={
                      LINK_INSTITUTE_FRONTEND_STATIC_CONTENT +
                      CONTENT_ID_TERMS_AND_CONDITIONS
                    }
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.terms_and_conditions']}
                  </Link>
                  <Link
                    href={
                      LINK_INSTITUTE_FRONTEND_STATIC_CONTENT +
                      CONTENT_ID_PRIVACY_POLICY
                    }
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />
                    {messages['footer.privacy_policy']}
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
                    src={'/images/footer-img-white.png'}
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
