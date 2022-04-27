import React, {SyntheticEvent, useEffect, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import {useFetch4IRProject} from '../../../services/4IRManagement/hooks';
import FourIRImplemntingTeamPage from '../4IRMentoringTeam/FourIRMentoringTeamPage';
import FourIRMentoringTeamPage from '../4IRMentoringTeam/FourIRMentoringTeamPage';
import FourIRCellPage from '../4IRCell/FourIRCellPage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useIntl} from 'react-intl';

interface Props {
  fourIRProjectId: any;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const SecondStep = ({
  fourIRProjectId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const {data: itemData} = useFetch4IRProject(fourIRProjectId);
  const [isReady, setIsReady] = useState<boolean>(false);
  const {messages} = useIntl();
  const [accordionExpandedState, setAccordionExpandedState] = useState<
    string | false
  >(false);

  const handleAccordionExpandedChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpandedState(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (itemData && itemData?.latest_step) {
      const latestStep = itemData.completion_step;
      delete itemData?.completion_step;

      if (latestStep >= 2) {
        setIsReady(true);
      }
      setLatestStep(latestStep);
    }
  }, [itemData]);
  console.log('is ready then go: ', isReady);
  return isReady ? (
    <Box mt={2}>
      <Accordion
        sx={{width: '100%'}}
        expanded={accordionExpandedState === '1'}
        onChange={handleAccordionExpandedChange('1')}
        key={'1'}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          sx={{justifyContent: 'space-between'}}>
          <Typography sx={{width: '90%'}}>
            {messages['4ir.implementing_team']}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FourIRImplemntingTeamPage />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{width: '100%'}}
        expanded={accordionExpandedState === '2'}
        onChange={handleAccordionExpandedChange('2')}
        key={'2'}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          sx={{justifyContent: 'space-between'}}>
          <Typography sx={{width: '90%'}}>
            {messages['4ir.mentoring_team']}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FourIRMentoringTeamPage />
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{width: '100%'}}
        expanded={accordionExpandedState === '3'}
        onChange={handleAccordionExpandedChange('3')}
        key={'3'}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          sx={{justifyContent: 'space-between'}}>
          <Typography sx={{width: '90%'}}>
            {messages['4ir_cell.label']}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FourIRCellPage fourIRProjectId={fourIRProjectId} />
        </AccordionDetails>
      </Accordion>
    </Box>
  ) : (
    <>not allowed</>
  );
};

export default SecondStep;
