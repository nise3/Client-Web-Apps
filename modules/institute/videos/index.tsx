import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Grid,
  Typography,
  Button,
  Paper,
  InputBase,
  IconButton,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Pagination,
  Container,
  Box,
} from '@mui/material';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import React, {useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {yupResolver} from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import makeStyles from '@mui/styles/makeStyles';
import yup from '../../../@softbd/libs/yup';
import {H2} from '../../../@softbd/elements/common';

const useStyles = makeStyles((theme) => {
  return {
    typographyNumber: {
      color: theme.palette.primary.dark,
      marginLeft: '5px',
      backgroundColor: theme.palette.primary.light,
      padding: '0 5px',
    },
    cardMainGrid: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    filterMainGrid: {
      marginRight: 'auto',
      marginLeft: 'auto',
      justifyContent: 'space-between',
    },
    heading: {
      boxShadow: '0px 2px 2px #8888',
      padding: '40px 0px',
    },
  };
});

const InstituteVideos = () => {
  let cardData = [
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
    /*{
      id: 8,
      content: 'বিটাক টেইনিং নিলে টেইনিং শেষই মিলবে চাকরি ৪',
      type: 'training non',
    },*/
  ];

  const [cardsData, setCardData] = useState(cardData);

  const {messages} = useIntl();
  const [itemData, setItemData] = useState<any>('');
  const classes = useStyles();

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
    let filterData = cardData.filter((item) => item.id === value);
    let newArr = [...filterData];
    setCardData(newArr);
  };
  const onChangeCategory = (value: any) => {
    let filterData = cardData.filter((item) => item.type === value);
    let newArr = [...filterData];
    setCardData(newArr);
  };

  return (
    <Grid sx={{maxWidth: '100%'}}>
      <Grid textAlign={'center'} className={classes.heading}>
        <H2>ভিডিও সমূহ</H2>
      </Grid>
      <Container maxWidth='xl'>
        <Grid container>
          <Grid
            item
            md={12}
            xs={12}
            display={'flex'}
            justifyContent={'space-around'}
            alignContent={'center'}>
            <Box display={'flex'} justifyContent={'space-around'}>
              <FilterListIcon />
              <Typography>ফিল্টার</Typography>
            </Box>
            <CustomFormSelect
              id='id'
              label='ভিডি ক্যাটাগরি'
              isLoading={false}
              control={control}
              optionValueProp={'type'}
              options={cardData}
              optionTitleProp={['type']}
              onChange={onChangeCategory}
            />
            <CustomFormSelect
              id='id'
              label='ভিডিও সমূহ'
              isLoading={false}
              control={control}
              optionValueProp={'id'}
              options={cardData}
              optionTitleProp={['content']}
              onChange={onChangeValue}
            />
            <Button variant={'contained'} color={'primary'}>
              Reset
            </Button>
            <Paper
              component='form'
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                height: 40,
              }}>
              <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder='অনুসন্ধান করুন'
                inputProps={{'aria-label': 'search google maps'}}
              />
              <IconButton type='submit' sx={{p: '10px'}} aria-label='search'>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>

        <Grid container mt={8}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              variant='h6'
              component='div'
              display={'flex'}>
              মোট ফলাফল পাওয়া গেছে
              <Typography
                variant='h6'
                component='div'
                className={classes.typographyNumber}>
                ১৫
              </Typography>
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {cardsData.map((data: any) => {
            return (
              <Grid item md={3} justifyContent={'center'} mt={3} key={data.id}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='140'
                      image='https://images.unsplash.com/photo-1627625598560-1874d7f06a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
                      alt='random image'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='body1' component='div'>
                        {data?.content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Grid>
          <Grid mt={5} display={'flex'} justifyContent={'center'}>
            <Pagination count={10} variant='outlined' color='primary' />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default InstituteVideos;
