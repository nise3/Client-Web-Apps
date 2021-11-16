import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Grid} from '@mui/material';
import FeatureJobComponent from './components/FeatureJobComponent';
import {useIntl} from 'react-intl';

const PREFIX = 'FeatureJobSection';

const classes = {
  featureSectionTitle: `${PREFIX}-featureSectionTitle`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.featureSectionTitle}`]: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}));

const FeatureJobSection = () => {
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
    <StyledGrid container spacing={2}>
      <Grid item xs={12}>
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
    </StyledGrid>
  );
};

export default FeatureJobSection;
