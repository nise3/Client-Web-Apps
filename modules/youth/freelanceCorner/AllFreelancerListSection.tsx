import React from 'react';
import {Box, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import FreelancerCardComponent from './components/FreelancerCardComponent';
import {useFetchYouths} from '../../../services/youthManagement/hooks';

const AllFreelancerListSection = () => {
  const {messages} = useIntl();
  const {data: freelancerLists} = useFetchYouths();
  console.log('freelancerLists', freelancerLists);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{fontSize: 17, fontWeight: 'bold'}}>
          {messages['common.all']}
        </Box>
      </Grid>

      {freelancerLists?.map((freelancer: any) => {
        return (
          <Grid item xs={12} sm={12} md={12} key={freelancer.id}>
            <FreelancerCardComponent freelancer={freelancer} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AllFreelancerListSection;
