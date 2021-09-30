import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const EditProfileEducationPage = asyncComponent(
  () => import('../../modules/youth-profile-edit/EditProfileEducation'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages["youth.edit_education"] as string} />
      <EditProfileEducationPage />
    </>
  );
});
