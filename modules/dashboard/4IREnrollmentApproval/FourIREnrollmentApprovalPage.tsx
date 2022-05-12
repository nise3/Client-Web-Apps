import {useState} from 'react';
import CourseListPage from './CourseListPage';
import EnrolledYouthList from './EnrolledYouthList';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_COURSES} from '../../../@softbd/common/apiRoutes';

interface Props {
  fourIRInitiativeId: number;
}

const FourIREnrollmentApprovalPage = ({fourIRInitiativeId}: Props) => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  // const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
  // const [selectedYouthId, setSelectedYouthId] = useState<number | null>(null);

  const previousHandler = () => {
    setSelectedCourseId(null);
  };

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_COURSES,
      paramsValueModifier: (params) => {
        params['four_ir_initiative_id'] = fourIRInitiativeId;
        return params;
      },
    });

  return (
    <>
      {selectedCourseId && (
        <CommonButton
          onClick={() => previousHandler()}
          btnText={'common.previous'}
        />
      )}
      {!selectedCourseId && (
        <CourseListPage
          onFetchData={onFetchData}
          data={data}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          setSelectedCourseId={setSelectedCourseId}
          fourIRInitiativeId={fourIRInitiativeId}
        />
      )}

      {selectedCourseId && (
        <EnrolledYouthList
          selectedCourseId={selectedCourseId}
          fourIRInitiativeId={fourIRInitiativeId}
        />
      )}
    </>
  );
};

export default FourIREnrollmentApprovalPage;
