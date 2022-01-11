import React, {useCallback, useRef, useState} from 'react';
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
  Skeleton,
  Stack,
  Typography,
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
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';
import RowStatus from '../../../@softbd/utilities/RowStatus';

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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
  const result = useCustomStyle();

  // Todo: industry_association_id is static have to change after created id
  const [publicationFilter, setPublicationFilter] = useState<any>({
    // industry_association_id: 1,
    row_status: RowStatus.ACTIVE,
    page: 1,
    page_size: 8,
  });

  const {
    data: publications,
    isLoading,
    metaData,
  } = useFetchPublications(publicationFilter);

  const inputFieldRef = useRef<any>();
  const page = useRef<any>(1);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setPublicationFilter((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);

  const onResetClicked = useCallback(() => {
    setPublicationFilter({
      // industry_association_id: 1,
      row_status: RowStatus.ACTIVE,
      page: 1,
      page_size: 8,
    });
  }, []);

  const onSearchAuthor = useCallback((input: string) => {
    setPublicationFilter((param: any) => {
      return {...param, ...{author: input}};
    });
  }, []);

  const onSearch = useCallback(() => {
    setPublicationFilter((param: any) => {
      return {...param, ...{title: inputFieldRef.current?.value}};
    });
  }, []);

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
                  <Typography sx={{marginLeft: '15px', fontWeight: 'bold'}}>
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
                  optionValueProp={'author'}
                  options={publications}
                  optionTitleProp={['author']}
                  onChange={(value) => onSearchAuthor(value)}
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
                inputRef={inputFieldRef}
                onKeyDown={(event) => {
                  if (event.code == 'Enter') onSearch();
                }}
              />
              <IconButton
                sx={{p: '5px'}}
                aria-label='search'
                onClick={onSearch}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>

          <Grid item md={12} mt={{xs: 4, md: 5}}>
            <Grid container>
              <Grid item xs={12}>
                <Body2 gutterBottom sx={{fontWeight: 'bold'}}>
                  {messages['total_result.institute']}{' '}
                  <Chip
                    label={publications?.length}
                    className={classes.chipStyle}
                  />
                </Body2>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {isLoading ? (
                    <Grid
                      item
                      xs={12}
                      sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                      <Skeleton
                        variant='rectangular'
                        width={'22%'}
                        height={140}
                      />
                      <Skeleton
                        variant='rectangular'
                        width={'22%'}
                        height={140}
                      />
                      <Skeleton
                        variant='rectangular'
                        width={'22%'}
                        height={140}
                      />
                      <Skeleton
                        variant='rectangular'
                        width={'22%'}
                        height={140}
                      />
                    </Grid>
                  ) : publications && publications?.length ? (
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
                              image={publication.image_path}
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
                  {metaData.total_page > 1 && (
                    <Grid
                      item
                      md={12}
                      mt={4}
                      display={'flex'}
                      justifyContent={'center'}>
                      <Stack spacing={2}>
                        <Pagination
                          page={page.current}
                          count={metaData.total_page}
                          color={'primary'}
                          shape='rounded'
                          onChange={onPaginationChange}
                        />
                      </Stack>
                    </Grid>
                  )}
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
