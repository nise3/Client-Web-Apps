import React from 'react';
import {useIntl} from 'react-intl';
import {Box, Grid} from '@mui/material';
import FeaturedFreelancerComponent from './components/FeaturedFreelancerComponent';

const FeaturedFreelanceSection = () => {
  const {messages} = useIntl();

  const items = [
    {
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Jamal khan',
      designation: 'Graphic Designer',
    },
    {
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Noman khan',
      designation: 'UX Designer',
    },
    {
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Jesmin Rahman',
      designation: 'Graphic Designer',
    },
    {
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Imtiaz Ahmed',
      designation: 'UI Designer',
    },
  ];

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={12}>
          <Box sx={{fontSize: 17, fontWeight: 'bold'}}>
            {messages['freelance_corner.featured_freelance']}
          </Box>
        </Grid>
        {items.map((user: any, index: number) => {
          return (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <FeaturedFreelancerComponent freelanceUser={user} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default FeaturedFreelanceSection;
