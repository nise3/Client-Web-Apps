import React, {useEffect, useState} from 'react';
import {Box, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import FreelancerCardComponent from './components/FreelancerCardComponent';
import {useFetchYouths} from '../../../services/youthManagement/hooks';

interface AllFreelancerListSectionProps {
  skillIds?: Array<number>;
  searchText?: string;
  upazila_id?: number;
}

const AllFreelancerListSection = ({
  skillIds,
  searchText,
  upazila_id,
}: AllFreelancerListSectionProps) => {
  const {messages} = useIntl();
  const [filters, setFilters] = useState<any>({
    is_freelancer_profile: 1,
  });
  const {data: freelancerLists} = useFetchYouths(filters);

  useEffect(() => {
    setFilters({
      is_freelancer_profile: 1,
      skills: skillIds,
      search_text: searchText,
      upazila_id: upazila_id,
    });
  }, [skillIds, searchText, upazila_id]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
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
