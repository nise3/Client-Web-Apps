import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import {useFetch4IRInitiative} from '../../../services/4IRManagement/hooks';
import {useIntl} from 'react-intl';
import FourIRCSPage from '../4IRCS/FourIRCSPage';

interface Props {
  fourIRInitiativeId: any;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const CSStep = ({
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
      if (latestStep >= 3) {
        setIsReady(true);
      }
      setLatestStep(latestStep + 1);
    }
  }, [itemData]);

  return isReady ? (
    <>
      <FourIRCSPage fourIRInitiativeId={fourIRInitiativeId} />
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

export default CSStep;