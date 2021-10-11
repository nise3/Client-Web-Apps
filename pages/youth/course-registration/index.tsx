import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const YouthCourseRegistrationPage = asyncComponent(
  () => import('../../../modules/youth/courseRegistration'),
);
export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Registration'} />
      <YouthCourseRegistrationPage />
    </>
  );
});
