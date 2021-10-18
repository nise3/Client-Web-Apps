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
import {useFetchInstitutesGallery} from '../../../services/instituteManagement/hooks';

const InstituteGallery = () => {
  /*let cardData = [
    {
      id: 1,
      content: 'বিটাক টেইনিং নিলে টেইনিং শেষই মিলবে চাকরি ১',
      type: 'training',
    },
    {
      id: 2,
      content: 'বিটাক টেইনিং নিলে টেইনিং শেষই মিলবে চাকরি ২',
      type: 'training',
    },
    {
      id: 3,
      content: 'বিটাক টেইনিং নিলে টেইনিং শেষই মিলবে চাকরি ৩',
      type: 'training',
    },
    {
      id: 4,
      content: 'বিটাক টেইনিং নিলে টেইনিং শেষই মিলবে চাকরি ৪',
      type: 'training',
    },
    {
      id: 5,
      content: 'বিটাক টেইনিং নিলে টেইনিং শেষই মিলবে চাকরি 5',
      type: 'training non',
    },
    {
      id: 6,
      content: 'বিটাক টেইনিং নিলে টেইনিং শেষই মিলবে চাকরি 6',
      type: 'training non',
    },
    {
      id: 7,
      content: 'বিটাক টেইনিং নিলে টেইনিং শেষই মিলবে চাকরি 7',
      type: 'training non',
    },
    /!*{
      id: 8,
      content: 'বিটাক টেইনিং নিলে টেইনিং শেষই মিলবে চাকরি ৪',
      type: 'training non',
    },*!/
  ];*/

  const {data: galleryData, isLoading: isLoadingInstitutesGallery} =
    useFetchInstitutesGallery();
  console.log('gallery->', galleryData);
  console.log('isLoading->', isLoadingInstitutesGallery);

  const [cardsData, setCardData] = useState(galleryData);
  console.log('cardsdata->', cardsData);

  const {messages} = useIntl();
  const [itemData, setItemData] = useState<any>('');

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      video_category: yup
        .string()
        .label(messages['recipient.institute'] as string),
      select_video: yup.string().label(messages['common.name'] as string),
    });
  }, [messages]);

  const {reset, control} = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setItemData({
      video_category: '',
      select_video: '',
    });
  }, []);

  useEffect(() => {
    reset({
      video_category: itemData.video_category,
      select_video: itemData.select_video,
    });
  }, [itemData.select_video, itemData.video_category, reset]);

  const onChangeValue = (value: number) => {
    let filterData = cardsData?.filter((item: any) => item.id === value);
    let newArr = [...filterData];
    setCardData(newArr);
  };
  const onChangeCategory = (value: any) => {
    let filterData = cardsData?.filter((item: any) => item.type === value);
    let newArr = [...filterData];
    setCardData(newArr);
  };

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <Paper>
            <H2 py={5}>ভিডিও সমূহ</H2>
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
                  id='id'
                  label='ভিডি ক্যাটাগরি'
                  isLoading={false}
                  control={control}
                  optionValueProp={'id'}
                  options={cardsData}
                  optionTitleProp={['video_category']}
                  onChange={onChangeCategory}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomFormSelect
                  id='id'
                  label='ভিডিও সমূহ'
                  isLoading={isLoadingInstitutesGallery}
                  control={control}
                  optionValueProp={'id'}
                  options={cardsData}
                  optionTitleProp={['content']}
                  onChange={onChangeValue}
                />
              </Grid>
              <Grid item xs={12} md={1}>
                <Button variant={'contained'} color={'primary'}>
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
                  মোট ফলাফল পাওয়া গেছে <Chip label={'15'} color={'primary'} />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={5}>
                  {cardsData?.map((data: any) => {
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
                              image='https://images.unsplash.com/photo-1627625598560-1874d7f06a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
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
            <Pagination count={4} variant='outlined' color='primary' />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default InstituteGallery;
