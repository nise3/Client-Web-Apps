import React from 'react';
import {Box, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../types/AppContextPropsType';
import JobPostBlock from './components/JobPostBlock';

const useStyle = makeStyles((theme: CremaTheme) => ({
  postSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
}));

const PostSection = () => {
  const classes = useStyle();

  const posts = [
    {
      postType: 1,
      title: 'Graphic Designer',
      ownerLogo: '/images/skill-matching-job1.jpg',
      ownerName: 'Teletalk',
      salaryRange: '30,000-40,000K',
      postDescription:
        'UX designer measure and potimise applications to improve cse of use experience by exploring many different approaches to solve end-user problems',
      location: 'Dhaka, Bangladesh',
      postTags: [
        {
          type: 1,
          name: '2 to 4 year Experience',
        },
        {
          type: 2,
          name: 'Bachelor degree in any discipline',
        },
      ],
    },
    {
      postType: 1,
      title: 'Graphic Designer',
      ownerLogo: '/images/skill-matching-job1.jpg',
      ownerName: 'Teletalk',
      salaryRange: '30,000-40,000K',
      postDescription:
        'UX designer measure and potimise applications to improve cse of use experience by exploring many different approaches to solve end-user problems',
      location: 'Dhaka, Bangladesh',
      postTags: [
        {
          type: 1,
          name: '2 to 4 year Experience',
        },
        {
          type: 2,
          name: 'Bachelor degree in any discipline',
        },
      ],
    },
  ];

  const generatePostByType = (post: any) => {
    if (post.postType == 1) {
      return <JobPostBlock postData={post} />;
    } else if (post.postType == 2) {
      return <></>;
    } else {
      return <></>;
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <Box className={classes.postSectionTitle}>Recent Posts</Box>
      </Grid>

      {posts.map((post: any, index) => {
        return (
          <Grid item xs={12} sm={12} md={12} key={index}>
            {generatePostByType(post)}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PostSection;
