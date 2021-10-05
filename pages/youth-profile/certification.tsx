import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const CertificationPage = asyncComponent(
  () => import('../../modules/youthProfile/CertificateAddEditPage'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.certification']} />
      <CertificationPage />
    </>
  );
});
