import FourIRCoursePage from './Course/FourIRCoursePage';
import {useState} from 'react';
import EnrolledYouthList from './4IREnrollmentApproval/EnrolledYouthList';
import {IPageHeader} from '../4IRSteppers';

interface IFourIRCoursePageProps {
  fourIRInitiativeId: number;
  pageHeader: IPageHeader;
}

const FourIRCourseStepPage = ({
  fourIRInitiativeId,
  pageHeader,
}: IFourIRCoursePageProps) => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [showEnrollments, setShowEnrollments] = useState<boolean>(false);

  const previousHandler = () => {
    setSelectedCourseId(null);
    setShowEnrollments(false);
  };

  const showEnrollmentHandler = (id: number | null) => {
    setSelectedCourseId(id);
    setShowEnrollments(true);
  };

  return (
    <>
      {!showEnrollments && (
        <FourIRCoursePage
          pageHeader={pageHeader}
          fourIRInitiativeId={fourIRInitiativeId}
          showEnrollmentHandler={showEnrollmentHandler}
        />
      )}

      {showEnrollments && selectedCourseId && (
        <EnrolledYouthList
          pageHeader={pageHeader}
          selectedCourseId={selectedCourseId}
          previousHandler={previousHandler}
        />
      )}
    </>
  );
};

export default FourIRCourseStepPage;
