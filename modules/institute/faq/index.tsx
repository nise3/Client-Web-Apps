import React, {useState, SyntheticEvent} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Container, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import makeStyles from '@mui/styles/makeStyles';
import {H2} from '../../../@softbd/elements/common';
import {useFetchInstitutesFAQ} from '../../../services/instituteManagement/hooks';

const useStyles = makeStyles((theme) => {
  return {
    accordion: {
      marginBottom: '10px',
    },
    heading: {
      boxShadow: '0px 2px 2px #8888',
    },
  };
});

const InstituteFAQ = () => {
  const [expandedState, setExpanded] = useState<string | false>(false);
  const {messages} = useIntl();
  const classes = useStyles();

  const {data: faqItems} = useFetchInstitutesFAQ();

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Grid sx={{maxWidth: '100%'}}>
      <Grid textAlign={'center'} className={classes.heading}>
        <H2 py={3} fontWeight={'bold'}>
          {messages['faq.institute']}
        </H2>
      </Grid>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={12} my={4}>
            {faqItems?.map((item: any) => (
              <Accordion
                className={classes.accordion}
                expanded={expandedState === item.id}
                onChange={handleChange(item.id)}
                key={item.id}>
                <AccordionSummary
                  expandIcon={
                    expandedState === item.id ? <RemoveIcon /> : <AddIcon />
                  }
                  aria-controls='panel1bh-content'
                  id='panel1bh-header'>
                  <Typography
                    sx={{
                      width: '33%',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                      color: expandedState == item.id ? 'primary.main' : '',
                    }}>
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default InstituteFAQ;
