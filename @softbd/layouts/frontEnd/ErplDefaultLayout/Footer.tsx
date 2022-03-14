import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Container, Grid, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import GoToTop from '../../../../modules/goToTop';

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
          <Grid item md={12}>
            <Grid container columnSpacing={12}>
              <Grid item md={8}>
                <Typography variant='subtitle2' gutterBottom={true}>
                  <Box component={'span'} fontWeight='fontWeightBold'>
                    {messages['footer.rpl_in_implementation']}
                  </Box>
                </Typography>
                <a
                  target='_blank'
                  href='https://a2i.gov.bd/'
                  rel='noopener noreferrer'>
                  <Box component={'span'}>
                    <img
                      src={'/tecnical.png'}
                      alt='crema-logo'
                      className={classes.softbdImage}
                    />
                    <img
                      src={'/images/footer-img.png'}
                      alt='crema-logo'
                      className={classes.footerImage}
                    />
                  </Box>
                </a>
              </Grid>
              <Grid item md={4}>
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
