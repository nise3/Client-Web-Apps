import React, {ReactNode, useCallback, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  createStyles,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from '@material-ui/styles';
import {Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

type props = {
  expanded?: boolean;
  title: string;
  children?: ReactNode;
  height?: string;
};

const CustomAccordion = ({title, children, height}: props) => {
  const classes = useStyles();
  const [expand, setExpand] = useState<boolean>(true);

  const expandAction = useCallback(() => {
    setExpand((prvExpand: boolean) => !prvExpand);
  }, []);

  return (
    <Accordion
      expanded={expand}
      onChange={expandAction}
      style={{height: height}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'>
        <Typography className={classes.heading}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{flexDirection: 'column'}}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
