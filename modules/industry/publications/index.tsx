import React, {useCallback, useContext, useState} from 'react';
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {Body2, H1, Link} from '../../../@softbd/elements/common';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';
import clsx from 'clsx';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';
import {useFetchPublications} from '../../../services/IndustryManagement/hooks';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';
import AppContext from '../../../@crema/utility/AppContext';
import AppLocale from '../../../shared/localization';
import typography from '../../../@softbd/layouts/themes/default/typography';

const PREFIX = 'Publications';
const classes = {
  resetButton: `${PREFIX}-resetButton`,
  cardTitle: `${PREFIX}-cardTitle`,
  gridMargin: `${PREFIX}-gridMargin`,
  selectStyle: `${PREFIX}-selectStyle`,
  chipStyle: `${PREFIX}-chipStyle`,
  imageBox: `${PREFIX}-imageBox`,
  searchItem: `${PREFIX}-searchItem`,
  title: `${PREFIX}-title`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.resetButton}`]: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '3% !important',
    },
  },
  [`& .${classes.cardTitle}`]: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  [`& .${classes.chipStyle}`]: {
    color: theme.palette.primary.light,
    padding: '3px 7px',
    marginLeft: '10px',
  },
  [`& .${classes.gridMargin}`]: {
    marginLeft: '15px',
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
      marginTop: '15px',
    },
  },
  [`& .${classes.searchItem}`]: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'end',
    },
  },
  [`& .${classes.selectStyle}`]: {
    minWidth: '220px',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  [`& .${classes.title}`]: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  [`& .${classes.imageBox}`]: {
    position: 'relative',
    boxShadow: '0px 0px 3px 1px #9e9e9e',
    [`&::after`]: {
      content: '""',
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      backgroundImage:
        'linear-gradient(to right, transparent 2%, #0000001f 3%, #00000059 4%, transparent 5%)',
    },
  },
}));

const Publications = () => {
  const {messages} = useIntl();
  const theme = useTheme();
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];
  const result = typography(theme, currentAppLocale.locale);
  const [publicationFilter] = useState<any>({});
  const {data: publications} = useFetchPublications(publicationFilter);
  const onResetClicked = useCallback(() => {}, []);
  const onChangeWriter = useCallback((writerId: number | null) => {}, []);
  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <H1
            py={3}
            sx={{
              ...result.h2,
              fontWeight: 'bold',
            }}>
            {messages['industry.publications']}
          </H1>
        </Grid>
      </Grid>
      <StyledContainer maxWidth='lg' sx={{marginBottom: '25px'}}>
        <Grid container mt={4} spacing={2}>
          <Grid item md={6} xs={12}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                md={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Box display={'flex'}>
                  <FilterListIcon />
                  <Typography sx={{marginLeft: '15px'}}>
                    {messages['filter.institute']}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomFilterableSelect
                  id='writer_id'
                  label={messages['industry.writer_name']}
                  defaultValue={''}
                  isLoading={false}
                  optionValueProp={'id'}
                  options={[]}
                  optionTitleProp={['title']}
                  onChange={onChangeWriter}
                  className={clsx(classes.gridMargin, classes.selectStyle)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  onClick={onResetClicked}
                  variant={'contained'}
                  size={'small'}
                  color={'primary'}
                  className={classes.gridMargin}
                  sx={{height: '40px'}}>
                  {messages['common.reset']}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12} className={classes.searchItem}>
            <Paper
              style={{
                display: 'flex',
                width: 220,
                height: '40px',
              }}
              className={classes.gridMargin}>
              <InputBase
                size={'small'}
                style={{
                  paddingLeft: '20px',
                }}
                placeholder={messages['common.search'] as string}
                inputProps={{'aria-label': 'Search'}}
                onKeyDown={(event) => {
                  /*   if (event.code == 'Enter') onSearch();*/
                }}
              />
              <IconButton sx={{p: '5px'}} aria-label='search'>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>

          <Grid item md={12} mt={{xs: 4, md: 5}}>
            <Grid container>
              <Grid item xs={12}>
                <Body2 gutterBottom>
                  {messages['total_result.institute']}{' '}
                  <Chip label={'4'} className={classes.chipStyle} />
                </Body2>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {publications && publications?.length ? (
                    publications.map((publication: any) => {
                      return (
                        <Grid
                          item
                          md={3}
                          xs={12}
                          justifyContent={'center'}
                          mt={3}
                          key={publication.id}>
                          <Box
                            className={classes.imageBox}
                            sx={{maxWidth: 150}}>
                            <CardMedia
                              component='img'
                              height='227'
                              image='/images/testPublication.png'
                              alt='publication'
                            />
                          </Box>
                          <Box sx={{width: '150px'}} mt={1}>
                            <Link href={`/publications/${publication.id}`}>
                              <Body2 className={classes.title}>
                                {publication?.title}
                              </Body2>
                            </Link>
                          </Box>
                        </Grid>
                      );
                    })
                  ) : (
                    <Grid item xs={12}>
                      <NoDataFoundComponent />
                    </Grid>
                  )}
                  <Grid
                    item
                    md={12}
                    mt={4}
                    display={'flex'}
                    justifyContent={'center'}>
                    <Stack spacing={2}>
                      <Pagination
                        page={1}
                        count={3}
                        color={'primary'}
                        shape='rounded'
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default Publications;
