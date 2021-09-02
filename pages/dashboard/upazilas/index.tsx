import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const UpazilasPage = asyncComponent(
  () => import('../../../modules/dashboard/upazilas/UpazilasPage'),
);
export default AppPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['upazilas.label'] as string} />
      <UpazilasPage />
    </>
  );
});
