import React, {useEffect, useState} from 'react';
import {useFetch4IRInitiative} from '../../../services/4IRManagement/hooks';
import FourIREnrollmentApprovalPage from '../4IRCourse/FourIRCourseStepPage';
import {Box, Button} from '@mui/material';
import {useIntl} from 'react-intl';

interface Props {
  fourIRInitiativeId: any;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const EnrollmentApprovalStep = ({
  fourIRInitiativeId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const {data: itemData} = useFetch4IRInitiative(fourIRInitiativeId);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const {messages} = useIntl();

  useEffect(() => {
    if (itemData && itemData?.completion_step) {
      if (itemData?.completion_step < 3) {
        setIsDisabled(true);
      }
      const latestStep = itemData?.completion_step;
      delete itemData?.completion_step;
      if (latestStep >= 2) {
        setIsReady(true);
      }
      setLatestStep(latestStep + 1);
    }
  }, [itemData]);

  return isReady ? (
    <>
      <FourIREnrollmentApprovalPage fourIRInitiativeId={fourIRInitiativeId} />
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

export default EnrollmentApprovalStep;
