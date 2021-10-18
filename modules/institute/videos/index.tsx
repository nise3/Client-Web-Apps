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
import {useFetchInstitutesVideos} from '../../../services/instituteManagement/hooks';

const InstituteVideos = () => {
  const {data: videoData, isLoading: isLoadingInstitutesVideo} =
    useFetchInstitutesVideos();

  const [filteringData, setFilteringData] = useState([]);
  const [cardsData, setCardData] = useState(videoData);

  const {messages} = useIntl();
  const [itemData, setItemData] = useState<any>('');
  const [isFiltered, setIsFiltered] = useState(false);

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

  const onResetClicked = () => {
    setCardData(videoData);
  };

  useEffect(() => {
    setCardData(videoData);
  }, [videoData]);

  useEffect(() => {
    setFilteringData(videoData);
  }, [videoData, isFiltered]);

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
    let filterData = filteringData?.filter((item: any) => item.id === value);
    let newArr = [...filterData];
    setCardData(newArr);
    setIsFiltered((prevCheck) => !prevCheck);
  };
  const onChangeCategory = (value: any) => {
    let filterData = filteringData?.filter(
      (item: any) => item.video_category === value,
    );
    let newArr = [...filterData];
    setCardData(newArr);
    setIsFiltered((prevCheck) => !prevCheck);
  };

  const searchData = (event: any) => {
    let filters = event.target.value.toLowerCase();
    let filterData = filteringData?.filter((item: any) =>
      item.title.toLowerCase().includes(filters),
    );
    let newArr = [...filterData];
    setCardData(newArr);
    setIsFiltered((prevCheck) => !prevCheck);
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
                  isLoading={isLoadingInstitutesVideo}
                  control={control}
                  optionValueProp={'video_category'}
                  options={filteringData}
                  optionTitleProp={['video_category']}
                  onChange={onChangeCategory}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomFormSelect
                  id='id'
                  label='ভিডিও সমূহ'
                  isLoading={isLoadingInstitutesVideo}
                  control={control}
                  optionValueProp={'id'}
                  options={filteringData}
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
                    onChange={searchData}
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
                  <Chip label={cardsData?.length} color={'primary'} />
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
            <Pagination
              count={Math.ceil(cardsData?.length / 4)}
              variant='outlined'
              color='primary'
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default InstituteVideos;
