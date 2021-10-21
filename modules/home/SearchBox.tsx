import React, {useState} from 'react';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
} from '@mui/material';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import {Slide} from 'react-awesome-reveal';
import clsx from 'clsx';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBox: {
      padding: '12px',
      background: '#fff',
      position: 'absolute',
      zIndex: 1,
      border: 'none',
      maxWidth: theme.breakpoints.values.md,
      [theme.breakpoints.down('xl')]: {
        width: 'calc(100% - 32px)',
        // marginLeft: '-16px',
      },
      [theme.breakpoints.up('sm')]: {
        width: 'calc(100% - 48px)',
        marginLeft: '0px',
        // paddingBottom: '0px',
      },
      [theme.breakpoints.up('md')]: {
        width: theme.breakpoints.values.md - 48,
        height: '85px',
        padding: '12px 15px 5px 15px',
      },
    },
    noBorder: {
      border: 'none',
    },
    location: {
      marginTop: '15px',
      width: '70px',
    },
    locationIcon: {},
    searchButton: {
      background: '#682988',
      color: '#fff',
      borderRadius: '0px',
      height: '63px',
      width: '162px',
    },
    gridPaddingTop: {
      paddingTop: '3px !important',
    },
    gridButtonWrap: {
      padding: '0px !important',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    select: {
      '&>div, &>div:focus': {
        backgroundColor: 'transparent',
      },
      '&::before': {
        display: 'none',
      },
      '&::after': {
        display: 'none',
      },
    },
    topSelect: {
      border: '1px solid #5e6b0f',
      background: ' #5e6b0f',
      textAlign: 'center',
      color: '#fff',
      padding: '0 7px 2px 12px',
      height: 40,
      width: 150,
      '&>div, &>div:focus': {
        backgroundColor: 'transparent',
      },
      '&::before': {
        display: 'none',
      },
      '&::after': {
        display: 'none',
      },
    },
  }),
);

// function CustomSvgIcon(props: any) {
//   return <LocationOnIcon {...props} />;
// }

const SearchBox = () => {
  const classes = useStyles();
  const [locationValue, setLocationValue] = useState(1);
  const [typeValue, setTypeValue] = useState(1);

  return (
    <>
      <Slide direction='up'>
        <Grid item container mt={2}>
          <Grid item xs={6} md={4} lg={2} xl={2}>
            <Box>
              <Select
                className={clsx(classes.select, classes.topSelect)}
                variant='filled'
                value={typeValue}
                label=''
                onChange={(e: any) => {
                  setTypeValue(e?.target?.value);
                }}>
                <MenuItem value='1'>দক্ষতা</MenuItem>
                <MenuItem value='2'>চাকরি</MenuItem>
                <MenuItem value='3'>ব্যবসা</MenuItem>
                <MenuItem value='4'>শিক্ষা</MenuItem>
              </Select>
            </Box>
          </Grid>
        </Grid>
      </Slide>
      <Grid container xl={12} spacing={0} className={classes.searchBox}>
        <Grid item xs={12} md={7} className={classes.gridPaddingTop}>
          <TextField
            variant='outlined'
            name='searchBox'
            autoFocus
            placeholder='অনুসন্ধান করুন'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              classes: {notchedOutline: classes.noBorder},
            }}
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={5}
          spacing={0}
          justifyContent={'space-around'}>
          {/*<Grid xs={1} md={1} className={classes.locationIcon}>*/}
          {/*  <LocationOnIcon/>*/}
          {/*</Grid>*/}
          <Grid item xs={6} md={6} className={classes.location}>
            <Select
              className={classes.select}
              variant='standard'
              value={locationValue}
              label=''
              onChange={(e: any) => {
                setLocationValue(e?.target?.value);
              }}>
              <MenuItem value='1'>লোকেশন</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} md={6} className={classes.gridButtonWrap}>
            <Button variant='contained' className={classes.searchButton}>
              অনুসন্ধান
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default SearchBox;
