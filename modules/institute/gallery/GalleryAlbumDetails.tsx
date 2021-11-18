import {styled} from '@mui/material/styles';
import {
  Box,
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
import {H6} from '../../../@softbd/elements/common';
import SearchIcon from '@mui/icons-material/Search';
import GalleryItemCardView from './GalleryItemCardView';
import {
  useFetchPublicGalleryAlbum,
  useFetchPublicGalleryAlbumContents,
  useFetchPublicGalleryAlbums,
} from '../../../services/cmsManagement/hooks';
import {useRouter} from 'next/router';
import ContentItemCard from './ContentItemCard';

const PREFIX = 'InstituteGallery';

const classes = {
  searchIcon: `${PREFIX}-searchIcon`,
  coverImage: `${PREFIX}-coverImage`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  position: 'relative',
  [`& .${classes.searchIcon}`]: {
    position: 'absolute',
    right: 0,
  },
  [`& .${classes.coverImage}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${'/images/recent-activities1.png'})`,
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    height: '300px',
  },
}));

const GalleryAlbumDetails = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {albumDetailsId: galleryAlbumId}: any = router.query;
  const page = useRef<any>(1);

  const inputFieldRef = useRef<any>();
  /** Data fetching for child gallery albums **/

  const [childGalleryAlbumFilter] = useState<any>({
    parent_gallery_album_id: galleryAlbumId,
  });
  const {data: childGalleryAlbums, isLoading: isLoadingChildGalleryAlbums} =
    useFetchPublicGalleryAlbums(childGalleryAlbumFilter);
  /** data fetching for current gallery album **/
  const {data: currentGalleryAlbum} =
    useFetchPublicGalleryAlbum(galleryAlbumId);

  /** Data fetching for  gallery album contents **/

  const [galleryAlbumContentFilter, setGalleryAlbumContentFilter] = useState({
    page: 1,
    page_size: 8,
    gallery_album_id: galleryAlbumId,
  });
  const {
    data: galleryAlbumContents,
    isLoading: isLoadingGalleryAlbumContents,
    metaData,
  } = useFetchPublicGalleryAlbumContents(galleryAlbumContentFilter);

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

  // TODO: css issue - fix grid responsiveness

  /*  let backgroundImage = '';
  if (galleryAlbum?.grid_image_path) {
    backgroundImage = galleryAlbum?.grid_image_path;
  } else {
    backgroundImage = galleryAlbum?.main_image_path;
  }*/
  return (
    <>
      <StyledContainer maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box className={classes.coverImage}>
              <Typography gutterBottom variant='h2' component='h2'>
                {currentGalleryAlbum?.title}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Paper
                style={{
                  display: 'flex',
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
          {isLoadingChildGalleryAlbums ? (
            <Grid
              item
              xs={12}
              sx={{display: 'flex', justifyContent: 'space-evenly'}}>
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
            </Grid>
          ) : (
            childGalleryAlbums &&
            childGalleryAlbums?.length > 0 && (
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant='h6'>
                      {messages['common.gallery_album']}
                    </Typography>
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
          {isLoadingGalleryAlbumContents ? (
            <Grid
              item
              xs={12}
              sx={{display: 'flex', justifyContent: 'space-evenly'}}>
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
            </Grid>
          ) : galleryAlbumContents && galleryAlbumContents?.length > 0 ? (
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h6'>
                    {messages['total_result.institute']}{' '}
                    <Chip
                      label={galleryAlbumContents?.length}
                      color={'primary'}
                    />
                  </Typography>
                </Grid>
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
                          <ContentItemCard item={data} />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
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
          ) : (
            <Grid item xs={12} textAlign={'center'}>
              <H6 py={5}>{messages['common.no_data_found']}</H6>
            </Grid>
          )}
        </Grid>
      </StyledContainer>
    </>
  );
};

export default GalleryAlbumDetails;
