import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Grid,
  Typography,
  Button,
  Paper,
  Pagination,
  Container,
  Chip,
  IconButton,
} from '@mui/material';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useEffect, useMemo, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {H2, H3} from '../../../@softbd/elements/common';
import SearchIcon from '@mui/icons-material/Search';
import {
  useFetchInstitutesGallery,
  useFetchInstitutesGalleryCategory,
} from '../../../services/instituteManagement/hooks';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import makeStyles from '@mui/styles/makeStyles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import GalleryItemCardView from './GalleryItemCardView';

const useStyles = makeStyles((theme: CremaTheme) => ({
  searchIcon: {
    position: 'absolute',
    right: 0,
  },
  filterIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  resetButton: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '3% !important',
    },
  },
}));

const InstituteGallery = () => {
  const {messages} = useIntl();
  const classes = useStyles();

  const {data: galleryCategories, isLoading: isLoadingGalleryCategories} =
    useFetchInstitutesGalleryCategory();

  const {data: galleryItems} = useFetchInstitutesGallery();

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
    getValues,
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
    reset({
      gallery_category_id: '',
      gallery_id: '',
    });
  }, [reset]);

  const onChangeCategory = () => {
    filterVidesByInput({
      gallery_category_id: getValues('gallery_category_id'),
      gallery_id: '',
    });
  };

  const filterVidesByInput = ({gallery_category_id, gallery_id}: any) => {
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
  };

  const onSearch: SubmitHandler<any> = async (data: any) => {
    let filter = filteredGalleryItems?.filter((item: any) =>
      item.title.toLowerCase().includes(data.title),
    );
    let newArr = [...filter];
    setFilteredGalleryItems(newArr);
  };

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <Paper>
            <H3 py={3} fontWeight={'bold'}>
              {messages['gallery-albums.institute']}
            </H3>
          </Paper>
        </Grid>
      </Grid>
      <Container maxWidth='lg'>
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
                  id='gallery_category_id'
                  label={messages['gallery_category.institute']}
                  isLoading={isLoadingGalleryCategories}
                  control={control}
                  optionValueProp={'id'}
                  options={galleryCategories}
                  optionTitleProp={['gallery_category']}
                  onChange={onChangeCategory}
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
      </Container>
    </>
  );
};

export default InstituteGallery;
