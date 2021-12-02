import React, {useCallback, useMemo, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Button,
  Card,
  Grid,
  InputAdornment,
  NativeSelect,
  TextField,
  useTheme,
} from '@mui/material';
import Tile from '../../../@softbd/Tile/Tile';
import {LocationOnOutlined, Search} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {useFetchUpazilas} from '../../../services/locationManagement/hooks';
import {useFetchYouthFeedStatistics} from '../../../services/youthManagement/hooks';

const PREFIX = 'OverviewSection';

const classes = {
  searchBox: `${PREFIX}-searchBox`,
  searchButton: `${PREFIX}-searchButton`,
  searchInputBorderHide: `${PREFIX}-searchInputBorderHide`,
  location: `${PREFIX}-location`,
};

const StyledGrid = styled(Grid)(({theme}): any => ({
  [`& .${classes.searchBox}`]: {
    padding: '10px',
    alignItems: 'center',
  },

  [`& .${classes.searchButton}`]: {
    color: '#fff',
    padding: '8px 14px',
    width: '100%',
    height: '100%',
  },

  [`& .${classes.searchInputBorderHide}`]: {
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      padding: '14px 0px',
    },
  },

  [`& .${classes.location}`]: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface OverviewSectionProps {
  addFilter: (filterKey: string, filterValue: number) => void;
}

const OverviewSection = ({addFilter}: OverviewSectionProps) => {
  const {messages, formatNumber} = useIntl();
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<any>('');
  const [upazilasFilter] = useState({});
  const {data: upazilas} = useFetchUpazilas(upazilasFilter);
  const searchTextField = useRef<any>();

  const {data: youthStatisticsData} = useFetchYouthFeedStatistics();
  const youthTheme = useTheme();

  const overviewItems = useMemo(
    () => [
      {
        amount: formatNumber(youthStatisticsData?.enrolled_courses ?? 0),
        text: messages['youth_feed.course_enrolled'],
        color: '#c865e7',
        textColor: youthTheme.palette.common?.white,
      },
      {
        amount: formatNumber(youthStatisticsData?.skill_matching_courses ?? 0),
        text: messages['common.skill_matching_course'],
        color: '#5477f0',
        textColor: youthTheme.palette.common?.white,
      },
      {
        amount: formatNumber(youthStatisticsData?.total_courses ?? 0),
        text: messages['youth_feed.total_course'],
        color: '#20d5c9',
        textColor: youthTheme.palette.common?.white,
      },
      {
        amount: formatNumber(youthStatisticsData?.jobs_apply ?? 0),
        text: messages['youth_feed.job_apply'],
        color: '#32be7e',
        textColor: youthTheme.palette.common?.white,
      },
      {
        amount: formatNumber(youthStatisticsData?.total_jobs ?? 0),
        text: messages['youth_feed.total_jobs'],
        color: '#e52d84',
        textColor: youthTheme.palette.common?.white,
      },
      {
        amount: formatNumber(youthStatisticsData?.skill_matching_jobs ?? 0),
        text: messages['common.skill_matching_job'],
        color: '#fd9157',
        textColor: youthTheme.palette.common?.white,
      },
    ],
    [youthStatisticsData, messages, formatNumber],
  );

  const handleUpazilaChange = useCallback(
    (event: any) => {
      setSelectedUpazilaId(event.target.value);
      addFilter('loc_upazila_id', event.target.value);
    },
    [selectedUpazilaId],
  );

  return (
    <>
      <StyledGrid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
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
                  sx={{backgroundColor: '#fff'}}
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
      </StyledGrid>
    </>
  );
};

export default OverviewSection;
