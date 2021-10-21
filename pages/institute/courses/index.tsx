import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';

const InstituteCourses = asyncComponent(
  () => import('../../../modules/institute/courses'),
);

export default InstituteDefaultFrontPage(() => {
  return <InstituteCourses />;
});
