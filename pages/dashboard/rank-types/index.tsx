import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const RankTypesPage = asyncComponent(
  () => import('../../../modules/dashboard/rank-type/RankTypePage'),
);
export default AppPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['rank_types.label']} />
      <RankTypesPage />
    </>
  );
});
