import SkillDevelopmentPage from './SkillDevelopmentPage';
import {useState} from 'react';
import SkillDevelopmentViewYouthList from './SkillDevelopmentViewYouthList';

interface Props {
  fourIRInitiativeId: number;
}

const FourIRSkillDevelopmentPage = ({fourIRInitiativeId}: Props) => {
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
  const [showYouthList, setShowYouthList] = useState<boolean>(false);

  const previousHandler = () => {
    setSelectedBatchId(null);
    setShowYouthList(false);
  };

  const showYouthListHandler = (id: number | null) => {
    setSelectedBatchId(id);
    setShowYouthList(true);
  };

  return (
    <>
      {!showYouthList && (
        <SkillDevelopmentPage
          fourIRInitiativeId={fourIRInitiativeId}
          showYouthListHandler={showYouthListHandler}
        />
      )}

      {showYouthList && selectedBatchId && (
        <SkillDevelopmentViewYouthList
          batchId={selectedBatchId}
          previousHandler={previousHandler}
        />
      )}
    </>
  );
};

export default FourIRSkillDevelopmentPage;
