import React, {useEffect, useState} from 'react';
import {useFetch4IRInitiative} from '../../../services/4IRManagement/hooks';
import FourIRAssessmentPage from '../4IRAssessment/FourIRAssessmentPage';
import {Box, Button} from '@mui/material';
import {useIntl} from 'react-intl';

interface Props {
  fourIRInitiativeId: any;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const FourIRAssessmentStep = ({
  fourIRInitiativeId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const {data: itemData} = useFetch4IRInitiative(fourIRInitiativeId);
  const [isReady, setIsReady] = useState<boolean>(false);
  const {messages} = useIntl();

  useEffect(() => {
    if (itemData && itemData?.completion_step) {
      const latestStep = itemData?.completion_step;
      if (latestStep >= 10) {
        setIsReady(true);
      }
      setLatestStep(latestStep + 1);
    }
  }, [itemData]);

  return isReady ? (
    <>
      <FourIRAssessmentPage fourIRInitiativeId={fourIRInitiativeId} />
      <Box display={'flex'} justifyContent={'space-between'} mt={3}>
        <Button onClick={onBack} variant={'outlined'} color={'primary'}>
          {messages['common.previous']}
        </Button>
        <Button onClick={onContinue} variant={'contained'} color={'primary'}>
          {messages['common.next']}
        </Button>
      </Box>
    </>
  ) : (
    <></>
  );
};

export default FourIRAssessmentStep;