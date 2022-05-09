import React, {SyntheticEvent, useEffect, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import {useFetch4IRInitiative} from '../../../services/4IRManagement/hooks';
import FourIRImplemntingTeamPage from '../4IRImplementingTeam/FourIRImplementingTeamPage';
import FourIRExpertTeamPage from '../4IRExpertTeam/FourIRExpertTeamPage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useIntl} from 'react-intl';

interface Props {
  fourIRInitiativeId: any;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const SecondStep = ({
  fourIRInitiativeId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const {data: itemData} = useFetch4IRInitiative(fourIRInitiativeId);
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
          <FourIRImplemntingTeamPage fourIRInitiativeId={fourIRInitiativeId} />
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
            {messages['4ir.expert_team']}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FourIRExpertTeamPage fourIRInitiativeId={fourIRInitiativeId} />
        </AccordionDetails>
      </Accordion>

      {/** 4IR CELL new requirements may come */}
      {/*<Accordion
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
          <FourIRCellPage fourIRProjectId={fourIRInitiativeId} />
        </AccordionDetails>
      </Accordion>*/}
    </Box>
  ) : (
    <></>
  );
};

export default SecondStep;
