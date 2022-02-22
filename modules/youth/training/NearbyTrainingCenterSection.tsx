import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Grid, Pagination, Stack} from '@mui/material';
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

  const [nearbyTrainingCenterFilters, setNearbyTrainingCenterFilters] =
    useState<any>({
      district_id: authUser?.loc_district_id,
      upazila_id: authUser?.loc_upazila_id,
      page_size: showAllNearbyTrainingCenter ? PageSizes.EIGHT : PageSizes.FOUR,
    });

  const {
    data: nearbyTrainingCenters,
    isLoading: isLoadingNearbyTrainingCenter,
    metaData: trainingCentersMetaData,
  } = useFetchPublicTrainingCenters(nearbyTrainingCenterFilters);

  useEffect(() => {
    if (
      !Number(queryPageNumber) ||
      Number(queryPageNumber) < 0 ||
      Number(queryPageNumber) > trainingCentersMetaData.total_page
    ) {
      router.push(
        {
          pathname: router.pathname,
          query: {page: 1},
        },
        undefined,
        {shallow: true},
      );
    } else if (
      queryPageNumber &&
      Number(queryPageNumber) > 0 &&
      queryPageNumber < trainingCentersMetaData.total_page
    ) {
      router.push(
        {
          pathname: router.pathname,
          query: {page: queryPageNumber},
        },
        undefined,
        {shallow: true},
      );
    }
  }, [queryPageNumber, trainingCentersMetaData]);

  useEffect(() => {
    if (queryPageNumber) {
      setNearbyTrainingCenterFilters((params: any) => {
        return {...params, ...{page: router.query.page}};
      });
    }
  }, [queryPageNumber]);

  const page = useRef<any>(1);
  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    router.push(
      {
        pathname: router.pathname,
        query: {page: currentPage},
      },
      undefined,
      {shallow: true},
    );
  }, []);
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
                      <Pagination
                        page={
                          queryPageNumber
                            ? Number(queryPageNumber)
                            : page.current
                        }
                        count={trainingCentersMetaData.total_page}
                        color={'primary'}
                        shape='rounded'
                        onChange={onPaginationChange}
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
