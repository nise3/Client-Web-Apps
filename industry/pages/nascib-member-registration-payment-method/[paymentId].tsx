import asyncComponent from '../../../@crema/utility/asyncComponent';
import AuthenticatedBlankPage from '../../../@softbd/layouts/hoc/AuthenticatedBlankPage';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';
import {responsiveFontSizes, ThemeProvider} from '@mui/material';
import theme from '../../../@softbd/layouts/themes/youth';
import {useTheme} from '@mui/material/styles';
import React from 'react';

const ChoosePaymentMethodPage = asyncComponent(
  () => import('../../../modules/industry/choosePaymentMethod'),
);

export default AuthenticatedBlankPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.member_registration']} />
      <ThemeProvider theme={responsiveFontSizes(theme(useTheme()))}>
        <ChoosePaymentMethodPage />
      </ThemeProvider>
    </>
  );
});
