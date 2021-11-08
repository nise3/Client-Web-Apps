import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
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
import SearchIcon from '@mui/icons-material/Search';
import yup from '../../../@softbd/libs/yup';
import {H3, Link} from '../../../@softbd/elements/common';
import {
  useFetchInstitutesVideoCategory,
  useFetchInstitutesVideos,
} from '../../../services/instituteManagement/hooks';
import makeStyles from '@mui/styles/makeStyles';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useRouter} from 'next/router';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';

const useStyles = makeStyles((theme) => ({
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

const InstituteVideos = () => {
  const {messages} = useIntl();
  const classes = useStyles();
  const router = useRouter();
  const path = router.pathname;

  const {data: videoItems} = useFetchInstitutesVideos();

  const {data: videoCategoryData, isLoading: isLoadingVideoCategory} =
    useFetchInstitutesVideoCategory();

  const [filteredVideoItems, setFilteredVideoItems] = useState([]);

  useEffect(() => {
    setFilteredVideoItems(videoItems);
  }, [videoItems]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      video_category_id: yup
        .string()
        .label(messages['recipient.institute'] as string),
      video_id: yup.string().label(messages['common.name'] as string),
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
    setFilteredVideoItems(videoItems);
  };

  useEffect(() => {
    reset({
      video_category_id: '',
      video_id: '',
    });
  }, [reset]);

  const filterVideosByInput = ({video_category_id, video_id}: any) => {
    if (video_category_id?.length == 0 && video_id?.length == 0) {
      setFilteredVideoItems(videoItems);
    } else {
      setFilteredVideoItems(
        videoItems?.filter((item: any) =>
          video_id
            ? item.id == video_id
            : item.video_category_id == video_category_id,
        ),
      );
    }
  };

  const onChangeCategory = () => {
    filterVideosByInput({
      video_category_id: getValues('video_category_id'),
      video_id: '',
    });
  };

  const onSearch: SubmitHandler<any> = async (data: any) => {
    let filter = filteredVideoItems?.filter((item: any) =>
      item.title.toLowerCase().includes(data.title),
    );
    let newArr = [...filter];
    setFilteredVideoItems(newArr);
  };

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <Paper>
            <H3 py={3} fontWeight={'bold'}>
              {messages['videos.institute']}
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
                  id='video_category_id'
                  label={messages['video_category.institute']}
                  isLoading={isLoadingVideoCategory}
                  control={control}
                  optionValueProp={'id'}
                  options={videoCategoryData}
                  optionTitleProp={['video_category']}
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
          {filteredVideoItems?.length > 0 ? (
            <Grid item md={12} mt={{xs: 4, md: 5}}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h6'>
                    {messages['total_result.institute']}{' '}
                    <Chip
                      label={filteredVideoItems?.length}
                      color={'primary'}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={5}>
                    {filteredVideoItems?.map((data: any) => {
                      return (
                        <Grid
                          item
                          md={3}
                          justifyContent={'center'}
                          mt={3}
                          key={data.id}>
                          <Link href={`${path}/${data.id}`}>
                            <Card>
                              <CardActionArea>
                                <CardMedia
                                  component='img'
                                  height='140'
                                  image={data.image_url}
                                  title={data?.title}
                                  alt={data?.title}
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
                          </Link>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <NoDataFoundComponent />
          )}

          <Grid item md={12} mt={4} display={'flex'} justifyContent={'center'}>
            <Pagination count={3} variant='outlined' shape='rounded' />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default InstituteVideos;
