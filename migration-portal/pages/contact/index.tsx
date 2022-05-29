import asyncComponent from '../../../@crema/utility/asyncComponent';
import MigrationPortalDefaultFrontPage from '../../../@softbd/layouts/hoc/MigrationPortalDefaultFrontPage';
import React from 'react';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const MigrationPortalContact = asyncComponent(
  () => import('../../../modules/migrationPortal/contact'),
);

export default MigrationPortalDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.contact'] as string} />
      <MigrationPortalContact />
    </>
  );
});
