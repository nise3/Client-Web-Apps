import React, {useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import TrainingCenterCard from './components/TrainingCenterCard';
import {useFetchPublicTrainingCenters} from '../../../services/youthManagement/hooks';
import {useAuthUser, useVendor} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import BoxCardsSkeleton from '../../institute/Components/BoxCardsSkeleton';

const NearbyTrainingCenterSection = () => {
  const {messages} = useIntl();
  const vendor = useVendor();
  const authUser = useAuthUser<YouthAuthUser>();
  const [institute] = useState<any>(vendor);

  const [nearbyTrainingCenterFilters] = useState<any>({
    institute_id: institute?.id,
    district_id: authUser?.loc_district_id,
    upazila_id: authUser?.loc_upazila_id,
    page_size: 4,
  });

  const {
    data: nearbyTrainingCenters,
    isLoading: isLoadingNearbyTrainingCenter,
  } = useFetchPublicTrainingCenters(nearbyTrainingCenterFilters);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={6} sm={9} md={10}>
            <Typography color={'primary'} variant={'h5'} fontWeight={'bold'}>
              {messages['common.nearby_training_center']}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2} style={{textAlign: 'right'}}>
            <Button variant={'outlined'} size={'medium'} color={'primary'}>
              {messages['common.see_all']}
              <ChevronRight />
            </Button>
          </Grid>
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
            </>
          ) : (
            <NoDataFoundComponent />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NearbyTrainingCenterSection;
