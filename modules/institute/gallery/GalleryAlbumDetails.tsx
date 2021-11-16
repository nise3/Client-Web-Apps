import FilterListIcon from '@mui/icons-material/FilterList';
import {styled} from '@mui/material/styles';
import {
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Typography,
} from '@mui/material';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useEffect, useMemo, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {H2, H3} from '../../../@softbd/elements/common';
import SearchIcon from '@mui/icons-material/Search';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import GalleryItemCardView from './GalleryItemCardView';
import {
  useFetchGalleryAlbumContents,
  useFetchGalleryAlbums,
  useFetchPublicGalleryAlbum,
} from '../../../services/cmsManagement/hooks';
import {useRouter} from 'next/router';

const PREFIX = 'InstituteGallery';

const classes = {
  searchIcon: `${PREFIX}-searchIcon`,
  filterIcon: `${PREFIX}-filterIcon`,
  resetButton: `${PREFIX}-resetButton`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.searchIcon}`]: {
    position: 'absolute',
    right: 0,
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
  const {albumDetailsId} = router.query;
  const [galleryAlbumsFilter] = useState<any>({});
  const [galleryAlbumFilter] = useState<any>({
    gallery_album_id: albumDetailsId,
  });
  const {data: galleryAlbums, isLoading: isLoadingGalleryAlbums} =
    useFetchGalleryAlbums(galleryAlbumsFilter);

  const {data: galleryAlbum} = useFetchPublicGalleryAlbum(galleryAlbumFilter);
  console.log('galleryAlbum-----', galleryAlbum);

  const [galleryFilter] = useState<any>({
    gallery_album_id: albumDetailsId,
  });
  const {data: galleryItems} = useFetchGalleryAlbumContents(galleryFilter);

  const [filteredGalleryItems, setFilteredGalleryItems] = useState([]);

  useEffect(() => {
    setFilteredGalleryItems(galleryItems);
  }, [galleryItems]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      gallery_category_id: yup
        .string()
        .label(messages['recipient.institute'] as string),
      gallery_id: yup.string().label(messages['common.name'] as string),
    });
  }, [messages]);

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onResetClicked = () => {
    setFilteredGalleryItems(galleryItems);
  };

  useEffect(() => {
    reset({gallery_album_id: galleryAlbum?.gallery_album_id});
  }, []);

  const onChangeGalleryAlbum = () => {};

  /*  const filterVidesByInput = ({gallery_category_id, gallery_id}: any) => {
    if (gallery_category_id?.length == 0 && gallery_id?.length == 0) {
      setFilteredGalleryItems(galleryItems);
    } else {
      setFilteredGalleryItems(
        galleryItems?.filter((item: any) =>
          gallery_id
            ? item.id == gallery_id
            : item.gallery_category_id == gallery_category_id,
        ),
      );
    }
  };*/

  const onSearch: SubmitHandler<any> = async (data: any) => {
    let filter = filteredGalleryItems?.filter((item: any) =>
      item.title.toLowerCase().includes(data.title),
    );
    let newArr = [...filter];
    setFilteredGalleryItems(newArr);
  };

  // TODO: css issue - fix grid responsiveness

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <Paper>
            <H3 py={3} fontWeight={'bold'}>
              {messages['gallery-albums-albums.institute']}
            </H3>
          </Paper>
        </Grid>
      </Grid>
      <StyledContainer maxWidth='lg'>
        <Grid container mt={4} justifyContent={'center'}>
          <Grid item md={12}>
            <Grid container spacing={{xs: 2, md: 6}}>
              <Grid item xs={12} md={1} className={classes.filterIcon}>
                <FilterListIcon />
                <Typography sx={{marginLeft: '10px'}}>
                  {messages['filter.institute']}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomFormSelect
                  id='gallery_album_id'
                  label={messages['common.gallery_album']}
                  isLoading={isLoadingGalleryAlbums}
                  control={control}
                  optionValueProp={'id'}
                  options={galleryAlbums}
                  optionTitleProp={['title']}
                  onChange={onChangeGalleryAlbum}
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
                <form onSubmit={handleSubmit(onSearch)}>
                  <CustomTextInput
                    id='title'
                    label={messages['common.search']}
                    register={register}
                  />
                  <IconButton
                    className={classes.searchIcon}
                    type={'submit'}
                    disabled={isSubmitting}>
                    <SearchIcon />
                  </IconButton>
                </form>
              </Grid>
            </Grid>
          </Grid>
          {filteredGalleryItems?.length > 0 ? (
            <Grid item md={12} mt={{xs: 4, md: 5}}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h6'>
                    {messages['total_result.institute']}{' '}
                    <Chip
                      label={filteredGalleryItems?.length}
                      color={'primary'}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={5}>
                    {filteredGalleryItems?.map((data: any) => (
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
          ) : (
            <Grid container>
              <Grid item>
                <H2 py={5}>{messages['common.no_data_found']}</H2>
              </Grid>
            </Grid>
          )}
          <Grid item md={12} mt={4} display={'flex'} justifyContent={'center'}>
            <Pagination count={3} variant='outlined' shape='rounded' />
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default GalleryAlbumDetails;
