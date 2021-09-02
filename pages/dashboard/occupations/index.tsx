import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const OccupationsPage = asyncComponent(
  () => import('../../../modules/dashboard/occupations/OccupationsPage'),
);
export default AppPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['occupations.label'] as string} />
      <OccupationsPage />
    </>
  );
});
