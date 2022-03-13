import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const CertificateAuthorityPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/certificateAuthority/CertificateAuthorityPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['certificate_authority.label']} />
      <CertificateAuthorityPage />
    </>
  );
});
