import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import React from 'react';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';

const PublicationPage = asyncComponent(
  () => import('../../../modules/industry/publications'),
);

export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['industry.publication_details'] as string} />
      <PublicationPage />
    </>
  );
});
