import React from 'react';
import {
  Button,
  Card,
  Grid,
  InputAdornment,
  NativeSelect,
  TextField,
} from '@mui/material';
import Tile from './components/Tile';
import {CremaTheme} from '../../types/AppContextPropsType';
import {makeStyles} from '@mui/styles';
import {LocationOnOutlined, Search} from '@mui/icons-material';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme: CremaTheme): any => ({
  searchBox: {
    padding: '10px',
    alignItems: 'center',
  },
  searchButton: {
    color: '#fff',
    padding: '8px 14px',
    width: '100%',
    height: '100%',
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
  const {messages} = useIntl();

  const overviewItems = [
    {
      amount: 5,
      text: messages['youth_feed.course_enrolled'],
      color: '#c865e7',
    },
    {
      amount: 50,
      text: messages['common.skill_matching_course'],
      color: '#5477f0',
    },
    {
      amount: 550,
      text: messages['youth_feed.total_course'],
      color: '#20d5c9',
    },
    {
      amount: 320,
      text: messages['youth_feed.job_apply'],
      color: '#32be7e',
    },
    {
      amount: 2500,
      text: messages['youth_feed.total_jobs'],
      color: '#e52d84',
    },
    {
      amount: 100,
      text: messages['common.skill_matching_job'],
      color: '#fd9157',
    },
  ];

  return (
    <>
      <Grid container spacing={5}>
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
                  placeholder={messages['common.searchHere'] as string}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Search />
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
                  <option>{messages['common.location']}</option>
                </NativeSelect>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Button
                  variant='contained'
                  color={'primary'}
                  className={classes.searchButton}>
                  {messages['common.search']}
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
