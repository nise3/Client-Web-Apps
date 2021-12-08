import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Container, Grid, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import {
  LINK_FRONTEND_FAQ,
  LINK_NICE3_FRONTEND_STATIC_CONTENT,
} from '../../../common/appLinks';
import {
  CONTENT_ID_ABOUT_US,
  CONTENT_ID_CAREER_ADVICE,
  CONTENT_ID_GUIDELINES,
  CONTENT_ID_PRIVACY_POLICY,
  CONTENT_ID_TERMS_AND_CONDITIONS,
} from '../../../utilities/StaticContentConfigs';
import GoToTop from '../../../../modules/goToTop';
import {Link} from '../../../elements/common';

const PREFIX = 'Footer';

const classes = {
  footerImage: `${PREFIX}-footerImage`,
  softbdImage: `${PREFIX}-softbdImage`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  paddingTop: '60px',
  paddingBottom: '30px',
  background: '#F7F7F7',

  [`& .${classes.footerImage}`]: {
    width: '280px',
  },

  [`& .${classes.softbdImage}`]: {
    width: '147px',
  },
}));

const Footer = () => {
  const {messages} = useIntl();

  return (
    <StyledGrid container>
      <Container maxWidth='lg'>
        <Grid item container>
          <Grid item md={2}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                {messages['footer.about_us']}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Link
                href={LINK_NICE3_FRONTEND_STATIC_CONTENT + CONTENT_ID_ABOUT_US}
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
              <Box component={'span'} mt={2}>
                {messages['footer.partner']}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Link
                href={
                  LINK_NICE3_FRONTEND_STATIC_CONTENT + CONTENT_ID_PRIVACY_POLICY
                }
                component={'span'}
                mt={2}>
                {messages['footer.privacy_policy']}
              </Link>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                {messages['common.contact']}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Link href={'https://www.bdjobs.com/'} component={'span'} mt={2}>
                {messages['footer.bd_jobs']}
              </Link>
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                {messages['footer.for_job_seeker']}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                {messages['footer.bio_edit']}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Link
                href={
                  LINK_NICE3_FRONTEND_STATIC_CONTENT + CONTENT_ID_CAREER_ADVICE
                }
                component={'span'}
                mt={2}>
                {messages['footer.career_advice']}
              </Link>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                {messages['footer.my_jobs']}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Link href={LINK_FRONTEND_FAQ} component={'span'} mt={2}>
                {messages['footer.faq']}
              </Link>
            </Typography>
            <Typography gutterBottom={true}>
              <Link
                href={
                  LINK_NICE3_FRONTEND_STATIC_CONTENT + CONTENT_ID_GUIDELINES
                }
                component={'span'}
                mt={2}>
                {messages['footer.guideline']}
              </Link>
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                {messages['footer.job_provider']}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Link
                href={LINK_NICE3_FRONTEND_STATIC_CONTENT + CONTENT_ID_ABOUT_US}
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
          </Grid>
          <Grid item md={3}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                {messages['common.contact']}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                {messages['common.email']}: contactus@nise.gov.bd,
              </Box>
            </Typography>
            <Typography gutterBottom={true} sx={{textAlign: 'center'}}>
              <Box component={'span'}>nise@a2i.gov.bd</Box>
            </Typography>
          </Grid>
          <Grid item md={3}>
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

            <Typography variant='subtitle2' gutterBottom={true} mt={5}>
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
          <GoToTop />
        </Grid>
      </Container>
    </StyledGrid>
  );
};

export default Footer;
