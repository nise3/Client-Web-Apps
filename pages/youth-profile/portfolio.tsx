import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const PersonalInformationPage = asyncComponent(
  () => import('../../modules/youthProfile/PortfolioAddEdit'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.add_new_portfolio']} />
      <PersonalInformationPage />
    </>
  );
});
