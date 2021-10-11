import React, {useState, SyntheticEvent} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Card, CardContent, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => {
  return {
    mainDiv: {
      marginTop: '10px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    accordion: {
      marginBottom: '10px',
    },
    question: {
      whiteSpace: 'nowrap',
    },
  };
});

const InstituteFAQ = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const {messages} = useIntl();
  const classes = useStyles();

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const data = [
    {
      id: '1',
      question: 'প্রশ্ন ০১ঃ কেন্দ্র ভিত্তিক প্রশিক্ষণ সমূহ কি কি?',
      answer: 'উত্তরঃ দয়া করে সমূহের পাতায় দেখুন',
    },
    {
      id: '2',
      question: 'প্রশ্ন ০২ঃ কেন্দ্র ভিত্তিক প্রশিক্ষণ সমূহ কি কি?',
      answer: 'উত্তরঃ দয়া করে সমূহের পাতায় দেখুন',
    },
    {
      id: '3',
      question: 'প্রশ্ন ০৩ঃ কেন্দ্র ভিত্তিক প্রশিক্ষণ সমূহ কি কি?',
      answer: 'উত্তরঃ দয়া করে সমূহের পাতায় দেখুন',
    },
  ];

  return (
    <>
      <Grid sx={{maxWidth: 'xl'}}>
        <Grid textAlign={'center'}>
          <Card>
            <CardContent>
              <Typography variant={'h2'} mb={4}>
                {messages['faq.institute']}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={10} md={10} className={classes.mainDiv}>
          {data.map((item, i) => (
            <Accordion className={classes.accordion} expanded={expanded === item.id} onChange={handleChange(item.id)}
                       key={i}>
              <AccordionSummary
                expandIcon={expanded === item.id ? <RemoveIcon /> : <AddIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'
              >
                <Typography className={classes.question} sx={{width: '33%', flexShrink: 0}}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default InstituteFAQ;
