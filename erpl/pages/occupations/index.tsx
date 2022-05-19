import ErplDefaultFrontPage from '../../../@softbd/layouts/hoc/ErplDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';

const OccupationPage = asyncComponent(
  () => import('../../../modules/erpl/occupations'),
);

export default ErplDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.occupations']} />
      <OccupationPage />
    </>
  );
});
