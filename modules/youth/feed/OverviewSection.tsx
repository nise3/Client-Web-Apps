import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Button,
  Card,
  Grid,
  InputAdornment,
  NativeSelect,
  TextField,
} from '@mui/material';
import Tile from './components/Tile';
import {makeStyles} from '@mui/styles';
import {LocationOnOutlined, Search} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {useFetchUpazilas} from '../../../services/locationManagement/hooks';
import {useFetchYouthFeedStatistics} from '../../../services/youthManagement/hooks';

const useStyles = makeStyles((): any => ({
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

interface OverviewSectionProps {
  addFilter: (filterKey: string, filterValue: number) => void;
}

const OverviewSection = ({addFilter}: OverviewSectionProps) => {
  const classes: any = useStyles();
  const {messages} = useIntl();
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<any>('');
  const [upazilasFilter] = useState({});
  const {data: upazilas} = useFetchUpazilas(upazilasFilter);
  const searchTextField = useRef<any>();

  const {data: youthStatisticsData} = useFetchYouthFeedStatistics();

  const overviewItems = useMemo(
    () => [
      {
        amount: youthStatisticsData?.enrolled_courses ?? 0,
        text: messages['youth_feed.course_enrolled'],
        color: '#c865e7',
      },
      {
        amount: youthStatisticsData?.skill_matching_courses ?? 0,
        text: messages['common.skill_matching_course'],
        color: '#5477f0',
      },
      {
        amount: youthStatisticsData?.total_courses ?? 0,
        text: messages['youth_feed.total_course'],
        color: '#20d5c9',
      },
      {
        amount: youthStatisticsData?.jobs_apply ?? 0,
        text: messages['youth_feed.job_apply'],
        color: '#32be7e',
      },
      {
        amount: youthStatisticsData?.total_jobs ?? 0,
        text: messages['youth_feed.total_jobs'],
        color: '#e52d84',
      },
      {
        amount: youthStatisticsData?.skill_matching_jobs ?? 0,
        text: messages['common.skill_matching_job'],
        color: '#fd9157',
      },
    ],
    [youthStatisticsData, messages],
  );

  const handleUpazilaChange = useCallback(
    (event: any) => {
      setSelectedUpazilaId(event.target.value);
      addFilter('upazila_id', event.target.value);
    },
    [selectedUpazilaId],
  );

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <Grid container spacing={3}>
            {overviewItems.map((overview: any) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={overview.text}>
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
              <Grid
                item
                xs={12}
                sm={12}
                md={7}
                sx={{display: 'flex', alignItems: 'center'}}>
                <TextField
                  inputRef={searchTextField}
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
                  color={'primary'}
                  onChange={handleUpazilaChange}>
                  <option value={''}>{messages['common.location']}</option>
                  {upazilas &&
                    upazilas.map((upazila: any) => (
                      <option key={upazila.id} value={upazila.id}>
                        {upazila.title}
                      </option>
                    ))}
                </NativeSelect>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Button
                  variant='contained'
                  color={'primary'}
                  className={classes.searchButton}
                  onClick={useCallback(() => {
                    addFilter('course_name', searchTextField.current.value);
                  }, [])}>
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
