import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const PersonalInformationPage = asyncComponent(
  () => import('../../modules/youthProfile/PersonalInformationEdit'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['personal_info_edit.label']} />
      <PersonalInformationPage />
    </>
  );
});
