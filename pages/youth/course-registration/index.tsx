import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';

const YouthCourseRegistrationPage = asyncComponent(
  () => import('../../../modules/youth/courseRegistration'),
);
export default FrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Registration'} />
      <YouthCourseRegistrationPage />
    </>
  );
});
