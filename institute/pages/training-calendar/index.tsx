import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';

const InstituteTrainingCalendar = asyncComponent(
  () => import('../../../modules/institute/training-calendar'),
);

export default InstituteDefaultFrontPage(() => {
  return <InstituteTrainingCalendar />;
});
