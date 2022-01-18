import React, {useState} from 'react';
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
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import {H1, H2} from '../../../@softbd/elements/common';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import PostLoadingSkeleton from '../../youth/common/PostLoadingSkeleton';
import JobCardComponent from './components/JobCardComponent';
import clsx from 'clsx';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';

let jobCircularList = [
  {
    id: 1,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-3.png',
    title: 'ওটি অ্যাসিস্ট্যান্ট',
    experience: '১-৩ বছর অভিজ্ঞতা',
    location: 'আশুলিয়াা',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
  {
    id: 2,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-4.png',
    title: 'মেডিক্যাল সহকারী',
    experience: 'প্রযোজ্য নয়',
    location: 'রূপগঞ্জ',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
  {
    id: 3,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-5.png',
    title: 'সিসিটিভি টেকনিশিয়ান',
    experience: '২ বছর অভিজ্ঞতা',
    location: 'ঢাকা',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
  {
    id: 4,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-6.png',
    title: 'অটোমোবাইল ইঞ্জিনিয়ার',
    experience: '৫-৭ বছর অভিজ্ঞতা',
    location: 'উত্তরা',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
  {
    id: 5,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-7.png',
    title: 'কম্পিউটার অপারেটর',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'মিরপুর',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
  {
    id: 6,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-8.png',
    title: 'ডাটা এন্ট্রি অপারেটর',
    experience: 'প্রযোজ্য নয়়',
    location: 'ঢাকা',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  },
];

const PREFIX = 'JobCircular';

const classes = {
  gridMargin: `${PREFIX}-gridMargin`,
  filterBox: `${PREFIX}-filterBox`,
  chipStyle: `${PREFIX}-chipStyle`,
  selectStyle: `${PREFIX}-selectStyle`,
};

const StyledContainer = styled(Container)(({theme}) => ({
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
  const result = useCustomStyle();

  /*  const [jobCircularFilters] = useState<any>({
          page: 1,
          page_size: PageSizes.EIGHT,
        });*/

  /*const {data: jobCircularList, isLoading: isLoadingJobCirculars} =
          useFetchJobCircular(objectFilter(jobCircularFilters));*/
  const isLoadingJobCirculars = false;

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
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <H1
            py={3}
            sx={{
              ...result.h3,
              fontWeight: 'bold',
            }}>
            {messages['industry.job_circular']}
          </H1>
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
                <H2
                  gutterBottom
                  sx={{
                    ...result.h6,
                  }}>
                  {messages['total_result.institute']}{' '}
                  <Chip label={'১৫'} className={classes.chipStyle} />
                </H2>
              </Grid>
              {isLoadingJobCirculars ? (
                <PostLoadingSkeleton />
              ) : (
                jobCircularList?.map((jobCircular: any) => {
                  return (
                    <Grid item xs={12} sm={12} md={12} key={jobCircular.id}>
                      <JobCardComponent job={jobCircular} />
                    </Grid>
                  );
                })
              )}

              {jobCircularList && jobCircularList.length <= 0 && (
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
