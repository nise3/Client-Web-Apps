import FourIRCoursePage from './Course/FourIRCoursePage';
import {useState} from 'react';
import EnrolledYouthList from './4IREnrollmentApproval/EnrolledYouthList';

interface IFourIRCoursePageProps {
  fourIRInitiativeId: number;
}

const FourIRCourseStepPage = ({fourIRInitiativeId}: IFourIRCoursePageProps) => {
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
          fourIRInitiativeId={fourIRInitiativeId}
          showEnrollmentHandler={showEnrollmentHandler}
        />
      )}

      {showEnrollments && selectedCourseId && (
        <EnrolledYouthList
          selectedCourseId={selectedCourseId}
          previousHandler={previousHandler}
        />
      )}
    </>
  );
};

export default FourIRCourseStepPage;
