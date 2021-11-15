import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Container, Grid, Typography} from '@mui/material';
import {Link} from '../../@softbd/elements/common';
import GoToTop from '../goToTop';
import {useIntl} from 'react-intl';

const PREFIX = 'Footer';

const classes = {
  footerImage: `${PREFIX}-footerImage`,
  softbdImage: `${PREFIX}-softbdImage`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  marginTop: '100px',
  background: '#F7F7F7',
  paddingTop: '100px',
  paddingBottom: '100px',

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
              <Link href={'/sc/about-us'} component={'span'} mt={2}>
                {messages['footer.about_us']}
              </Link>
            </Typography>
            <Typography gutterBottom={true}>
              <Link href={'/sc/terms-and-conditions'} component={'span'} mt={2}>
                {messages['footer.terms_and_condition']}
              </Link>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                {messages['footer.partner']}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Link href={'/sc/privacy-policy'} component={'span'} mt={2}>
                {messages['footer.privacy_policy']}
              </Link>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                যোগাযোগ
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
                জীবনবৃত্তান্ত এডিট
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Link href={'career-advice'} component={'span'} mt={2}>
                {messages['footer.career_advice']}
              </Link>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                {messages['footer.my_jobs']}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Link href={'/faq'} component={'span'} mt={2}>
                {messages['footer.faq']}
              </Link>
            </Typography>
            <Typography gutterBottom={true}>
              <Link href={'/sc/guideline'} component={'span'} mt={2}>
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
              <Link href={'/sc/about-us'} component={'span'} mt={2}>
                {messages['footer.about_us']}
              </Link>
            </Typography>
            <Typography gutterBottom={true}>
              <Link href={'/sc/terms-and-condition'} component={'span'} mt={2}>
                {messages['footer.terms_and_condition']}
              </Link>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                {messages['footer.in_implementation']}
              </Box>
            </Typography>
            <Link href={'https://a2i.gov.bd/'}>
              <Box component={'span'}>
                <img
                  src={'/images/footer-img.png'}
                  alt='crema-logo'
                  className={classes.footerImage}
                />
              </Box>
            </Link>
          </Grid>
          <Grid item md={2} textAlign={'right'}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                {messages['common.technical_support']}
              </Box>
            </Typography>
            <Link href={'https://softbdltd.com/'}>
              <Box component={'span'}>
                <img
                  src={'/images/softbd.png'}
                  alt='crema-logo'
                  className={classes.softbdImage}
                />
              </Box>
            </Link>
          </Grid>
          <GoToTop />
        </Grid>
      </Container>
    </StyledGrid>
  );
};

export default Footer;
