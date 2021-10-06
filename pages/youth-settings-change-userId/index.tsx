import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthSettingsChangeUserIdPage = asyncComponent(
  () => import('../../modules/youth-settings-change-userId/index'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.change_userId'] as string} />
      <YouthSettingsChangeUserIdPage />
    </>
  );
});
