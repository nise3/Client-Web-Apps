import React, {useCallback, useMemo, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Button,
  Card,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';
import Tile from '../../../@softbd/Tile/Tile';
import {Close, Search} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {useFetchUpazilas} from '../../../services/locationManagement/hooks';
import {useFetchYouthFeedStatistics} from '../../../services/youthManagement/hooks';
import CustomFilterableSelect from '../training/components/CustomFilterableSelect';
import Hidden from '../../../@softbd/elements/Hidden';

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
    padding: '0',
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
  addFilter: (filterKey: string, filterValue: any) => void;
}

const OverviewSection = ({addFilter}: OverviewSectionProps) => {
  const {messages, formatNumber} = useIntl();
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<any>('');
  const [upazilasFilter] = useState({});
  const {data: upazilas} = useFetchUpazilas(upazilasFilter);
  const searchTextField = useRef<any>();
  const [hasInputValue, setHasInputValue] = useState<boolean>(false);

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
        amount: formatNumber(youthStatisticsData?.applied_jobs ?? 0),
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

  const onUpazilaChange = useCallback(
    (upazilaId: any) => {
      setSelectedUpazilaId(upazilaId);
      addFilter('loc_upazila_id', upazilaId);
    },
    [selectedUpazilaId],
  );

  const onSearchClick = useCallback(() => {
    addFilter('search_text', searchTextField.current.value);
  }, []);

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
                  onChange={(event) => {
                    setHasInputValue(event.target.value != '');
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Search />
                      </InputAdornment>
                    ),
                    className: classes.searchInputBorderHide,
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        sx={{cursor: 'pointer', marginRight: '10px'}}>
                        {hasInputValue ? (
                          <Close
                            onClick={() => {
                              setHasInputValue(false);
                              searchTextField.current.value = '';
                              onSearchClick();
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={3} className={classes.location}>
                <Hidden mdDown>
                  <Paper
                    component='span'
                    elevation={0}
                    sx={{minWidth: '125px'}}>
                    <CustomFilterableSelect
                      id={'loc_upazila_id'}
                      defaultValue={selectedUpazilaId}
                      label={messages['common.location_2'] as string}
                      onChange={onUpazilaChange}
                      options={upazilas}
                      isLoading={false}
                      optionValueProp={'id'}
                      optionTitleProp={['title', 'title_en']}
                      size='medium'
                      dropdownStyle={{
                        width: '300px',
                      }}
                    />
                  </Paper>
                </Hidden>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Button
                  variant='contained'
                  color={'primary'}
                  className={classes.searchButton}
                  onClick={onSearchClick}>
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
