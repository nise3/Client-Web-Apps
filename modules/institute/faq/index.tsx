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
    question: {
      whiteSpace: 'nowrap',
    },
    heading: {
      boxShadow: '0px 2px 2px #8888',
      padding: '40px 0px',
    },
  };
});

const InstituteFAQ = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
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
        <H2>{messages['faq.institute']}</H2>
      </Grid>
      <Container maxWidth='xl'>
        <Grid container>
          <Grid item xs={12} my={4}>
            {faqItems?.map((item: any) => (
              <Accordion
                className={classes.accordion}
                expanded={expanded === item.id}
                onChange={handleChange(item.id)}
                key={item.id}>
                <AccordionSummary
                  expandIcon={
                    expanded === item.id ? <RemoveIcon /> : <AddIcon />
                  }
                  aria-controls='panel1bh-content'
                  id='panel1bh-header'>
                  <Typography
                    className={classes.question}
                    sx={{width: '33%', flexShrink: 0}}>
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
