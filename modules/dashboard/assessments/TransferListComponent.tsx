import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

function not(a: any[], b: any[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: any[], b: any[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const [checked, setChecked] = React.useState<any[]>([]);
  const [leftQuestionList, setLeftQuestionList] = React.useState<any[]>([
    0, 1, 2, 3,
  ]);
  const [rightQuestionList, setRightQuestionList] = React.useState<any[]>([
    4, 5, 6, 7,
  ]);

  const leftChecked = intersection(checked, leftQuestionList);
  const rightChecked = intersection(checked, rightQuestionList);

  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRightQuestionList(rightQuestionList.concat(leftQuestionList));
    setLeftQuestionList([]);
  };

  const handleCheckedRight = () => {
    setRightQuestionList(rightQuestionList.concat(leftChecked));
    setLeftQuestionList(not(leftQuestionList, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeftQuestionList(leftQuestionList.concat(rightChecked));
    setRightQuestionList(not(rightQuestionList, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeftQuestionList(leftQuestionList.concat(rightQuestionList));
    setRightQuestionList([]);
  };

  const customList = (items: any[]) => (
    <Paper sx={{width: 375, overflow: 'auto'}}>
      <List dense component='div' role='list'>
        {items.map((value: any) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role='listitem'>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                  onClick={handleToggle(value)}
                />
              </ListItemIcon>
              <Accordion>
                <AccordionSummary
                  expandIcon={<>Icon</>}
                  aria-controls='panel2a-content'
                  id='panel2a-header'>
                  <Typography>{`List item ${value + 1}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item>{customList(leftQuestionList)}</Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Button
            sx={{my: 0.5}}
            variant='outlined'
            size='small'
            onClick={handleAllRight}
            disabled={leftQuestionList.length === 0}
            aria-label='move all right'>
            ≫
          </Button>
          <Button
            sx={{my: 0.5}}
            variant='outlined'
            size='small'
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'>
            &gt;
          </Button>
          <Button
            sx={{my: 0.5}}
            variant='outlined'
            size='small'
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected left'>
            &lt;
          </Button>
          <Button
            sx={{my: 0.5}}
            variant='outlined'
            size='small'
            onClick={handleAllLeft}
            disabled={rightQuestionList.length === 0}
            aria-label='move all left'>
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(rightQuestionList)}</Grid>
    </Grid>
  );
}
