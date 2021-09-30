import React from 'react';
import {Box, Grid} from '@material-ui/core';
import FeatureJobComponent from './components/FeatureJobComponent';
import {makeStyles} from '@material-ui/styles';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyle = makeStyles((theme: CremaTheme) => ({
  featureSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  jobItem: {
    marginBottom: 10,
  },
}));

const FeatureJobSection = () => {
  const classes = useStyle();
  const items = [
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Article Writer',
      jobProviderName: 'Ispahani',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Sales Executive',
      jobProviderName: 'Ajker Deal',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Senior UX Designer',
      jobProviderName: 'Pathao',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Data Engineer',
      jobProviderName: 'Evaly',
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.featureSectionTitle}>Featured</Box>
        </Grid>
        {items.map((job: any, index: number) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              key={index}
              className={classes.jobItem}>
              <FeatureJobComponent data={job} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default FeatureJobSection;
