import asyncComponent from '../../../@crema/utility/asyncComponent';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';

const QuestionBankPage = asyncComponent(
  () => import('../../../modules/dashboard/questionBank/QuestionBankPage'),
);

export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.question_bank']} />
      <QuestionBankPage />
    </>
  );
});
