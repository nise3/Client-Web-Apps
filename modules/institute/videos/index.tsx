import FilterListIcon from '@mui/icons-material/FilterList';
import {styled} from '@mui/material/styles';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import React, {useCallback, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import SearchIcon from '@mui/icons-material/Search';
import {H3, Link} from '../../../@softbd/elements/common';
import {useRouter} from 'next/router';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {
  useFetchPublicGalleryAlbumContents,
  useFetchPublicGalleryAlbums,
} from '../../../services/cmsManagement/hooks';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';

const PREFIX = 'InstituteVideos';

const classes = {
  resetButton: `${PREFIX}-resetButton`,
  cardTitle: `${PREFIX}-cardTitle`,
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
}));

const InstituteVideos = () => {
  const {messages} = useIntl();

  const router = useRouter();
  const path = router.pathname;
  const inputFieldRef = useRef<any>();
  const page = useRef<any>(1);
  const [selectedVideoAlbumId, setSelectedVideoAlbumId] = useState<any>('');
  const [videoAlbumContentFilter, setVideoAlbumContentFilter] = useState<any>({
    album_type: 2,
    page: 1,
    page_size: 8,
  });
  const {
    data: videoAlbumContents,
    isLoading: isLoadingVideoContents,
    metaData,
  } = useFetchPublicGalleryAlbumContents(videoAlbumContentFilter);

  const [videoAlbumFilter] = useState<any>({
    album_type: 2,
  });
  const {data: videoAlbums, isLoading: isLoadingVideoAlbums} =
    useFetchPublicGalleryAlbums(videoAlbumFilter);

  const onResetClicked = useCallback(() => {
    setVideoAlbumContentFilter({
      album_type: 2,
      page: 1,
      page_size: 8,
    });
    setSelectedVideoAlbumId('');
  }, [selectedVideoAlbumId]);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setVideoAlbumContentFilter((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);
  const onChangeVideoAlbum = useCallback(
    (videoAlbumId: number | null) => {
      setSelectedVideoAlbumId(videoAlbumId);
      setVideoAlbumContentFilter({
        gallery_album_id: videoAlbumId,
        album_type: 2,
      });
    },
    [selectedVideoAlbumId],
  );

  const onSearch = useCallback(() => {
    setVideoAlbumContentFilter((params: any) => {
      return {...params, ...{search_text: inputFieldRef.current?.value}};
    });
  }, []);

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <Paper>
            <H3 py={3} fontWeight={'bold'}>
              {messages['videos.institute']}
            </H3>
          </Paper>
        </Grid>
      </Grid>
      <StyledContainer maxWidth='lg'>
        <Grid container mt={4} justifyContent={'center'}>
          <Grid item md={12}>
            <Grid container spacing={{xs: 2, md: 6}}>
              <Grid
                item
                xs={12}
                md={1}
                sx={{display: 'flex', alignItems: 'center'}}>
                <FilterListIcon />
                <Typography sx={{marginLeft: '10px'}}>
                  {messages['filter.institute']}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomFilterableSelect
                  id='video_album_id'
                  label={messages['common.video_album']}
                  defaultValue={selectedVideoAlbumId}
                  isLoading={isLoadingVideoAlbums}
                  optionValueProp={'id'}
                  options={videoAlbums}
                  optionTitleProp={['title']}
                  onChange={onChangeVideoAlbum}
                />
              </Grid>
              <Grid item xs={12} md={1} className={classes.resetButton}>
                <Button
                  onClick={onResetClicked}
                  variant={'contained'}
                  color={'primary'}>
                  {messages['common.reset']}
                </Button>
              </Grid>
              <Grid item xs={12} md={4} style={{position: 'relative'}}>
                <Paper
                  style={{
                    display: 'flex',
                    width: 200,
                  }}>
                  <InputBase
                    size={'small'}
                    style={{
                      paddingLeft: '20px',
                    }}
                    placeholder={messages['common.search'] as string}
                    inputProps={{'aria-label': 'Search'}}
                    inputRef={inputFieldRef}
                    onKeyDown={(event) => {
                      if (event.code == 'Enter') onSearch();
                    }}
                  />
                  <IconButton
                    sx={{p: '5px'}}
                    aria-label='search'
                    onClick={onSearch}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {isLoadingVideoContents ? (
            <Grid
              item
              xs={12}
              sx={{display: 'flex', justifyContent: 'space-evenly'}}>
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
            </Grid>
          ) : videoAlbumContents && videoAlbumContents?.length > 0 ? (
            <Grid item md={12} mt={{xs: 4, md: 5}}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h6'>
                    {messages['total_result.institute']}{' '}
                    <Chip
                      label={videoAlbumContents?.length}
                      color={'primary'}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={5}>
                    {videoAlbumContents?.map((data: any) => {
                      return (
                        <Grid
                          item
                          md={3}
                          justifyContent={'center'}
                          mt={3}
                          key={data.id}>
                          <Link href={`${path}/${data.id}`}>
                            <Card>
                              <CardActionArea>
                                <iframe
                                  width='100%'
                                  height='140'
                                  src={data?.video_url}
                                  frameBorder='0'
                                  /* src={
                                    'https://www.youtube.com/embed/2JyW4yAyTl0?autoplay=1'
                                  }*/
                                  style={{marginBottom: '-8px'}}
                                />
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    className={classes.cardTitle}
                                    variant='body1'
                                    component='div'>
                                    {data?.title}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Link>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <NoDataFoundComponent />
          )}

          <Grid item md={12} mt={4} display={'flex'} justifyContent={'center'}>
            <Stack spacing={2}>
              <Pagination
                page={page.current}
                count={metaData.total_page}
                color={'primary'}
                shape='rounded'
                onChange={onPaginationChange}
              />
            </Stack>
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default InstituteVideos;
