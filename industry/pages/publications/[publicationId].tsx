import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const PublicationDetails = asyncComponent(
  () => import('../../../modules/industry/publications/publicationDetails'),
);
export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['industry.publication_details'] as string} />
      <PublicationDetails />
    </>
  );
});
