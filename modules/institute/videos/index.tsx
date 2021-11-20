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
import {H3} from '../../../@softbd/elements/common';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {
  useFetchPublicGalleryAlbumContents,
  useFetchPublicGalleryAlbums,
} from '../../../services/cmsManagement/hooks';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';
import {useVendor} from '../../../@crema/utility/AppHooks';
import AlbumTypes from '../../dashboard/galleryAlbums/AlbumTypes';
import CustomizedDialogs from '../Components/ImageDialog';

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
  const vendor = useVendor();

  const inputFieldRef = useRef<any>();
  const page = useRef<any>(1);
  const [selectedVideoAlbumId, setSelectedVideoAlbumId] = useState<any>('');
  const [videoAlbumContentFilter, setVideoAlbumContentFilter] = useState<any>({
    institute_id: vendor?.id,
    album_type: AlbumTypes.VIDEO,
    page: 1,
    page_size: 8,
  });
  const {
    data: videoAlbumContents,
    isLoading: isLoadingVideoContents,
    metaData,
  } = useFetchPublicGalleryAlbumContents(videoAlbumContentFilter);

  const [videoAlbumFilter] = useState<any>({
    institute_id: vendor?.id,
    album_type: AlbumTypes.VIDEO,
  });
  const {data: videoAlbums, isLoading: isLoadingVideoAlbums} =
    useFetchPublicGalleryAlbums(videoAlbumFilter);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<any>(null);

  const onResetClicked = useCallback(() => {
    setVideoAlbumContentFilter({
      institute_id: vendor?.id,
      album_type: AlbumTypes.VIDEO,
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
        institute_id: vendor?.id,
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
            <Box display={'flex'} alignItems={'center'}>
              <FilterListIcon />
              <Typography sx={{marginLeft: '10px'}}>
                {messages['filter.institute']}
              </Typography>
              <CustomFilterableSelect
                id='video_album_id'
                label={messages['common.video_album']}
                defaultValue={selectedVideoAlbumId}
                isLoading={isLoadingVideoAlbums}
                optionValueProp={'id'}
                options={videoAlbums}
                optionTitleProp={['title']}
                onChange={onChangeVideoAlbum}
                sx={{minWidth: '220px', marginLeft: '15px'}}
              />
              <Button
                onClick={onResetClicked}
                variant={'contained'}
                size={'small'}
                color={'primary'}
                sx={{marginLeft: '15px', height: '40px'}}>
                {messages['common.reset']}
              </Button>
              <Paper
                style={{
                  display: 'flex',
                  width: 220,
                  marginLeft: '15px',
                  height: '40px',
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
            </Box>
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
                                image={data?.content_grid_image_path}
                                alt={data?.title}
                                title={data?.title}
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
            <NoDataFoundComponent />
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
