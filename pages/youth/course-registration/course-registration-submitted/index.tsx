import asyncComponent from '../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../../@softbd/layouts/hoc/YouthFrontPage';

const YouthCourseRegistrationSubmittedPage = asyncComponent(
  () => import('../../../../modules/youth/courseRegistrationSubmitted'),
);
export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Registration'} />
      <YouthCourseRegistrationSubmittedPage />
    </>
  );
});
