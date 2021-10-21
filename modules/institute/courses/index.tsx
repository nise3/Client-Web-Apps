import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Grid,
  Typography,
  Button,
  Paper,
  InputBase,
  IconButton,
  Pagination,
  Container,
  Chip,
} from '@mui/material';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import React, {useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {yupResolver} from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import yup from '../../../@softbd/libs/yup';
import {H2} from '../../../@softbd/elements/common';

const courseList = [
  {
    id: 1,
    image: '/images/popular-course1.png',
    title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
    fee: '5,000',
    providerLogo: '/images/creative_it.jpeg',
    providerName: 'Diane Croenwett',
    createDate: 'Mar 19,2020',
    tags: ['2hr, 47 min', '24 lessons'],
  },
  {
    id: 2,
    image: '/images/popular-course1.png',
    title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
    fee: '5,000',
    providerLogo: '/images/creative_it.jpeg',
    providerName: 'Diane Croenwett',
    createDate: 'Mar 19,2020',
    tags: ['2hr, 47 min', '24 lessons'],
  },
  {
    id: 3,
    image: '/images/popular-course1.png',
    title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
    fee: '5,000',
    providerLogo: '/images/creative_it.jpeg',
    providerName: 'Diane Croenwett',
    createDate: 'Mar 19,2020',
    tags: ['2hr, 47 min', '24 lessons'],
  },
  {
    id: 4,
    image: '/images/popular-course1.png',
    title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
    fee: '5,000',
    providerLogo: '/images/creative_it.jpeg',
    providerName: 'Diane Croenwett',
    createDate: 'Mar 19,2020',
    tags: ['2hr, 47 min', '24 lessons'],
  },
];
const InstituteCourses = () => {
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

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <Paper>
            <H2 py={5}>পছন্দের কোর্স সমূহ</H2>
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
                  id='video_category'
                  label='কোর্সের নাম নির্বাচন করুন'
                  isLoading={false}
                  control={control}
                  optionValueProp={'id'}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomFormSelect
                  id='select_video'
                  label='প্রোগ্রাম নির্বাচন করুন'
                  isLoading={false}
                  control={control}
                  optionValueProp={'id'}
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
                  <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder='অনুসন্ধান করুন'
                    inputProps={{'aria-label': 'search google maps'}}
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
                  {courseList.map((course: any) => {
                    return (
                      <Grid
                        item
                        md={3}
                        justifyContent={'center'}
                        mt={3}
                        key={course.id}>
                        <CourseCardComponent course={course} />
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

export default InstituteCourses;
