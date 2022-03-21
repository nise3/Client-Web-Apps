import {styled} from '@mui/material/styles';
import {
  Box,
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
} from '@mui/material';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import {H1, H2} from '../../../@softbd/elements/common';
import SearchIcon from '@mui/icons-material/Search';
import GalleryItemCardView from './GalleryItemCardView';
import {
  useFetchPublicGalleryAlbum,
  useFetchPublicGalleryAlbumContents,
  useFetchPublicGalleryAlbums,
} from '../../../services/cmsManagement/hooks';
import {useRouter} from 'next/router';
import ContentItemCard from './ContentItemCard';
import CustomizedDialogs from '../Components/ImageDialog';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';

const PREFIX = 'GalleryAlbumDetails';

const classes = {
  searchIcon: `${PREFIX}-searchIcon`,
  coverImageBox: `${PREFIX}-coverImageBox`,
  coverImage: `${PREFIX}-coverImage`,
  coverTitle: `${PREFIX}-coverTitle`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  padding: '0 !important',
  position: 'relative',
  marginBottom: '20px',
  [`& .${classes.searchIcon}`]: {
    position: 'absolute',
    right: 0,
  },
  [`& .${classes.coverImageBox}`]: {
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
  },
  [`& .${classes.coverImage}`]: {
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    height: 400,
    position: 'absolute',
    objectFit: 'unset',
    [theme.breakpoints.up('xl')]: {
      height: 550,
    },
    [theme.breakpoints.down('sm')]: {
      height: 150,
    },
  },
  [`& .${classes.coverTitle}`]: {
    background: theme.palette.common.white,
    color: theme.palette.primary.main,
    margin: 'auto',
    zIndex: 1,
    padding: '10px',
    fontSize: '2.25rem',
    fontWeight: 'bold',
  },
}));

const GalleryAlbumDetails = () => {
  const {messages, formatNumber} = useIntl();
  const router = useRouter();
  const {albumDetailsId: galleryAlbumId}: any = router.query;
  const page = useRef<any>(1);

  const inputFieldRef = useRef<any>();
  /** Data fetching for child gallery albums **/

  const [childGalleryAlbumFilter, setChildGalleryAlbumFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: childGalleryAlbums, isLoading: isLoadingChildGalleryAlbums} =
    useFetchPublicGalleryAlbums(childGalleryAlbumFilter);
  /** data fetching for current gallery album **/
  const {data: currentGalleryAlbum, isLoading} =
    useFetchPublicGalleryAlbum(galleryAlbumId);

  /** Data fetching for  gallery album contents **/
  const [galleryAlbumContentFilter, setGalleryAlbumContentFilter] = useState({
    page: 1,
    page_size: PageSizes.EIGHT,
  });
  const {
    data: galleryAlbumContents,
    isLoading: isLoadingGalleryAlbumContents,
    metaData,
  } = useFetchPublicGalleryAlbumContents(galleryAlbumContentFilter);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<any>(null);

  useEffect(() => {
    if (galleryAlbumId) {
      setChildGalleryAlbumFilter((prev: any) => {
        return {...prev, ...{parent_gallery_album_id: galleryAlbumId}};
      });
      setGalleryAlbumContentFilter((prev: any) => {
        return {...prev, ...{gallery_album_id: galleryAlbumId}};
      });
    }
  }, [galleryAlbumId]);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setGalleryAlbumContentFilter((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);

  const onSearch = useCallback(() => {
    setGalleryAlbumContentFilter((params: any) => {
      return {...params, ...{search_text: inputFieldRef.current?.value}};
    });
  }, []);

  const onCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  // TODO: css issue - fix grid responsiveness

  return (
    <>
      <StyledContainer maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {isLoading ? (
              <Skeleton variant='rectangular' width={'100%'} height={350} />
            ) : (
              <Box className={classes.coverImageBox}>
                <CardMedia
                  component='img'
                  image={currentGalleryAlbum?.main_image_path}
                  className={classes.coverImage}
                  alt={currentGalleryAlbum?.image_alt_title}
                  title={currentGalleryAlbum?.title}
                />

                <H1 gutterBottom className={classes.coverTitle}>
                  {currentGalleryAlbum?.title}
                </H1>
              </Box>
            )}
          </Grid>
          {isLoadingChildGalleryAlbums ? (
            <Grid
              item
              xs={12}
              sx={{display: 'flex', justifyContent: 'space-evenly'}}>
              <Skeleton variant='rectangular' width={'23%'} height={140} />
              <Skeleton variant='rectangular' width={'23%'} height={140} />
              <Skeleton variant='rectangular' width={'23%'} height={140} />
              <Skeleton variant='rectangular' width={'23%'} height={140} />
            </Grid>
          ) : (
            childGalleryAlbums &&
            childGalleryAlbums?.length > 0 && (
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <H2 style={{fontSize: '1.875rem'}}>
                      {messages['common.gallery_album']}
                    </H2>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={5}>
                      {childGalleryAlbums?.map((data: any) => (
                        <Grid
                          item
                          md={3}
                          justifyContent={'center'}
                          mt={3}
                          key={data.id}>
                          <GalleryItemCardView item={data} />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )
          )}
          {/*Todo: this margin top is a temporary fix for design*/}
          <Grid item xs={12} sx={{marginTop: '100px'}}>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  <H2
                    style={{fontSize: '1.875rem'}}
                    display={'flex'}
                    alignItems={'center'}>
                    {messages['total_result.institute']}
                    <Chip
                      label={formatNumber(
                        galleryAlbumContents ? galleryAlbumContents.length : 0,
                      )}
                      color={'primary'}
                      sx={{marginLeft: '5px'}}
                    />
                  </H2>
                  <Paper
                    style={{
                      padding: '7px 0px',
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
              {isLoadingGalleryAlbumContents ? (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    marginTop: '15px',
                  }}>
                  <Skeleton variant='rectangular' width={'23%'} height={140} />
                  <Skeleton variant='rectangular' width={'23%'} height={140} />
                  <Skeleton variant='rectangular' width={'23%'} height={140} />
                  <Skeleton variant='rectangular' width={'23%'} height={140} />
                </Grid>
              ) : galleryAlbumContents && galleryAlbumContents?.length > 0 ? (
                <Grid item xs={12}>
                  <Grid container spacing={5}>
                    {(galleryAlbumContents || [])
                      .slice(0, 3)
                      ?.map((data: any) => (
                        <Grid
                          item
                          md={3}
                          justifyContent={'center'}
                          mt={3}
                          key={data.id}>
                          <ContentItemCard
                            data={data}
                            onClick={(eventData: any) => {
                              setVideoData(eventData);
                              setOpenDialog(true);
                            }}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={12} textAlign={'center'}>
                  <NoDataFoundComponent
                    messageType={messages['gallery_album_content.label']}
                    messageTextType={'h6'}
                  />
                </Grid>
              )}
              {metaData.total_page > 1 && (
                <Grid item md={12} display={'flex'} justifyContent={'center'}>
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
        </Grid>
      </StyledContainer>
      {openDialog && videoData && (
        <CustomizedDialogs data={videoData} onClose={onCloseDialog} />
      )}
    </>
  );
};

export default GalleryAlbumDetails;
