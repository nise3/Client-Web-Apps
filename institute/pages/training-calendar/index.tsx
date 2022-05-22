import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';

const InstituteTrainingCalendar = asyncComponent(
  () => import('../../../modules/institute/training-calendar'),
);

export default InstituteDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.calender']} />
      <InstituteTrainingCalendar />
    </>
  );
});
