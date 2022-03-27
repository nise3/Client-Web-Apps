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
import {
  getFilteredQueryParams,
  objectFilter,
} from '../../../@softbd/utilities/helpers';
import { urlParamsUpdate } from '../youthConstants';

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
  const page = useRef<any>(1);

  const [nearbyTrainingCenterFilters, setNearbyTrainingCenterFilters] =
    useState<any>(null);

  const {
    data: nearbyTrainingCenters,
    isLoading: isLoadingNearbyTrainingCenter,
    metaData: trainingCentersMetaData,
  } = useFetchPublicTrainingCenters(nearbyTrainingCenterFilters);

  useEffect(() => {
    let params: any = {
      district_id: authUser?.loc_district_id,
      upazila_id: authUser?.loc_upazila_id,
      page_size: showAllNearbyTrainingCenter ? PageSizes.EIGHT : PageSizes.FOUR,
    };

    if (showAllNearbyTrainingCenter) {
      let modifiedParams = getFilteredQueryParams(
        router.query,
        PageSizes.EIGHT,
        page.current,
      );

      if (Object.keys(modifiedParams).length > 0)
        urlParamsUpdate(router, modifiedParams);
      params = {...params, ...modifiedParams};
      if (modifiedParams.page) {
        page.current = modifiedParams.page;
      }
    }
    setNearbyTrainingCenterFilters(objectFilter(params));
  }, [authUser]);

  useEffect(() => {
    if (
      Number(router.query?.page) &&
      trainingCentersMetaData &&
      trainingCentersMetaData.total > 0 &&
      trainingCentersMetaData.total_page < Number(router.query.page)
    ) {
      page.current = 1;
      setNearbyTrainingCenterFilters((prev: any) => ({
        ...prev,
        page: page.current,
      }));
      urlParamsUpdate(router, {...router.query, page: page.current});
    }
  }, [trainingCentersMetaData, router]);

  const onPaginationChange = useCallback(
    (event: any, currentPage: number) => {
      page.current = currentPage;
      setNearbyTrainingCenterFilters((prev: any) => ({
        ...prev,
        page: currentPage,
      }));
      urlParamsUpdate(router, {...router.query, page: currentPage});
    },
    [router],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNearbyTrainingCenterFilters((prev: any) => ({
        ...prev,
        page_size: event.target.value
          ? event.target.value
          : showAllNearbyTrainingCenter
          ? PageSizes.EIGHT
          : PageSizes.FOUR,
      }));
      urlParamsUpdate(router, {...router.query, page_size: event.target.value});
    },
    [router],
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
                        queryPageNumber={page.current}
                        onPaginationChange={onPaginationChange}
                        rowsPerPage={Number(router.query.page_size)}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Stack>
                  </Grid>
                )}
            </>
          ) : (
            <NoDataFoundComponent
              messageType={messages['common.nearby_training_center']}
            />
          )}
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default NearbyTrainingCenterSection;
