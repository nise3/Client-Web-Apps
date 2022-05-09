import React, {useEffect, useState} from 'react';
import {useFetch4IRInitiative} from '../../../services/4IRManagement/hooks';
import FourIRTNAReportPage from '../4IRTNAReport/FourIRTNAReportPage';

interface Props {
  fourIRInitiativeId: any;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const TNAReportStep = ({
  fourIRInitiativeId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const {data: itemData} = useFetch4IRInitiative(fourIRInitiativeId);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (itemData && itemData?.completion_step) {
      const latestStep = itemData?.completion_step;
      delete itemData?.completion_step;
      if (latestStep >= 1) {
        setIsReady(true);
      }
      setLatestStep(latestStep + 1);
    }
  }, [itemData]);

  return isReady ? (
    <FourIRTNAReportPage fourIRInitiativeId={fourIRInitiativeId} />
  ) : (
    <></>
  );
};

export default TNAReportStep;
