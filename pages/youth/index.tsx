import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import YouthFrontPage from '../../@softbd/layouts/hoc/YouthFrontPage';

const YouthProfilePage = asyncComponent(
  () => import('../../modules/youth/profile/YouthProfilePage'),
);

export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['youth_profile.label']} />
      <YouthProfilePage />
    </>
  );
});
