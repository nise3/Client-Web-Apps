import React from 'react';
import {Box, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import FreelancerCardComponent from './components/FreelancerCardComponent';

const AllFreelancerListSection = () => {
  const {messages} = useIntl();

  const freelancerList = [
    {
      id: 1,
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Rakibul Islam',
      designation: 'Graphic Designer',
      description:
        'UX designer measure and potimise applications to improve cse of use experience by exploring many different approaches to solve end-user problems',
      skills: ['Graphic Design', 'Logo Design', 'Photoshop', 'Illustrator'],
    },
    {
      id: 2,
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Rakibul Islam',
      designation: 'Graphic Designer',
      description:
        'UX designer measure and potimise applications to improve cse of use experience by exploring many different approaches to solve end-user problems',
      skills: ['Graphic Design', 'Logo Design', 'Photoshop', 'Illustrator'],
    },
    {
      id: 3,
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Rakibul Islam',
      designation: 'Graphic Designer',
      description:
        'UX designer measure and potimise applications to improve cse of use experience by exploring many different approaches to solve end-user problems',
      skills: ['Graphic Design', 'Logo Design', 'Photoshop', 'Illustrator'],
    },
    {
      id: 4,
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Rakibul Islam',
      designation: 'Graphic Designer',
      description:
        'UX designer measure and potimise applications to improve cse of use experience by exploring many different approaches to solve end-user problems',
      skills: ['Graphic Design', 'Logo Design', 'Photoshop', 'Illustrator'],
    },
    {
      id: 5,
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Rakibul Islam',
      designation: 'Graphic Designer',
      description:
        'UX designer measure and potimise applications to improve cse of use experience by exploring many different approaches to solve end-user problems',
      skills: ['Graphic Design', 'Logo Design', 'Photoshop', 'Illustrator'],
    },
    {
      id: 6,
      image: '/images/userPageImages/profileImage.jpeg',
      name: 'Rakibul Islam',
      designation: 'Graphic Designer',
      description:
        'UX designer measure and potimise applications to improve cse of use experience by exploring many different approaches to solve end-user problems',
      skills: ['Graphic Design', 'Logo Design', 'Photoshop', 'Illustrator'],
    },
  ];

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{fontSize: 17, fontWeight: 'bold'}}>
          {messages['common.all']}
        </Box>
      </Grid>

      {freelancerList.map((freelancer: any, index) => {
        return (
          <Grid item xs={12} sm={12} md={12} key={index}>
            <FreelancerCardComponent freelancer={freelancer} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AllFreelancerListSection;
