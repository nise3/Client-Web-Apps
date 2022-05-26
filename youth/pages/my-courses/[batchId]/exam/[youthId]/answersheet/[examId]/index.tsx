import React from 'react';
import {useIntl} from 'react-intl';
import YouthFrontPage from '../../../../../../../../@softbd/layouts/hoc/YouthFrontPage';
import asyncComponent from '../../../../../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../../../../../@crema/core/PageMeta';

const MyCoursePage = asyncComponent(
  () =>
    import(
      '../../../../../../../../modules/youth/myCourses/markSheetView/ExamMarkingViewPage'
    ),
);
export default YouthFrontPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.answer_sheet']} />
      <MyCoursePage />
    </>
  );
});
