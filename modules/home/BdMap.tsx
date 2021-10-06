import React from 'react';
import {Box, Button, Container, Grid} from '@mui/material';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import SectionTitle from './SectionTitle';
import map from '../../public/images/map.jpg';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
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
      marginTop: '40px',
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

  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='md' disableGutters>
        <SectionTitle title='ম্যাপ' center={true}></SectionTitle>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Grid
            item
            container
            spacing={2}
            xs={12}
            sm={6}
            md={5}
            justifyContent={'center'}
            alignItems={'center'}
            className={classes.mapButtonGroup}>
            <Grid item xs={3} md={2}>
              <Button variant='contained' className={classes.skillButton}>
                দক্ষতা
              </Button>
            </Grid>
            <Grid item xs={3} md={2}>
              <Button variant='text'>চাকরি</Button>
            </Grid>
            <Grid item xs={3} md={2}>
              <Button variant='text'>ব্যবসা</Button>
            </Grid>
            <Grid item xs={3} md={2}>
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
                <Image src={map} alt={'Map of Bangladesh'} />
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
                        }}></Box>
                    </Grid>
                    <Grid item xs={8}>
                      দক্ষতা
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
                          bgcolor: '#2AC92A',
                          border: '1px solid #2AC92A',
                        }}></Box>
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
                        }}></Box>
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
                        }}></Box>
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
