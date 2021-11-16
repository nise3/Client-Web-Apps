import {styled} from '@mui/material/styles';
import {
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
import {H3, H6} from '../../../@softbd/elements/common';
import SearchIcon from '@mui/icons-material/Search';
import GalleryItemCardView from './GalleryItemCardView';
import {
  useFetchGalleryAlbums,
  useFetchPublicGalleryAlbumContents,
} from '../../../services/cmsManagement/hooks';
import {useRouter} from 'next/router';
import ContentItemCard from './ContentItemCard';

const PREFIX = 'InstituteGallery';

const classes = {
  searchIcon: `${PREFIX}-searchIcon`,
  filterIcon: `${PREFIX}-filterIcon`,
  resetButton: `${PREFIX}-resetButton`,
  font: `${PREFIX}-font`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  position: 'relative',
  [`& .${classes.searchIcon}`]: {
    position: 'absolute',
    right: 0,
  },
  [`& .${classes.font}`]: {
    position: 'absolute',
    top: '20%',
    width: '100%',
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'none',
    fontFamily: 'Comic Sans MS',
  },

  [`& .${classes.filterIcon}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.resetButton}`]: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '3% !important',
    },
  },
}));

const GalleryAlbumDetails = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {albumDetailsId: galleryAlbumId}: any = router.query;
  const page = useRef<any>(1);
  const inputFieldRef = useRef<any>();

  const [childGalleryAlbumsFilter] = useState<any>({
    parent_gallery_album_id: galleryAlbumId,
  });
  const {data: childGalleryAlbums, isLoading: isLoadingChildGalleryAlbum} =
    useFetchGalleryAlbums(childGalleryAlbumsFilter);

  /*  const [galleryAlbumsFilter] = useState<any>({});
    const {data: galleryAlbums, isLoading: isLoadingGalleryAlbums} =
    useFetchGalleryAlbums(galleryAlbumsFilter);

  const [selectedGalleryAlbumId, setSelectedGalleryAlbumId] = useState<
    number | string
  >(galleryAlbumId);*/

  const [galleryContentFilter, setGalleryContentFilter] = useState<any>({
    page: 1,
    page_size: 8,
    gallery_album_id: galleryAlbumId,
  });
  const {
    data: galleryContents,
    isLoading: isContentLoading,
    metaData,
  } = useFetchPublicGalleryAlbumContents(galleryContentFilter);

  /* const onResetClicked = () => {
    setGalleryContentFilter({
      page: 1,
      page_size: 8,
      gallery_album_id: galleryAlbumId,
    });
  };

  const onChangeGalleryAlbum = (albumId: any) => {
    setSelectedGalleryAlbumId(albumId ? albumId : galleryAlbumId);

    setGalleryContentFilter((params: any) => {
      return {
        ...params,
        ...{page: 1, gallery_album_id: albumId ? albumId : galleryAlbumId},
      };
    });
  };*/
  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setGalleryContentFilter((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);

  const onSearch = useCallback(() => {
    setGalleryContentFilter((params: any) => {
      return {...params, ...{search_text: inputFieldRef.current?.value}};
    });
  }, []);

  // TODO: css issue - fix grid responsiveness

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <Paper>
            <H3 py={3} fontWeight={'bold'}>
              {messages['gallery_album_content.label']}
            </H3>
            <CardMedia
              component='img'
              alt='Contemplative Reptile'
              height='200'
              image={'/images/auth-background.jpg'}
              title='Contemplative Reptile'
            />
            <Typography gutterBottom variant='h4' component='h4'>
              Title
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <StyledContainer maxWidth='lg'>
        <Grid container mt={4} spacing={5} justifyContent={'center'}>
          <Grid item xs={12}>
            <Grid container spacing={{xs: 2, md: 6}}>
              <Grid item xs={12} md={4} style={{position: 'relative'}}>
                <Paper
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 200,
                  }}>
                  <InputBase
                    size={'small'}
                    sx={{
                      ml: 1,
                      flex: 1,
                      paddingLeft: '20px',
                      minHeight: '30px',
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
                {/*<Box>
                  <InputBase
                    size={'small'}
                    sx={{ml: 1, flex: 1, paddingLeft: '20px'}}
                    placeholder={messages['common.search'] as string}
                    inputProps={{'aria-label': 'Search'}}
                    inputRef={inputFieldRef}
                    onKeyDown={onSearchClick}
                  />
                  <IconButton
                    sx={{p: '10px'}}
                    aria-label='search'
                    onClick={onSearchClick}>
                    <SearchIcon />
                  </IconButton>
                </Box>*/}
              </Grid>
            </Grid>
          </Grid>
          {isLoadingChildGalleryAlbum ? (
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
          {isContentLoading ? (
            <Grid
              item
              xs={12}
              sx={{display: 'flex', justifyContent: 'space-evenly'}}>
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
              <Skeleton variant='rectangular' width={'22%'} height={140} />
            </Grid>
          ) : galleryContents && galleryContents?.length > 0 ? (
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h6'>
                    {messages['total_result.institute']}{' '}
                    <Chip label={galleryContents?.length} color={'primary'} />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={5}>
                    {galleryContents?.map((data: any) => (
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
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} textAlign={'center'}>
              <H6 py={5}>{messages['common.no_data_found']}</H6>
            </Grid>
          )}

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
        </Grid>
      </StyledContainer>
    </>
  );
};

export default GalleryAlbumDetails;
