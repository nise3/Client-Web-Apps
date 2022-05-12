import {useState} from 'react';
import CourseListPage from './CourseListPage';
import BatchListPage from './BatchListPage';
import YouthListPage from './YouthListPage';

interface Props {
  fourIRInitiativeId: number;
}

const FourIREnrollmentApprovalPage = ({fourIRInitiativeId}: Props) => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  // const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
  // const [selectedYouthId, setSelectedYouthId] = useState<number | null>(null);

  return (
    <>
      <button onClick={() => setSelectedCourseId(null)}>Toggle</button>
      {!selectedCourseId && (
        <CourseListPage
          setSelectedCourseId={setSelectedCourseId}
          fourIRInitiativeId={fourIRInitiativeId}
        />
      )}

      {selectedCourseId && (
        <BatchListPage
          selectedCourseId={selectedCourseId}
          fourIRInitiativeId={fourIRInitiativeId}
        />
      )}
      {null && <YouthListPage fourIRInitiativeId={fourIRInitiativeId} />}
    </>
  );
};

export default FourIREnrollmentApprovalPage;
