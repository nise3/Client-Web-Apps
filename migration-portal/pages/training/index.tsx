import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import InstituteFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import {useIntl} from 'react-intl';

const NISETrainingPage = asyncComponent(
  () => import('../../../modules/youth/training'),
);
export default InstituteFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.training']} />
      <NISETrainingPage />
    </>
  );
});
