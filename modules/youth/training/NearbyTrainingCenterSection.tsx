import React, {useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import useStyles from './index.style';
import {useIntl} from 'react-intl';
import TrainingCenterCard from './conponents/TrainingCenterCard';
import {useFetchTrainingCenters} from '../../../services/youthManagement/hooks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';

const NearbyTrainingCenterSection = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  const authUser = useAuthUser<YouthAuthUser>();
  const [nearbyTrainingCenterFilters] = useState<any>({
    district_id: authUser?.loc_district_id,
    upazila_id: authUser?.loc_upazila_id,
    page_size: 4,
  });

  const {data: nearbyTrainingCenters} = useFetchTrainingCenters(
    nearbyTrainingCenterFilters,
  );

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={8} sm={9} md={10}>
            <Typography variant={'h5'} className={classes.sectionTitle}>
              {messages['common.nearby_training_center']}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={2} style={{textAlign: 'right'}}>
            <Button variant={'outlined'} size={'medium'} color={'primary'}>
              {messages['common.see_all']}
              <ChevronRight />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={5}>
          {nearbyTrainingCenters &&
            nearbyTrainingCenters.map((trainingCenter: any) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={trainingCenter.id}>
                  <TrainingCenterCard trainingCenter={trainingCenter} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NearbyTrainingCenterSection;
