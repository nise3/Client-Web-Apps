import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import ErplAssessmentFrontPage from '../../../@softbd/layouts/hoc/ErplAssessmentFrontPage';

const RPLAssessmentProcess = asyncComponent(
  () => import('../../../modules/erpl/selfAssessmentProcess'),
);
export default ErplAssessmentFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.assessment'] as string} />
      <RPLAssessmentProcess />
    </>
  );
});
