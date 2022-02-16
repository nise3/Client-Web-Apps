import {useFetchJobRecruitmentSchedule} from '../../../services/IndustryAssociationManagement/hooks';

interface IScheduleListComponentPopupProps {
  onClose: () => void;
  jobId: string;
  currentStep?: any;
}

const ScheduleListComponentPopup = ({
  jobId,
  currentStep,
  ...props
}: IScheduleListComponentPopupProps) => {
  const {data: schedule} = useFetchJobRecruitmentSchedule(currentStep?.step_no);
  console.log('sche->', schedule);

  return <div>schedule list</div>;
};

export default ScheduleListComponentPopup;
