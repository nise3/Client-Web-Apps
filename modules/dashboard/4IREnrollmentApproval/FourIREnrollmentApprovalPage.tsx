import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconBranch from '../../../@softbd/icons/IconBranch';
import CourseListPage from './CourseListPage';
import BatchListPage from './BatchListPage';
import YouthListPage from './YouthListPage';

interface Props {
  fourIRInitiativeId: number;
}

const FourIREnrollmentApprovalPage = ({fourIRInitiativeId}: Props) => {
  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir.enrollment_approval' />
          </>
        }>
        <CourseListPage fourIRInitiativeId={fourIRInitiativeId} />
        <BatchListPage fourIRInitiativeId={fourIRInitiativeId} />
        <YouthListPage fourIRInitiativeId={fourIRInitiativeId} />
      </PageBlock>
    </>
  );
};

export default FourIREnrollmentApprovalPage;
