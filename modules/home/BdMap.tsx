import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, CardMedia, Container, Grid} from '@mui/material';
import SectionTitle from './SectionTitle';
import {useIntl} from 'react-intl';

const PREFIX = 'BdMap';

const classes = {
  mapButtonGroup: `${PREFIX}-mapButtonGroup`,
  skillButton: `${PREFIX}-skillButton`,
  map: `${PREFIX}-map`,
  mapSidePoints: `${PREFIX}-mapSidePoints`,
  mapIndicator: `${PREFIX}-mapIndicator`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  marginTop: '50px',

  [`& .${classes.mapButtonGroup}`]: {
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: theme.shadows[3],
    marginBottom: '29px',
    width: '100%',
    maxWidth: '610px',
  },

  [`& .${classes.skillButton}`]: {
    /*background: '#682988',
    color: '#fff',
    justifyContent: 'center',
    marginRight: '2px',
    minWidth: '98px',*/
  },

  [`& .${classes.map}`]: {
    position: 'relative',
    border: '1px solid #eee',
    borderRadius: '2px',
    backgroundColor: theme.palette.grey[50],
  },

  [`& .${classes.mapSidePoints}`]: {
    borderRadius: '50%',
    height: '5px',
    width: '5px',
    marginTop: '5px',
    marginLeft: '5px',
  },
  [`& .${classes.mapIndicator}`]: {
    position: 'absolute',
    backgroundColor: theme.palette.common.white,
    right: '3px',
    bottom: '3px',
    width: '130px',
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: theme.shadows[3],
    padding: '5px',
  },
}));

const BdMap = () => {
  const {messages} = useIntl();

  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg' disableGutters>
        <SectionTitle title={messages['common.map'] as string} center={true} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {/** navigation bar */}
          <Grid
            container
            spacing={1}
            justifyContent={'center'}
            alignItems={'center'}
            className={classes.mapButtonGroup}>
            <Grid item xs={3} md={3} mb={1}>
              <Button
                variant='contained'
                color={'primary'}
                className={classes.skillButton}
                fullWidth>
                {messages['common.skills']}
              </Button>
            </Grid>
            <Grid item xs={3} md={3} mb={1}>
              <Button variant='text' fullWidth>
                {messages['menu.jobs']}
              </Button>
            </Grid>
            <Grid item xs={3} md={3} mb={1}>
              <Button variant='text' fullWidth>
                {messages['common.business']}
              </Button>
            </Grid>
            <Grid item xs={3} md={3} mb={1} pr={1}>
              <Button variant='text' fullWidth>
                {messages['common.educations']}
              </Button>
            </Grid>
          </Grid>

          {/** map section */}
          <Container maxWidth={'sm'} className={classes.map}>
            <Grid
              item
              container
              xs={12}
              justifyContent={'center'}
              alignItems={'center'}>
              <Grid item xs={8}>
                <CardMedia
                  component={'img'}
                  image={'images/map.png'}
                  title={
                    messages['common.map_of_bangladesh'] as string | undefined
                  }
                  alt={
                    messages['common.map_of_bangladesh'] as string | undefined
                  }
                />
              </Grid>
            </Grid>

            <Box className={classes.mapIndicator}>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Grid item container spacing={2}>
                    <Grid item xs={4}>
                      <Box
                        className={classes.mapSidePoints}
                        sx={{
                          bgcolor: '#682988',
                          border: '1px solid #682988',
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} sx={{fontSize: '1.25rem'}}>
                      {messages['common.skills']}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box
                        className={classes.mapSidePoints}
                        sx={{
                          bgcolor: '#2AC92A',
                          border: '1px solid #2AC92A',
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} sx={{fontSize: '1.25rem'}}>
                      {messages['menu.jobs']}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Grid item container spacing={2}>
                    <Grid item xs={4}>
                      <Box
                        className={classes.mapSidePoints}
                        sx={{
                          bgcolor: '#2A52C9',
                          border: '1px solid #2A52C9',
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} sx={{fontSize: '1.25rem'}}>
                      {messages['common.business']}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Grid item container spacing={2}>
                    <Grid item xs={4}>
                      <Box
                        className={classes.mapSidePoints}
                        sx={{
                          bgcolor: '#2A52C9',
                          border: '1px solid #2A52C9',
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} sx={{fontSize: '1.25rem'}}>
                      {messages['common.education']}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Container>
    </StyledGrid>
  );
};
export default BdMap;
