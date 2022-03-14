import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import {responsiveFontSizes, ThemeProvider} from '@mui/material';
import theme from '../../../@softbd/layouts/themes/youth';
import {useTheme} from '@mui/material/styles';
import ErplAssessmentFrontPage from '../../../@softbd/layouts/hoc/ErplAssessmentFrontPage';

const AssessmentPaymentSuccessPage = asyncComponent(
  () => import('../../../modules/erpl/assessmentPaymentSuccess'),
);
export default ErplAssessmentFrontPage(() => {
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
