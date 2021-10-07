import asyncComponent from '../../../@crema/utility/asyncComponent';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';

const InstituteCourses = asyncComponent(() => import('../../../modules/institute/courses'));

export default FrontPage(() => {
  return <InstituteCourses />;
});
