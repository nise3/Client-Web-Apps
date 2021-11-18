import React, {useState, SyntheticEvent} from 'react';
import {styled} from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Container, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import {H2} from '../../../@softbd/elements/common';
import {useFetchInstitutesFAQ} from '../../../services/instituteManagement/hooks';
import {useRouter} from 'next/router';
import {getShowInTypeFromPath} from '../../../@softbd/utilities/helpers';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import RowStatus from '../../../@softbd/utilities/RowStatus';

const PREFIX = 'InstituteFAQ';

const classes = {
  accordion: `${PREFIX}-accordion`,
  heading: `${PREFIX}-heading`,
};

const StyledGrid = styled(Grid)(() => {
  return {
    [`& .${classes.accordion}`]: {
      marginBottom: '10px',
    },
    [`& .${classes.heading}`]: {
      boxShadow: '0px 2px 2px #8888',
    },
  };
});

const InstituteFAQ = () => {
  const [expandedState, setExpanded] = useState<string | false>(false);
  const {messages} = useIntl();
  const router = useRouter();
  const pathName = router.pathname;
  const show_in = getShowInTypeFromPath(pathName);

  const [params] = useState({show_in: show_in, row_status: RowStatus.ACTIVE});
  const {data: faqItems} = useFetchInstitutesFAQ(params);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <StyledGrid sx={{maxWidth: '100%'}}>
      <Grid textAlign={'center'} className={classes.heading}>
        <H2 py={3} fontWeight={'bold'}>
          {messages['faq.institute']}
        </H2>
      </Grid>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={12} my={4}>
            {faqItems && faqItems.length > 0 ? (
              faqItems?.map((item: any) => (
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
              ))
            ) : (
              <NoDataFoundComponent />
            )}
          </Grid>
        </Grid>
      </Container>
    </StyledGrid>
  );
};

export default InstituteFAQ;
