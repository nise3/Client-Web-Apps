import FilterListIcon from '@mui/icons-material/FilterList';
import {styled} from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
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
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {
  useFetchPublicGalleryAlbumContents,
  useFetchPublicGalleryAlbums,
} from '../../../services/cmsManagement/hooks';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';
import AlbumTypes from '../../dashboard/galleryAlbums/AlbumTypes';
import CustomizedDialogs from '../Components/ImageDialog';
import {H2} from '../../../@softbd/elements/common';
import clsx from 'clsx';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const PREFIX = 'InstituteVideos';

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

const InstituteVideos = () => {
  const {messages} = useIntl();

  const inputFieldRef = useRef<any>();
  const page = useRef<any>(1);
  const [selectedVideoAlbumId, setSelectedVideoAlbumId] = useState<any>('');
  const [videoAlbumContentFilter, setVideoAlbumContentFilter] = useState<any>({
    album_type: AlbumTypes.VIDEO,
    page: 1,
    page_size: PageSizes.EIGHT,
  });
  const {
    data: videoAlbumContents,
    isLoading: isLoadingVideoContents,
    metaData,
  } = useFetchPublicGalleryAlbumContents(videoAlbumContentFilter);

  const [videoAlbumFilter] = useState<any>({
    album_type: AlbumTypes.VIDEO,
  });
  const {data: videoAlbums, isLoading: isLoadingVideoAlbums} =
    useFetchPublicGalleryAlbums(videoAlbumFilter);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<any>(null);

  const onResetClicked = useCallback(() => {
    setVideoAlbumContentFilter({
      album_type: AlbumTypes.VIDEO,
      page: 1,
      page_size: PageSizes.EIGHT,
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

  const onCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <H2 py={3} fontWeight={'bold'}>
            {messages['videos.institute']}
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

                  <CustomFilterableSelect
                    id='video_album_id'
                    label={messages['common.video_album']}
                    defaultValue={selectedVideoAlbumId}
                    isLoading={isLoadingVideoAlbums}
                    optionValueProp={'id'}
                    options={videoAlbums}
                    optionTitleProp={['title']}
                    onChange={onChangeVideoAlbum}
                    className={clsx(classes.gridMargin, classes.selectStyle)}
                  />
                  <Button
                    onClick={onResetClicked}
                    variant={'contained'}
                    size={'small'}
                    color={'primary'}
                    className={classes.gridMargin}
                    sx={{height: '40px'}}>
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
                      className={classes.chipStyle}
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
                          <Card>
                            <CardActionArea
                              onClick={() => {
                                setVideoData({
                                  title: data.title,
                                  videoUrl: data.video_url,
                                  details: data.description,
                                });
                                setOpenDialog(true);
                              }}>
                              <CardMedia
                                component='img'
                                height='140'
                                image={
                                  data?.content_grid_image_path ??
                                  '/images/blank_gray_image.png'
                                }
                                alt={data?.title}
                                title={data?.title}
                              />
                              <PlayCircleIcon
                                sx={{
                                  position: 'absolute',
                                  top: 'calc(30% - 35px)',
                                  left: 'calc(50% - 35px)',
                                  height: '70px',
                                  width: '70px',
                                }}
                                color='primary'
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  className={classes.cardTitle}
                                  variant='body2'
                                  component='div'>
                                  {data?.title}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
                {metaData.total_page > 1 && (
                  <Grid
                    item
                    md={12}
                    mt={4}
                    display={'flex'}
                    justifyContent={'center'}>
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
                )}
              </Grid>
            </Grid>
          ) : (
            <NoDataFoundComponent messageType={messages['common.video']} />
          )}
        </Grid>
        {openDialog && videoData && (
          <CustomizedDialogs data={videoData} onClose={onCloseDialog} />
        )}
      </StyledContainer>
    </>
  );
};

export default InstituteVideos;
