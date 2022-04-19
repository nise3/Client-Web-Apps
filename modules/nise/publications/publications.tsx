import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Box, Container, Grid, Stack} from '@mui/material';
import {H3, Link} from '../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import BoxCardsSkeleton from '../../institute/Components/BoxCardsSkeleton';
import {useFetchPublicPublications} from '../../../services/cmsManagement/hooks';
import {
  getFilteredQueryParams,
  objectFilter,
} from '../../../@softbd/utilities/helpers';
import {useRouter} from 'next/router';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import CustomPaginationWithPageNumber from '../../youth/training/components/CustomPaginationWithPageNumber';
import PublicationCardComponent from '../../../@softbd/elements/PublicationCardComponent';
import {useIntl} from 'react-intl';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';

const PREFIX = 'CourseList';

export const classes = {
  header: `${PREFIX}-header`,
  paginationBox: `${PREFIX}-paginationBox`,
};

export const StyledContainer = styled(Container)(({theme}) => ({
  padding: '20px',
  [`& .${classes.header}`]: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  [`& .${classes.paginationBox}`]: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Publications = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const page = useRef<any>(1);
  const authUser = useAuthUser<YouthAuthUser>();

  const [publicationsFilters, setPublicationsFilters] = useState({});

  const {
    data: publicationList,
    isLoading,
    metaData,
  } = useFetchPublicPublications(publicationsFilters);

  const urlParamsUpdate = (params: any) => {
    router.push(
      {
        pathname: router.pathname,
        query: params,
      },
      undefined,
      {shallow: true},
    );
  };

  useEffect(() => {
    let params: any = {
      page_size: PageSizes.EIGHT,
    };

    let modifiedParams = getFilteredQueryParams(
      router.query,
      PageSizes.EIGHT,
      page.current,
    );

    if (Object.keys(modifiedParams).length > 0) urlParamsUpdate(modifiedParams);
    params = {
      ...params,
      ...modifiedParams,
    };
    if (modifiedParams.page) {
      page.current = modifiedParams.page;
    }

    setPublicationsFilters(objectFilter(params));
  }, [authUser]);

  useEffect(() => {
    if (
      Number(router.query?.page) &&
      metaData &&
      metaData.total > 0 &&
      metaData.total_page < Number(router.query.page)
    ) {
      page.current = 1;
      setPublicationsFilters((prev: any) => ({
        ...prev,
        page: page.current,
      }));
      urlParamsUpdate({...router.query, page: page.current});
    }
  }, [metaData, router.query]);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPublicationsFilters((prev: any) => ({
        ...prev,
        page_size: event.target.value ? event.target.value : PageSizes.EIGHT,
      }));
      urlParamsUpdate({...router.query, page_size: event.target.value});
    },
    [router.query],
  );

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setPublicationsFilters((params: any) => {
      return {...params, ...{page: currentPage}};
    });
    urlParamsUpdate({...router.query, page: currentPage});
  }, []);

  return (
    <>
      <StyledContainer>
        <H3 sx={{marginBottom: '15px'}}>{messages['menu.publications']}</H3>
        {isLoading ? (
          <BoxCardsSkeleton />
        ) : publicationList && publicationList.length > 0 ? (
          <Grid container spacing={3}>
            {publicationList.map((publication: any) => {
              return (
                <Grid item xs={12} md={3} key={publication.id}>
                  <Link href={`/publication-details/${publication.id}`}>
                    <PublicationCardComponent publication={publication} />
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <NoDataFoundComponent
            messageType={messages['publication.label']}
            messageTextType={'h6'}
          />
        )}

        {metaData && metaData.total_page && metaData.total_page > 1 && (
          <Box className={classes.paginationBox}>
            <Stack spacing={2}>
              <CustomPaginationWithPageNumber
                count={metaData.total_page}
                currentPage={1}
                queryPageNumber={page.current}
                onPaginationChange={onPaginationChange}
                rowsPerPage={Number(router.query.page_size)}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Stack>
          </Box>
        )}
      </StyledContainer>
    </>
  );
};

export default Publications;
