import React, {useContext} from 'react';
import {styled} from '@mui/material/styles';
import {Grid, useTheme} from '@mui/material';
import FeatureJobComponent from './components/FeatureJobComponent';
import {useIntl} from 'react-intl';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';
import AppContext from '../../../@crema/utility/AppContext';
import AppLocale from '../../../shared/localization';
import typography from '../../../@softbd/layouts/themes/default/typography';
import {H2} from '../../../@softbd/elements/common';

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
  const theme = useTheme();
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];
  const result = typography(theme, currentAppLocale.locale);

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
