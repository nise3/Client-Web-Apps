import React from 'react';
import {
  Button,
  Card,
  Grid,
  InputAdornment,
  makeStyles,
  NativeSelect,
} from '@material-ui/core';
import Tile from './component/Tile';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {LocationOnOutlined} from '@material-ui/icons';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme): any => ({
  searchBox: {
    padding: '10px 5px 5px',
    alignItems: 'center',
    marginTop: 15,
  },
  searchButton: {
    color: '#fff',
    padding: '8px 14px',
    width: '95%',
  },
  searchInputBorderHide: {
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      padding: '14px 0px',
    },
  },
  location: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const OverviewSection = () => {
  const classes: any = useStyles();

  const overviewItems = [
    {
      amount: 5,
      text: 'Course Enrolled',
      color: '#c865e7',
    },
    {
      amount: 50,
      text: 'Skill Matching Courses',
      color: '#5477f0',
    },
    {
      amount: 550,
      text: 'Total Courses',
      color: '#20d5c9',
    },
    {
      amount: 320,
      text: 'Jobs Apply',
      color: '#32be7e',
    },
    {
      amount: 2500,
      text: 'Total Jobs',
      color: '#e52d84',
    },
    {
      amount: 100,
      text: 'Skill Matching Jobs',
      color: '#fd9157',
    },
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Grid container spacing={3}>
            {overviewItems.map((overview: any, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Tile
                    amount={overview.amount}
                    label={overview.text}
                    backgroundColor={overview.color}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.searchBox}>
            <Grid container>
              <Grid item xs={12} sm={12} md={7}>
                <TextField
                  variant='outlined'
                  name='searchBox'
                  placeholder='Search'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    className: classes.searchInputBorderHide,
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={3} className={classes.location}>
                <LocationOnOutlined color={'primary'} />
                <NativeSelect
                  disableUnderline
                  className='selectColor'
                  style={{width: 'calc(100% - 40px)'}}
                  color={'primary'}>
                  <option>লোকেশন</option>
                </NativeSelect>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Button
                  variant='contained'
                  color={'primary'}
                  className={classes.searchButton}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default OverviewSection;
