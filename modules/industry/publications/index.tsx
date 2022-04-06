import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Box,
  Chip,
  Container,
  Grid,
  Pagination,
  Skeleton,
  Stack,
} from '@mui/material';
import {Body2, H1, Link} from '../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';
import {useFetchPublications} from '../../../services/IndustryManagement/hooks';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import PublicationListSearchSection from './PublicationListSearchSection';
import CardMediaImageView from '../../../@softbd/elements/display/ImageView/CardMediaImageView';

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
  const {messages, formatNumber} = useIntl();
  const result = useCustomStyle();
  const [selectedWriter, setSelectedWriter] = useState<any>('');
  const [uniqueAuthors, setUniqueAuthors] = useState<any>([]);

  const [publicationFilter, setPublicationFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
    page: 1,
    page_size: PageSizes.EIGHT,
  });

  const {
    data: publications,
    isLoading,
    metaData,
  } = useFetchPublications(publicationFilter);

  useEffect(() => {
    const uniqueAuthorsSet = [
      ...new Map(
        publications?.map((item: any) => [item['author'], item]),
      ).values(),
    ];
    setUniqueAuthors(uniqueAuthorsSet);
  }, [publications]);

  const page = useRef<any>(1);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setPublicationFilter((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);

  useEffect(() => {
    page.current = 1;
    setPublicationFilter((param: any) => {
      return objectFilter({...param, author: selectedWriter});
    });
  }, [selectedWriter]);

  const setWriterName = (value: string) => {
    setSelectedWriter(value);
  };

  const filterPublication = useCallback((filterKey: any, filterValue: any) => {
    const newFilter: any = {};
    newFilter[filterKey] = filterValue;

    setPublicationFilter((prev: any) => {
      return objectFilter({...prev, ...newFilter});
    });
  }, []);

  return (
    <>
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <H1
            pt={3}
            sx={{
              ...result.h2,
              fontWeight: 'bold',
            }}>
            {messages['industry.publications']}
          </H1>
        </Grid>
      </Grid>
      <StyledContainer maxWidth='lg' sx={{marginBottom: '25px'}}>
        <Grid container mt={3} spacing={2}>
          <Grid item md={12}>
            <PublicationListSearchSection
              addFilterKey={filterPublication}
              defaultValue={selectedWriter}
              label={messages['industry.writer_name'] as string}
              onChange={setWriterName}
              optionValueProp={'author'}
              options={uniqueAuthors}
              optionTitleProp={['author']}
            />
          </Grid>
          <Grid item md={12} mt={{xs: 4, md: 5}}>
            <Grid container>
              <Grid item xs={12}>
                <Body2
                  gutterBottom
                  sx={{fontWeight: 'bold', display: 'inline-block'}}>
                  {messages['total_result.institute']}{' '}
                </Body2>
                <Chip
                  label={
                    publications && publications?.length
                      ? formatNumber(publications?.length)
                      : formatNumber(0)
                  }
                  className={classes.chipStyle}
                />
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
                          key={publication.id}
                          item
                          md={3}
                          xs={12}
                          justifyContent={'center'}
                          mt={3}>
                          <Link href={`/publications/${publication.id}`}>
                            <Box
                              className={classes.imageBox}
                              sx={{maxWidth: 150}}>
                              <CardMediaImageView
                                height='227'
                                image={publication?.image_path}
                                alt='publication'
                              />
                            </Box>
                            <Box sx={{width: '150px'}} mt={1}>
                              <Body2 className={classes.title}>
                                {publication?.title}
                              </Body2>
                            </Box>
                          </Link>
                        </Grid>
                      );
                    })
                  ) : (
                    <Grid item xs={12}>
                      <NoDataFoundComponent
                        messageType={messages['publication.label']}
                      />
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
