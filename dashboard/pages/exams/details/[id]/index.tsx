import asyncComponent from '../../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../../@softbd/layouts/hoc/DashboardPage';
import {useIntl} from 'react-intl';

const ExamDetails = asyncComponent(
  () =>
    import(
      '../../../../../modules/dashboard/exams/examDetails/ExamDetailsPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['exam.label'] as string} />
      <ExamDetails />
    </>
  );
});
