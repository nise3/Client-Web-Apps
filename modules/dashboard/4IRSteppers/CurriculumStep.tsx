import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import {useIntl} from 'react-intl';
import FourIRCurriculumPage from '../4IRCurriculum/FourIRCurriculumPage';
import {getInitiative} from '../../../services/4IRManagement/InitiativeService';
import {IPageHeader} from './index';

interface Props {
  fourIRInitiativeId: any;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const CurriculumStep = ({
  fourIRInitiativeId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const {messages} = useIntl();

  const [pageHeader, setPageHeader] = useState<IPageHeader>({
    tagline_name: '',
    initative_name: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await getInitiative(fourIRInitiativeId);

        setPageHeader({
          tagline_name: response?.data?.four_ir_tagline_name ?? '',
          initative_name: response?.data?.name ?? '',
        });

        if (response && response.data) {
          const initiative = response.data;
          if (initiative?.completion_step) {
            const latestStep = initiative?.completion_step;
            if (latestStep >= 4) {
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
      <FourIRCurriculumPage
        pageHeader={pageHeader}
        fourIRInitiativeId={fourIRInitiativeId}
      />
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

export default CurriculumStep;
