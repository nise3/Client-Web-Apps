import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@softbd/layouts/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const CoursePage = asyncComponent(
  () => import('../../../modules/dashboard/courses/CoursePage'),
);
export default AppPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['course.label'] as string} />
      <CoursePage />
    </>
  );
});
