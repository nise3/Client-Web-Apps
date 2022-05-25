import SkillDevelopmentPage from './SkillDevelopmentPage';
import {useState} from 'react';
import SkillDevelopmentViewYouthList from './SkillDevelopmentViewYouthList';
import {IPageHeader} from '../4IRSteppers';

interface Props {
  fourIRInitiativeId: number;
  pageHeader: IPageHeader;
}

const FourIRSkillDevelopmentPage = ({
  fourIRInitiativeId,
  pageHeader,
}: Props) => {
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
          pageHeader={pageHeader}
          fourIRInitiativeId={fourIRInitiativeId}
          showYouthListHandler={showYouthListHandler}
        />
      )}

      {showYouthList && selectedBatchId && (
        <SkillDevelopmentViewYouthList
          pageHeader={pageHeader}
          batchId={selectedBatchId}
          previousHandler={previousHandler}
        />
      )}
    </>
  );
};

export default FourIRSkillDevelopmentPage;
