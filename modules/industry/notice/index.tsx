import {useIntl} from 'react-intl';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {H2} from '../../../@softbd/elements/common';
import React, {useState} from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import NoticeCard from '../../youth/noticeBoard/NoticeCard';
import {useFetchPublicNoticeOrNewses} from '../../../services/cmsManagement/hooks';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import NoticeOrNewsTypes from '../../../@softbd/utilities/NoticeOrNewsTypes';
import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import PageSizes from '../../../@softbd/utilities/PageSizes';

const PREFIX = 'Notice';

const classes = {
  resetButton: `${PREFIX}-resetButton`,
  cardTitle: `${PREFIX}-cardTitle`,
  gridMargin: `${PREFIX}-gridMargin`,
  selectStyle: `${PREFIX}-selectStyle`,
  filterBox: `${PREFIX}-filterBox`,
  chipStyle: `${PREFIX}-chipStyle`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.resetButton}`]: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '3% !important',
    },
  },
  [`& .${classes.cardTitle}`]: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  [`& .${classes.chipStyle}`]: {
    color: theme.palette.primary.light,
    padding: '3px 7px',
    marginLeft: '10px',
  },
  [`& .${classes.gridMargin}`]: {
    marginLeft: '15px',
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
      marginTop: '15px',
    },
  },
  [`& .${classes.selectStyle}`]: {
    minWidth: '220px',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  [`& .${classes.filterBox}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
}));

const Notice = () => {
  const {messages} = useIntl();

  const [noticeFilters] = useState<any>({
    page: 1,
    page_size: PageSizes.EIGHT,
    type: NoticeOrNewsTypes.NOTICE,
  });

  const {data: noticeList} = useFetchPublicNoticeOrNewses(
    objectFilter(noticeFilters),
  );

  const [value, setValue] = useState<Date | null>(null);

  const handleDateChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <H2 py={3} fontWeight={'bold'}>
            {messages['notice_type.notice']}
          </H2>
        </Grid>
      </Grid>

      <StyledContainer maxWidth='lg' sx={{marginBottom: '25px'}}>
        <Grid container mt={4} justifyContent={'center'}>
          <Grid item md={12}>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <Box className={classes.filterBox}>
                  <Box display={'flex'}>
                    <FilterListIcon />
                    <Typography sx={{marginLeft: '15px'}}>
                      {messages['filter.institute']}
                    </Typography>
                  </Box>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3} sx={{marginLeft: '10px'}}>
                      <DesktopDatePicker
                        inputFormat='MM/dd/yyyy'
                        value={value}
                        onChange={handleDateChange}
                        renderInput={(params) => (
                          <TextField size={'small'} {...params} />
                        )}
                      />
                    </Stack>
                  </LocalizationProvider>

                  <Button
                    variant={'contained'}
                    size={'small'}
                    color={'primary'}
                    className={classes.gridMargin}
                    sx={{height: '40px', width: '30%'}}>
                    {messages['common.reset']}
                  </Button>
                </Box>
              </Grid>
              <Grid item>
                <Paper
                  style={{
                    display: 'flex',
                    width: 220,
                    height: '40px',
                  }}
                  className={classes.gridMargin}>
                  <InputBase
                    size={'small'}
                    style={{
                      paddingLeft: '20px',
                    }}
                    placeholder={messages['common.search'] as string}
                    inputProps={{'aria-label': 'Search'}}
                    // inputRef={}
                    // onKeyDown={(event) => {
                    //   if (event.code == 'Enter') onSearch();
                    // }}
                  />
                  <IconButton
                    sx={{p: '5px'}}
                    aria-label='search'
                    // onClick={onSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} mt={{xs: 4, md: 5}}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography gutterBottom variant='h6'>
                  {messages['total_result.institute']}{' '}
                  <Chip label={'১৫'} className={classes.chipStyle} />
                </Typography>
              </Grid>
              {noticeList?.map((notice: any) => (
                <Grid item xs={12} md={6} key={notice.id}>
                  <NoticeCard notice={notice} />
                </Grid>
              ))}
              <Grid
                item
                md={12}
                mt={4}
                display={'flex'}
                justifyContent={'center'}>
                <Stack spacing={2}>
                  <Pagination
                    page={1}
                    count={1}
                    color={'primary'}
                    shape='rounded'
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default Notice;
