import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import ErplAssessmentFrontPage from '../../../@softbd/layouts/hoc/ErplAssessmentFrontPage';

const RPLApplicationForm = asyncComponent(
  () => import('../../../modules/erpl/rplApplication'),
);
export default ErplAssessmentFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['rpl_application.label'] as string} />
      <RPLApplicationForm />
    </>
  );
});
