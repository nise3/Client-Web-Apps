import asyncComponent from '../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../@crema/core/PageMeta';
import FrontPage from '../../../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthCourseRegistrationSuccessPage = asyncComponent(
  () => import('../../../../modules/youth/courseRegistrationSuccess'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta
        title={messages['common.course_registration_success'] as string}
      />
      <YouthCourseRegistrationSuccessPage />
    </>
  );
});
