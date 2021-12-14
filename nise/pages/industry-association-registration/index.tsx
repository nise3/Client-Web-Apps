import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import DefaultPage from '../../../@softbd/layouts/hoc/DefaultPage';
import {responsiveFontSizes, ThemeProvider} from '@mui/material';
import theme from '../../../@softbd/layouts/themes/nise';
import {useTheme} from '@mui/material/styles';

const IndustryRegistrationPage = asyncComponent(
  () =>
    import(
      '../../../modules/industryAssociationRegistration/IndustryAssociationRegistration'
    ),
);
export default DefaultPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.registration'] as string} />
      <ThemeProvider theme={responsiveFontSizes(theme(useTheme()))}>
        <IndustryRegistrationPage />
      </ThemeProvider>
    </>
  );
});
