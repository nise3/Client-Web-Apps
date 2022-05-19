import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import {useFetch4IRInitiative} from '../../../services/4IRManagement/hooks';
import {useIntl} from 'react-intl';
import FourIRCBLMPage from '../4IRCBLM/FourIRCBLMPage';

interface Props {
  fourIRInitiativeId: any;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const CBLMStep = ({
  fourIRInitiativeId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const {data: itemData} = useFetch4IRInitiative(fourIRInitiativeId);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const {messages} = useIntl();

  useEffect(() => {
    if (itemData && itemData?.completion_step) {
      if (itemData?.completion_step < 6) {
        setIsDisabled(true);
      }
      const latestStep = itemData?.completion_step;
      delete itemData?.completion_step;
      if (latestStep >= 5) {
        setIsReady(true);
      }
      setLatestStep(latestStep + 1);
    }
  }, [itemData]);

  return isReady ? (
    <>
      <FourIRCBLMPage fourIRInitiativeId={fourIRInitiativeId} />
      <Box display={'flex'} justifyContent={'space-between'} mt={3}>
        <Button onClick={onBack} variant={'outlined'} color={'primary'}>
          {messages['common.previous']}
        </Button>
        <Button
          onClick={onContinue}
          variant={'contained'}
          color={'primary'}
          disabled={isDisabled}>
          {messages['common.next']}
        </Button>
      </Box>
    </>
  ) : (
    <></>
  );
};

export default CBLMStep;
