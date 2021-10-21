import asyncComponent from '../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import YouthFrontPage from '../../../../@softbd/layouts/hoc/YouthFrontPage';

const YouthCourseRegistrationSuccessPage = asyncComponent(
  () => import('../../../../modules/youth/courseRegistrationSuccess'),
);
export default YouthFrontPage(() => {
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
