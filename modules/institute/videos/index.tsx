import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Grid,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Pagination,
  Container,
  Chip,
  IconButton,
} from '@mui/material';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useEffect, useMemo, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {yupResolver} from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import yup from '../../../@softbd/libs/yup';
import {H2, Link} from '../../../@softbd/elements/common';
import {
  useFetchInstitutesVideoCategory,
  useFetchInstitutesVideos,
} from '../../../services/instituteManagement/hooks';
import makeStyles from '@mui/styles/makeStyles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useRouter} from 'next/router';

const useStyles = makeStyles((theme: CremaTheme) => ({
  searchIcon: {
    position: 'absolute',
    right: 20,
  },
}));

const InstituteVideos = () => {
  const {messages} = useIntl();
  const classes = useStyles();
  const router = useRouter();
  const path = router.pathname;

  const {data: videoItems, isLoading: isLoadingInstitutesVideo} =
    useFetchInstitutesVideos();

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

  const onChangeValue = (value: number) => {
    filterVideosByInput(getValues());
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
            <H2 py={5}>{messages['videos.institute']}</H2>
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
                    <Typography>{messages['filter.institute']}</Typography>
                  </Grid>
                </Grid>
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
              <Grid item xs={12} md={3}>
                <CustomFormSelect
                  id='video_id'
                  label={messages['videos.institute']}
                  isLoading={isLoadingInstitutesVideo}
                  control={control}
                  optionValueProp={'id'}
                  options={filteredVideoItems}
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
                          </Link>
                        </Grid>
                      );
                    })}
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
            <Pagination count={3} variant='outlined' color='primary' />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default InstituteVideos;
