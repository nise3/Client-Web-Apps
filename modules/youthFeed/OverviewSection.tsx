import React from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  NativeSelect,
  Theme,
} from '@material-ui/core';
import Tile from './component/Tile';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {LocationOnOutlined} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme): any => ({
  searchBox: {
    padding: 10,
    borderRadius: 4,
    background: '#fff',
    alignItems: 'center',
  },
  searchButton: {
    background: '#048340',
    color: '#fff',
    padding: '8px 14px',
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
  return (
    <>
      <Grid container spacing={4}>
        <Grid item container spacing={2} xs={12}>
          <Grid item xs={6} sm={6} md={4}>
            <Tile
              amount={5}
              label={'Course Enrolled'}
              backgroundColor='#74b8ff'
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Tile
              amount={50}
              label={'Skill Matching Courses'}
              backgroundColor={'#0984e2'}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Tile
              amount={550}
              label={'Total Courses'}
              backgroundColor={'#8f8dfc'}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Tile
              amount={320}
              label={'Jobs Apply'}
              backgroundColor={'#00b894'}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Tile
              amount={2500}
              label={'Total Jobs'}
              backgroundColor={'#00cfc9'}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Tile
              amount={100}
              label={'Skill Matching Jobs'}
              backgroundColor={'#44e3b8'}
            />
          </Grid>
        </Grid>

        <Grid item container spacing={2} xs={12}>
          <Grid item container xs={12} className={classes.searchBox}>
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
              <LocationOnOutlined />
              <NativeSelect disableUnderline>
                <option>লোকেশন</option>
              </NativeSelect>
            </Grid>
            <Grid item xs={6} sm={6} md={2}>
              <Button variant='contained' className={classes.searchButton}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OverviewSection;
