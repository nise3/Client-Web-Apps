import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import AuthenticatedBlankPage from '../../../@softbd/layouts/hoc/AuthenticatedBlankPage';
import {responsiveFontSizes, ThemeProvider} from '@mui/material';
import theme from '../../../@softbd/layouts/themes/youth';
import {useTheme} from '@mui/material/styles';

const AssessmentPaymentSuccessPage = asyncComponent(
  () => import('../../../modules/youth/assessmentPaymentSuccess'),
);
export default AuthenticatedBlankPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.assessment']} />
      <ThemeProvider theme={responsiveFontSizes(theme(useTheme()))}>
        <AssessmentPaymentSuccessPage />
      </ThemeProvider>
    </>
  );
});
