import React, {SyntheticEvent, useEffect, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import FourIRImplementingTeamPage from '../4IRImplementingTeam/FourIRImplementingTeamPage';
import FourIRExpertTeamPage from '../4IRExpertTeam/FourIRExpertTeamPage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useIntl} from 'react-intl';
import {getInitiative} from '../../../services/4IRManagement/InitiativeService';

interface Props {
  fourIRInitiativeId: any;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const TeamStep = ({
  fourIRInitiativeId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const {messages} = useIntl();
  const [accordionExpandedState, setAccordionExpandedState] = useState<
    string | false
  >(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getInitiative(fourIRInitiativeId);
        if (response && response.data) {
          const initiative = response.data;
          if (initiative?.completion_step) {
            const latestStep = initiative?.completion_step;
            if (latestStep >= 1) {
              setIsReady(true);
            }
            setLatestStep(latestStep + 1);
          }
        }
      } catch (error: any) {}
    })();
  }, []);

  const handleAccordionExpandedChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpandedState(isExpanded ? panel : false);
    };

  return isReady ? (
    <>
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
            <FourIRImplementingTeamPage
              fourIRInitiativeId={fourIRInitiativeId}
            />
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

export default TeamStep;
