import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Container, Grid, Typography} from '@mui/material';
import {Link} from '../../@softbd/elements/common';
import GoToTop from '../goToTop';

const PREFIX = 'Footer';

const classes = {
  footerImage: `${PREFIX}-footerImage`,
  softbdImage: `${PREFIX}-softbdImage`,
};

const StyledGrid = styled(Grid)(({theme: Theme}) => ({
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
  return (
    <StyledGrid container>
      <Container maxWidth='lg'>
        <Grid item container>
          <Grid item md={2}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                আমাদের সম্পর্কে
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Link href={'/sc/about-us'} component={'span'} mt={2}>
                আমাদের সম্পর্কে
              </Link>
            </Typography>
            <Typography gutterBottom={true}>
              <Link href={'/sc/terms-and-conditions'} component={'span'} mt={2}>
                শর্তাবলী এবং নীতিমালা
              </Link>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                সহযোগী
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Link href={'/sc/privacy-policy'} component={'span'} mt={2}>
                প্রাইভেসি পলিসি
              </Link>
            </Typography>
            {/*<Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  যোগাযোগ
                </Box>
              </Typography>*/}
            <Typography gutterBottom={true}>
              <Link href={'https://www.bdjobs.com/'} component={'span'} mt={2}>
                বিডি জবস
              </Link>
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                চাকরি প্রার্থীদের জন্য
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                জীবনবৃত্তান্ত এডিট
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                ক্যারিয়ার পরামর্শ
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                মাই জবস
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                প্রশ্নাবলী
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                গাইডলাইন
              </Box>
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                চাকরিদাতা
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                আমাদের সম্পর্কে
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box component={'span'} mt={2}>
                শর্তাবলী এবং নীতিমালা
              </Box>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                বাস্তবায়নে
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
                কারিগরি সহায়তায়
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
