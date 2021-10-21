import React from 'react';
import {Box, Grid} from '@mui/material';
import FeatureJobComponent from './components/FeatureJobComponent';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import {useIntl} from 'react-intl';

const useStyle = makeStyles((theme: CremaTheme) => ({
  featureSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
}));

const FeatureJobSection = () => {
  const classes = useStyle();
  const {messages} = useIntl();

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
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.featureSectionTitle}>
            {messages['common.featured']}
          </Box>
        </Grid>
        {items.map((job: any, index: number) => {
          return (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <FeatureJobComponent data={job} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default FeatureJobSection;
