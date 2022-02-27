import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Grid, Stack} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import TrainingCenterCard from './components/TrainingCenterCard';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import BoxCardsSkeleton from '../../institute/Components/BoxCardsSkeleton';
import {styled} from '@mui/material/styles';
import {H2, Link} from '../../../@softbd/elements/common';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import {useFetchPublicTrainingCenters} from '../../../services/instituteManagement/hooks';
import {useRouter} from 'next/router';
import CustomPaginationWithPageNumber from './components/CustomPaginationWithPageNumber';
import {objectFilter} from '../../../@softbd/utilities/helpers';

const PREFIX = 'NearbyTrainingCenterSection';

export const classes = {
  subHeader: `${PREFIX}-subHeader`,
};

export const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.subHeader}`]: {
    fontSize: '1.421875rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
}));

interface NearbyTrainingCenterSectionProps {
  showAllNearbyTrainingCenter: boolean;
}

const NearbyTrainingCenterSection = ({
  showAllNearbyTrainingCenter,
}: NearbyTrainingCenterSectionProps) => {
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();
  const router = useRouter();
  const {page: queryPageNumber} = router.query;
  // const {page_size: queryPageSize} = router.query;

  const [urlQuery, setUrlQuery] = useState<any>({});
  const page = useRef<any>(1);

  const [nearbyTrainingCenterFilters, setNearbyTrainingCenterFilters] =
    useState<any>({
      district_id: authUser?.loc_district_id,
      upazila_id: authUser?.loc_upazila_id,
    });

  const {
    data: nearbyTrainingCenters,
    isLoading: isLoadingNearbyTrainingCenter,
    metaData: trainingCentersMetaData,
  } = useFetchPublicTrainingCenters(nearbyTrainingCenterFilters);

  useEffect(() => {
    let queryObj: any = {};
    if (Number(router.query.page)) {
      queryObj['page'] = router.query.page;
    }

    if (Number(router.query.page_size)) {
      queryObj['page_size'] = router.query.page_size;
    } else {
      queryObj['page_size'] = showAllNearbyTrainingCenter
        ? PageSizes.EIGHT
        : PageSizes.FOUR;
    }

    setUrlQuery((params: any) => {
      return {...params, ...queryObj};
    });
  }, [router.query.page_size, router.query.page]);

  useEffect(() => {
    let params: any = {};
    params.page = Number(router.query.page);
    params.page_size = Number(router.query.page_size);
    params = objectFilter(params);

    if (
      params.page &&
      (params.page < 1 || params.page > trainingCentersMetaData.total_page)
    ) {
      params.page = 1;
    }

    if (
      params.page_size &&
      (params.page_size < 1 || params.page_size > trainingCentersMetaData.total)
    ) {
      params.page_size = trainingCentersMetaData.total;
    }

    if (
      params.page != router.query.page ||
      params.page_size != router.query.page_size
    ) {
      //change router
      router.push(
        {
          pathname: router.pathname,
          query: objectFilter(params),
        },
        undefined,
        {shallow: true},
      );
    }
  }, [trainingCentersMetaData]);

  useEffect(() => {
    setNearbyTrainingCenterFilters((params: any) => {
      return {
        ...params,
        ...objectFilter(urlQuery),
      };
    });
  }, [urlQuery]);

  const getFilteredQueryValues = useCallback(
    (page: number | null = null, pageSize: number | null = null) => {
      let filteredObj: any = {};
      if (page) {
        filteredObj.page = page;
      }
      if (pageSize) {
        filteredObj.page_size = pageSize;
      }

      return objectFilter(filteredObj);
    },
    [],
  );

  const onPaginationChange = useCallback(
    (event: any, currentPage: number) => {
      page.current = currentPage;
      router.push(
        {
          pathname: router.pathname,
          query: getFilteredQueryValues(
            currentPage,
            Number(router.query.page_size),
          ),
        },
        undefined,
        {shallow: true},
      );
    },
    [router.query],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let queryObj: any = {};
      queryObj.page = router.query.page;
      queryObj.page_size = event.target.value;
      queryObj = objectFilter(queryObj);

      router.push(
        {
          pathname: router.pathname,
          query: queryObj,
        },
        undefined,
        {shallow: true},
      );
    },
    [router.query],
  );

  return (
    <StyledGrid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={6} sm={9} md={10}>
            <H2 className={classes.subHeader}>
              {messages['common.nearby_training_center']}
            </H2>
          </Grid>
          {!showAllNearbyTrainingCenter && (
            <Grid item xs={6} sm={3} md={2} style={{textAlign: 'right'}}>
              <Link
                href={'/training/nearby-training-centers'}
                style={{display: 'inline-block'}}>
                <Button variant={'outlined'} size={'medium'} color={'primary'}>
                  {messages['common.see_all']}
                  <ChevronRight />
                </Button>
              </Link>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={3}>
          {isLoadingNearbyTrainingCenter ? (
            <Grid item xs={12}>
              <BoxCardsSkeleton />
            </Grid>
          ) : nearbyTrainingCenters && nearbyTrainingCenters.length ? (
            <>
              {nearbyTrainingCenters.map((trainingCenter: any) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={trainingCenter.id}>
                    <TrainingCenterCard trainingCenter={trainingCenter} />
                  </Grid>
                );
              })}
              {showAllNearbyTrainingCenter &&
                trainingCentersMetaData.total_page > 1 && (
                  <Grid
                    item
                    md={12}
                    mt={4}
                    display={'flex'}
                    justifyContent={'center'}>
                    <Stack spacing={2}>
                      <CustomPaginationWithPageNumber
                        count={trainingCentersMetaData.total_page}
                        currentPage={1}
                        queryPageNumber={Number(queryPageNumber)}
                        onPaginationChange={onPaginationChange}
                        rowsPerPage={Number(router.query.page_size)}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Stack>
                  </Grid>
                )}
            </>
          ) : (
            <NoDataFoundComponent />
          )}
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default NearbyTrainingCenterSection;
