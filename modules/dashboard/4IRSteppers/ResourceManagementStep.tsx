import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import {useIntl} from 'react-intl';
import ResourceManagementPage from '../4IRResourceManagement/ResourceManagementPage';
import {getInitiative} from '../../../services/4IRManagement/InitiativeService';

interface Props {
  fourIRInitiativeId: any;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const ResourceManagementStep = ({
  fourIRInitiativeId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const {messages} = useIntl();

  useEffect(() => {
    (async () => {
      try {
        const response = await getInitiative(fourIRInitiativeId);
        if (response && response.data) {
          const initiative = response.data;
          if (initiative?.completion_step) {
            const latestStep = initiative?.completion_step;
            if (latestStep >= 6) {
              setIsReady(true);
            }
            setLatestStep(latestStep + 1);
          }
        }
      } catch (error: any) {}
    })();
  }, []);

  return isReady ? (
    <>
      <ResourceManagementPage fourIRInitiativeId={fourIRInitiativeId} />
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

export default ResourceManagementStep;
