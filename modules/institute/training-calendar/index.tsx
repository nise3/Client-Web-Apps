import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Grid,
  Typography,
  Button,
  Paper,
  InputBase,
  IconButton,
  Container,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import usePagination from '@mui/material/usePagination';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import React, {useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {yupResolver} from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import makeStyles from '@mui/styles/makeStyles';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import yup from '../../../@softbd/libs/yup';
import {H2} from '../../../@softbd/elements/common';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

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

const InstituteTrainingCalendar = () => {
  const {items} = usePagination({
    count: 10,
  });

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

  return (
    <Grid sx={{maxWidth: '100%'}}>
      <Grid textAlign={'center'} className={classes.heading}>
        <H2>পছন্দের কোর্স সমূহ</H2>
      </Grid>
      <Container maxWidth='lg'>
        <Grid>
          <Grid mt={12}>
            <Grid md={12} container className={classes.filterMainGrid}>
              <Grid item md={1}>
                <Grid container>
                  <Grid item md={2}>
                    <FilterListIcon />
                  </Grid>
                  <Grid ml={2} item md={2}>
                    <Typography ml={2}>ফিল্টার</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <CustomFormSelect
                  id='video_category'
                  label='কোর্সের নাম নির্বাচন করুন'
                  isLoading={false}
                  control={control}
                  optionValueProp={'id'}
                />
              </Grid>
              <Grid item md={3}>
                <CustomFormSelect
                  id='select_video'
                  label='প্রোগ্রাম নির্বাচন করুনf'
                  isLoading={false}
                  control={control}
                  optionValueProp={'id'}
                />
              </Grid>
              <Grid item md={1}>
                <Button variant={'contained'} color={'primary'}>
                  Reset
                </Button>
              </Grid>
              <Grid item md={3}>
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
          <Grid mt={8}>
            <Grid container md={12} className={classes.cardMainGrid}>
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
          <Grid mt={5} display={'flex'} justifyContent={'center'}>
            <nav>
              <List>
                {items.map(({page, type, selected, ...item}, index) => {
                  let children;
                  if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                    children = '…';
                  } else if (type === 'page') {
                    children = (
                      <button
                        type='button'
                        style={{
                          fontWeight: selected ? 'bold' : undefined,
                          padding: '10px',
                        }}
                        {...item}>
                        {page}
                      </button>
                    );
                  } else {
                    children = (
                      <button style={{padding: '10px'}} type='button' {...item}>
                        {type}
                      </button>
                    );
                  }
                  return <li key={index}>{children}</li>;
                })}
              </List>
            </nav>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default InstituteTrainingCalendar;
