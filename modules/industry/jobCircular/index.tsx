import React, {useState} from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import {H6} from '../../../@softbd/elements/common';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import PostLoadingSkeleton from '../../youth/common/PostLoadingSkeleton';
import clsx from 'clsx';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';
// import WindowIcon from '@mui/icons-material/Window';
// import {ListAlt} from '@mui/icons-material';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useFetchPublicJobs} from '../../../services/IndustryManagement/hooks';
import JobCardComponent from '../../../@softbd/elements/JobCardComponent';

const PREFIX = 'JobCircular';

const classes = {
  titleStyle: `${PREFIX}-titleStyle`,
  gridMargin: `${PREFIX}-gridMargin`,
  filterBox: `${PREFIX}-filterBox`,
  chipStyle: `${PREFIX}-chipStyle`,
  selectStyle: `${PREFIX}-selectStyle`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.titleStyle}`]: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
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

  [`& .${classes.filterBox}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },

  [`& .${classes.selectStyle}`]: {
    minWidth: '220px',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
}));

const JobCircular = () => {
  const {messages} = useIntl();
  const [jobFilter] = useState({});
  /*const {data: jobCircularList, isLoading: isLoadingJobCirculars} =
    useFetchJobCirculars();*/
  /*  const [jobCircularFilters] = useState<any>({
          page: 1,
          page_size: PageSizes.EIGHT,
        });*/

  const {data: jobCircularList, isLoading: isLoadingJobCirculars} =
    useFetchPublicJobs(jobFilter);

  /*const [selectedVideoAlbumId, setSelectedVideoAlbumId] = useState<any>('');*/
  const [selectedVideoAlbumId] = useState<any>('');

  /*  const {data: videoAlbums, isLoading: isLoadingVideoAlbums} =
          useFetchPublicGalleryAlbums(videoAlbumFilter);*/
  const videoAlbums: any = [];
  const isLoadingVideoAlbums = false;

  /*  const onChangeVideoAlbum = useCallback(
        (videoAlbumId: number | null) => {
                  setSelectedVideoAlbumId(videoAlbumId);
                  setVideoAlbumContentFilter({
                    gallery_album_id: videoAlbumId,
                    album_type: 2,
                  });
                },
        [selectedVideoAlbumId],
      );*/
  const onChangeVideoAlbum = () => isLoadingJobCirculars;

  return (
    <>
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

                  <CustomFilterableSelect
                    id='job_circular_id'
                    label={messages['industry.filter']}
                    defaultValue={selectedVideoAlbumId}
                    isLoading={isLoadingVideoAlbums}
                    optionValueProp={'id'}
                    options={videoAlbums}
                    optionTitleProp={['title']}
                    onChange={onChangeVideoAlbum}
                    className={clsx(classes.gridMargin, classes.selectStyle)}
                  />

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
                <Grid container justifyContent={'space-between'}>
                  {!isLoadingJobCirculars && (
                    <Grid item>
                      <H6 className={classes.titleStyle}>
                        <IntlMessages
                          id={'common.total_job_number'}
                          values={{subject: jobCircularList.length}}
                        />
                      </H6>
                    </Grid>
                  )}

                  <Grid item>
                    {/*<ListAlt />*/}
                    {/*<WindowIcon />*/}
                  </Grid>
                </Grid>
              </Grid>
              {isLoadingJobCirculars ? (
                <PostLoadingSkeleton />
              ) : jobCircularList && jobCircularList?.length ? (
                jobCircularList?.map((jobCircular: any) => {
                  return (
                    <Grid item xs={12} sm={12} md={12} key={jobCircular.id}>
                      <JobCardComponent job={jobCircular} />
                    </Grid>
                  );
                })
              ) : (
                <NoDataFoundComponent
                  message={messages['common.no_data_found'] as string}
                />
              )}

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

export default JobCircular;
