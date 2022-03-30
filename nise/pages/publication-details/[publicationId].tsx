import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';

const NisePublicationDetailsPage = asyncComponent(
  () => import('../../../modules/nise/publications/publicationDetails'),
);
export default NiseFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.publication_details'] as string} />
      <NisePublicationDetailsPage />
    </>
  );
});
