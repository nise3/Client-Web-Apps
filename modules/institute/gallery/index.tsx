import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Grid,
  Typography,
  Button,
  Paper,
  IconButton,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Pagination,
  Container,
  Chip,
  TextField,
} from '@mui/material';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import React, {useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {yupResolver} from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import yup from '../../../@softbd/libs/yup';
import {H2} from '../../../@softbd/elements/common';
import {
  useFetchInstitutesGallery,
  useFetchInstitutesGalleryCategory,
} from '../../../services/instituteManagement/hooks';

const InstituteGallery = () => {
  const {messages} = useIntl();

  const {data: galleryCategories, isLoading: isLoadingGalleryCategories} =
    useFetchInstitutesGalleryCategory();

  const {data: galleryItems, isLoading: isLoadingGalleryItems} =
    useFetchInstitutesGallery();

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

  const {reset, control, getValues} = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onResetClicked = () => {};

  useEffect(() => {
    reset({
      gallery_category_id: '',
      gallery_id: '',
    });
  }, [reset]);

  const onChangeCategory = () => {
    reset({
      gallery_id: '',
    });

    filterVidesByInput({
      gallery_category_id: getValues('gallery_category_id'),
      gallery_id: '',
    });
  };

  const onChangeValue = () => {
    filterVidesByInput(getValues());
  };

  const filterVidesByInput = ({gallery_category_id, gallery_id}: any) => {
    if (gallery_category_id?.length == 0 && gallery_id?.length == 0) {
      setFilteredGalleryItems(galleryItems);
    } else {
      setFilteredGalleryItems(
        galleryItems.filter((item: any) =>
          gallery_id
            ? item.id == gallery_id
            : item.gallery_category_id == gallery_category_id,
        ),
      );
    }
  };

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <Paper>
            <H2 py={5}>গ্যালারি সমূহ</H2>
          </Paper>
        </Grid>
      </Grid>
      <Container maxWidth='xl'>
        <Grid container mt={4} justifyContent={'center'}>
          <Grid item md={12}>
            <Grid container spacing={{xs: 2, md: 6}}>
              <Grid item xs={12} md={1}>
                <Grid container>
                  <Grid item md={6}>
                    <FilterListIcon />
                  </Grid>
                  <Grid item md={6}>
                    <Typography>ফিল্টার</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomFormSelect
                  id='gallery_category_id'
                  label='ভিডিও ক্যাটাগরি'
                  isLoading={isLoadingGalleryCategories}
                  control={control}
                  optionValueProp={'id'}
                  options={galleryCategories}
                  optionTitleProp={['gallery_category']}
                  onChange={onChangeCategory}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomFormSelect
                  id='gallery_id'
                  label='ভিডিও সমূহ'
                  isLoading={isLoadingGalleryItems}
                  control={control}
                  optionValueProp={'id'}
                  options={galleryItems}
                  optionTitleProp={['content']}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12} md={1}>
                <Button
                  onClick={onResetClicked}
                  variant={'contained'}
                  color={'primary'}>
                  Reset
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  component='form'
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    height: 40,
                  }}>
                  <TextField
                    id='name'
                    label='অনুসন্ধান করুন'
                    variant='outlined'
                  />
                  <IconButton
                    type='submit'
                    sx={{p: '10px'}}
                    aria-label='search'>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} mt={{xs: 4, md: 5}}>
            <Grid container>
              <Grid item xs={12}>
                <Typography gutterBottom variant='h6'>
                  মোট ফলাফল পাওয়া গেছে{' '}
                  <Chip
                    label={filteredGalleryItems?.length}
                    color={'primary'}
                  />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={5}>
                  {filteredGalleryItems?.map((data: any) => {
                    return (
                      <Grid
                        item
                        md={3}
                        justifyContent={'center'}
                        mt={3}
                        key={data.id}>
                        <Card>
                          <CardActionArea>
                            <CardMedia
                              component='img'
                              height='140'
                              image={data.image_url}
                              alt='random image'
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant='body1'
                                component='div'>
                                {data?.content}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12} mt={4} display={'flex'} justifyContent={'center'}>
            <Pagination count={3} variant='outlined' color='primary' />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default InstituteGallery;
