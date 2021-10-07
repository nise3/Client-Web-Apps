import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteLayoutComposed from '../../../modules/institute/InstituteLayoutComposed';
import React from 'react';

const InstituteCourses = asyncComponent(
  () => import('../../../modules/institute/courses'),
);

export default InstituteLayoutComposed(() => {
  return <InstituteCourses />;
});
