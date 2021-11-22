import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const YouthFAQ = asyncComponent(() => import('../../../modules/institute/faq'));

export default YouthFrontPage(() => {
  return <YouthFAQ />;
});
