import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthSettingsPage = asyncComponent(
  () => import('../../modules/youth-settings/Settings'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages["common.settings"] as string} />
      <YouthSettingsPage />
    </>
  );
});
