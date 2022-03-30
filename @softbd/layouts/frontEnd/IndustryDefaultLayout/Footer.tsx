import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Container, Grid, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import {
  LINK_FRONTEND_INDUSTRY_CONTACT,
  LINK_FRONTEND_INDUSTRY_FAQS,
  LINK_FRONTEND_JOBS,
  LINK_INDUSTRY_FRONTEND_STATIC_CONTENT,
} from '../../../common/appLinks';
import {
  CONTENT_ID_ABOUT_US,
  CONTENT_ID_GUIDELINES,
  CONTENT_ID_PRIVACY_POLICY,
  CONTENT_ID_TERMS_AND_CONDITIONS,
} from '../../../utilities/StaticContentConfigs';
import GoToTop from '../../../../modules/goToTop';
import {Link} from '../../../elements/common';
import {ArrowForwardIos} from '@mui/icons-material';

const PREFIX = 'Footer';

const classes = {
  footerImage: `${PREFIX}-footerImage`,
  softbdImage: `${PREFIX}-softbdImage`,
  primary: `${PREFIX}-primary`,
  bullet: `${PREFIX}-bullet`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  paddingTop: '60px',
  paddingBottom: '30px',
  marginTop: '50px',
  background: '#F7F7F7',

  [`& .${classes.footerImage}`]: {
    width: '280px',
  },

  [`& .${classes.softbdImage}`]: {
    //width: '147px',
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
    color: theme.palette.grey[700],
  },
}));

const Footer = () => {
  const {messages} = useIntl();

  return (
    <StyledGrid container>
      <Container maxWidth='lg'>
        <Grid
          item
          container
          spacing={10}
          sx={{display: 'flex', justifyContent: 'space-around'}}>
          <Grid item xs={6} md={4}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                {messages['footer.important_links']}
              </Box>
            </Typography>
            <Box display='flex' mt={2} justifyContent='space-between'>
              <Box>
                <Link
                  href={
                    LINK_INDUSTRY_FRONTEND_STATIC_CONTENT + CONTENT_ID_ABOUT_US
                  }
                  className={classes.bullet}>
                  <ArrowForwardIos
                    sx={{fontSize: '0.625rem', marginRight: '2px'}}
                    className={classes.primary}
                  />{' '}
                  {messages['footer.about_us']}
                </Link>
                <Link
                  href={
                    LINK_INDUSTRY_FRONTEND_STATIC_CONTENT +
                    CONTENT_ID_TERMS_AND_CONDITIONS
                  }
                  className={classes.bullet}>
                  <ArrowForwardIos
                    sx={{fontSize: '0.625rem', marginRight: '2px'}}
                    className={classes.primary}
                  />{' '}
                  {messages['footer.terms_and_condition']}
                </Link>
                <Link
                  href={
                    LINK_INDUSTRY_FRONTEND_STATIC_CONTENT +
                    CONTENT_ID_PRIVACY_POLICY
                  }
                  className={classes.bullet}>
                  <ArrowForwardIos
                    sx={{fontSize: '0.625rem', marginRight: '2px'}}
                    className={classes.primary}
                  />{' '}
                  {messages['footer.privacy_policy']}
                </Link>
                <Link
                  href={LINK_FRONTEND_INDUSTRY_CONTACT}
                  className={classes.bullet}>
                  <ArrowForwardIos
                    sx={{fontSize: '0.625rem', marginRight: '2px'}}
                    className={classes.primary}
                  />{' '}
                  {messages['footer.contact']}
                </Link>
              </Box>
              <Box>
                <Link
                  target={'_blank'}
                  href={LINK_FRONTEND_JOBS}
                  className={classes.bullet}>
                  <ArrowForwardIos
                    sx={{fontSize: '0.625rem', marginRight: '2px'}}
                    className={classes.primary}
                  />{' '}
                  {messages['job_post.label']}
                </Link>
                <Link
                  href={LINK_FRONTEND_INDUSTRY_FAQS}
                  className={classes.bullet}>
                  <ArrowForwardIos
                    sx={{fontSize: '0.625rem', marginRight: '2px'}}
                    className={classes.primary}
                  />{' '}
                  {messages['footer.faq']}
                </Link>
                <Link
                  href={
                    LINK_INDUSTRY_FRONTEND_STATIC_CONTENT +
                    CONTENT_ID_GUIDELINES
                  }
                  className={classes.bullet}>
                  <ArrowForwardIos
                    sx={{fontSize: '0.625rem', marginRight: '2px'}}
                    className={classes.primary}
                  />{' '}
                  {messages['footer.guideline']}
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Grid container columnSpacing={12}>
              <Grid item md={6}>
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
              </Grid>
              <Grid item md={6}>
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
              </Grid>
            </Grid>
          </Grid>
          <GoToTop />
        </Grid>
      </Container>
    </StyledGrid>
  );
};

export default Footer;
