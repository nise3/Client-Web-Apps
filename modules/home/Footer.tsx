import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Container, Grid, Typography} from '@mui/material';
import {Link} from '../../@softbd/elements/common';
import GoToTop from '../goToTop';
import {useIntl} from 'react-intl';
import {
  CONTENT_ID_ABOUT_US,
  CONTENT_ID_CAREER_ADVICE,
  CONTENT_ID_GUIDELINES,
  CONTENT_ID_PRIVACY_POLICY,
  CONTENT_ID_TERMS_AND_CONDITIONS,
} from '../../@softbd/utilities/StaticContentConfigs';
import {
  LINK_FRONTEND_FAQ,
  LINK_NICE3_FRONTEND_STATIC_CONTENT,
} from '../../@softbd/common/appLinks';

const PREFIX = 'Footer';

const classes = {
  footerImage: `${PREFIX}-footerImage`,
  softbdImage: `${PREFIX}-softbdImage`,
  logoSection: `${PREFIX}-logoSection`,
  softBdLogo: `${PREFIX}-softBdLogo`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  paddingTop: '60px',
  paddingBottom: '30px',
  background: '#F7F7F7',
  marginTop: '50px',

  [`& .${classes.footerImage}`]: {
    width: '280px',
  },

  [`& .${classes.softbdImage}`]: {
    //width: '147px',
  },
  [`& .${classes.logoSection}`]: {
    [theme.breakpoints.only('sm')]: {
      display: 'flex',
    },
    [`& .${classes.softBdLogo}`]: {
      marginTop: '40px',
      [theme.breakpoints.only('sm')]: {
        marginTop: '0px',
        marginLeft: '20px',
      },
    },
  },
}));

const Footer = () => {
  const {messages} = useIntl();

  return (
    <StyledGrid container>
      <Grid item xs={12}>
        <Container maxWidth='lg'>
          <Grid container spacing={12}>
            <Grid item xs={12} sm={4} md={8}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={4} md={4}>
                  <Typography variant='subtitle2' gutterBottom={true}>
                    <Box component={'span'} fontWeight='fontWeightBold'>
                      {messages['footer.about_nise']}
                    </Box>
                  </Typography>
                  <Typography gutterBottom={true}>
                    <Link
                      href={
                        LINK_NICE3_FRONTEND_STATIC_CONTENT + CONTENT_ID_ABOUT_US
                      }
                      component={'span'}
                      mt={2}>
                      {messages['footer.about_us']}
                    </Link>
                  </Typography>
                  <Typography gutterBottom={true}>
                    <Link
                      href={
                        LINK_NICE3_FRONTEND_STATIC_CONTENT +
                        CONTENT_ID_TERMS_AND_CONDITIONS
                      }
                      component={'span'}
                      mt={2}>
                      {messages['footer.terms_and_condition']}
                    </Link>
                  </Typography>
                  <Typography gutterBottom={true}>
                    <Link
                      href={
                        LINK_NICE3_FRONTEND_STATIC_CONTENT +
                        CONTENT_ID_PRIVACY_POLICY
                      }
                      component={'span'}
                      mt={2}>
                      {messages['footer.privacy_policy']}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                  <Typography variant='subtitle2' gutterBottom={true}>
                    <Box component={'span'} fontWeight='fontWeightBold'>
                      {messages['footer.for_job_seeker']}
                    </Box>
                  </Typography>
                  <Typography gutterBottom={true}>
                    <Link
                      href={
                        LINK_NICE3_FRONTEND_STATIC_CONTENT +
                        CONTENT_ID_CAREER_ADVICE
                      }
                      component={'span'}
                      mt={2}>
                      {messages['footer.career_advice']}
                    </Link>
                  </Typography>
                  <Typography gutterBottom={true}>
                    <Link href={LINK_FRONTEND_FAQ} component={'span'} mt={2}>
                      {messages['footer.faq']}
                    </Link>
                  </Typography>
                  <Typography gutterBottom={true}>
                    <Link
                      href={
                        LINK_NICE3_FRONTEND_STATIC_CONTENT +
                        CONTENT_ID_GUIDELINES
                      }
                      component={'span'}
                      mt={2}>
                      {messages['footer.guideline']}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                  <Typography variant='subtitle2' gutterBottom={true}>
                    <Box component={'span'} fontWeight='fontWeightBold'>
                      {messages['common.contact']}
                    </Box>
                  </Typography>
                  <Typography gutterBottom={true}>
                    <Box component={'span'} mt={2}>
                      {messages['common.email']}: nise@a2i.gov.bd
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={8} md={4} className={classes.logoSection}>
              <Box>
                <Typography variant='subtitle2' gutterBottom={true}>
                  <Box component={'span'} fontWeight='fontWeightBold'>
                    {messages['footer.in_implementation']}
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
              </Box>

              <Box className={classes.softBdLogo}>
                <Typography variant='subtitle2' gutterBottom={true}>
                  <Box component={'span'} fontWeight='fontWeightBold'>
                    {messages['common.technical_support']}
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
              </Box>
            </Grid>
            <GoToTop />
          </Grid>
        </Container>
      </Grid>
    </StyledGrid>
  );
};

export default Footer;
