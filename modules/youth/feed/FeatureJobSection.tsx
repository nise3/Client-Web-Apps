import React from 'react';
import {styled} from '@mui/material/styles';
import {Grid} from '@mui/material';
import FeatureJobComponent from './components/FeatureJobComponent';
import {useIntl} from 'react-intl';
import {H2} from '../../../@softbd/elements/common';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';

const PREFIX = 'FeatureJobSection';

const classes = {
  featureSectionTitle: `${PREFIX}-featureSectionTitle`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.featureSectionTitle}`]: {
    fontWeight: 'bold',
  },
}));

const FeatureJobSection = () => {
  const {messages} = useIntl();
  const result = useCustomStyle();

  const items = [
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Article Writer',
      jobProviderName: 'SOFT BD LTD',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Sales Executive',
      jobProviderName: 'Dream71 Bangladesh',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Senior UX Designer',
      jobProviderName: 'Tiger IT Bangladesh',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Data Engineer',
      jobProviderName: 'Brain Station 23 Limited',
    },
  ];

  return (
    <StyledGrid container spacing={2}>
      <Grid item xs={12}>
        <H2 sx={{...result.body1}} className={classes.featureSectionTitle}>
          {messages['common.featured']}
        </H2>
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
