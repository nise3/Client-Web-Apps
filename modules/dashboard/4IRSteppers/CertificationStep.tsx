import React, {useEffect, useState} from 'react';
import {useFetch4IRInitiative} from '../../../services/4IRManagement/hooks';
import FourIRCertificateManagementPage from '../4IRCertificateManagement/FourIRCertificateManagementPage';
import {Box, Button} from '@mui/material';
import {useIntl} from 'react-intl';

interface Props {
  fourIRInitiativeId: any;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const CertificationStep = ({
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
      if (itemData?.completion_step < 12) {
        setIsDisabled(true);
      }
      const latestStep = itemData?.completion_step;
      delete itemData?.completion_step;
      if (latestStep >= 11) {
        setIsReady(true);
      }
      setLatestStep(latestStep + 1);
    }
  }, [itemData]);

  return isReady ? (
    <>
      <FourIRCertificateManagementPage
        fourIRInitiativeId={fourIRInitiativeId}
      />
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

export default CertificationStep;
