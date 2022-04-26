import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import DefaultPage from '../../../@softbd/layouts/hoc/DefaultPage';
import {responsiveFontSizes, ThemeProvider} from '@mui/material';
import theme from '../../../@softbd/layouts/themes/youth';
import {useTheme} from '@mui/material/styles';
import AccessibilityToolbar from '../../../@softbd/components/accessibility/AccessibilityToolbar';

const YouthRegistrationPage = asyncComponent(
  () => import('../../../modules/youth/registration/YouthRegistration'),
);
export default DefaultPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.registration'] as string} />
      <ThemeProvider theme={responsiveFontSizes(theme(useTheme()))}>
        <AccessibilityToolbar />
        <YouthRegistrationPage />
      </ThemeProvider>
    </>
  );
});
