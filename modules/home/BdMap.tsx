import React from 'react';
import {Box, Button, CardMedia, Container, Grid} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import SectionTitle from './SectionTitle';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: '50px',
    },
    mapButtonGroup: {
      border: '1px solid #eee',
      borderRadius: '5px',
    },
    skillButton: {
      background: '#682988',
      color: '#fff',
      justifyContent: 'center',
      marginRight: '2px',
    },
    map: {
      position: 'relative',
      border: '1px solid #eee',
      borderRadius: '2px',
      backgroundColor: '#fff',
    },

    mapSidePoints: {
      borderRadius: '50%',
      height: '5px',
      width: '5px',
      marginTop: '5px',
      marginLeft: '5px',
    },
  }),
);

const BdMap = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='lg' disableGutters>
        <SectionTitle title='ম্যাপ' center={true} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Grid
            container
            spacing={2}
            xs={12}
            sm={6}
            md={5}
            mt={'10px'}
            justifyContent={'center'}
            alignItems={'center'}
            className={classes.mapButtonGroup}>
            <Grid item xs={3} md={2} mb={2}>
              <Button variant='contained' className={classes.skillButton}>
                দক্ষতা
              </Button>
            </Grid>
            <Grid item xs={3} md={2} mb={2}>
              <Button variant='text'>চাকরি</Button>
            </Grid>
            <Grid item xs={3} md={2} mb={2}>
              <Button variant='text'>ব্যবসা</Button>
            </Grid>
            <Grid item xs={3} md={2} mb={2}>
              <Button variant='text'>শিক্ষা</Button>
            </Grid>
          </Grid>
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
                  title={messages['common.map_of_bangladesh'] as string}
                  alt={messages['common.map_of_bangladesh']}
                />
              </Grid>
            </Grid>

            {/*right side chit show*/}
            <Box
              sx={{
                position: 'absolute',
                bgcolor: '#eee',
                right: '0',
                bottom: '0',
                width: '100px',
                border: '1px solid #eee',
                borderRadius: '5px',
              }}>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Grid item container>
                    <Grid item xs={4}>
                      <Box
                        className={classes.mapSidePoints}
                        sx={{
                          bgcolor: '#682988',
                          border: '1px solid #682988',
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      দক্ষতা
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Box
                        className={classes.mapSidePoints}
                        sx={{
                          bgcolor: '#2AC92A',
                          border: '1px solid #2AC92A',
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      চাকরি
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Grid item container>
                    <Grid item xs={4}>
                      <Box
                        className={classes.mapSidePoints}
                        sx={{
                          bgcolor: '#2A52C9',
                          border: '1px solid #2A52C9',
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      ব্যবসা
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Grid item container>
                    <Grid item xs={4}>
                      <Box
                        className={classes.mapSidePoints}
                        sx={{
                          bgcolor: '#2A52C9',
                          border: '1px solid #2A52C9',
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      শিক্ষা
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Container>
    </Grid>
  );
};
export default BdMap;
