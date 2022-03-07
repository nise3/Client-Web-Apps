import * as React from 'react';
import {SyntheticEvent, useEffect, useState} from 'react';
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
  Skeleton,
  Typography,
} from '@mui/material';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {
  useFetchQuestionBanks,
  useFetchSubjects,
} from '../../../services/CertificateAuthorityManagement/hooks';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function not(a: any[], b: any[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: any[], b: any[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const {messages} = useIntl();
  const [accordionExpandedState, setAccordionExpandedState] = useState<
    string | false
  >(false);

  const handleAccordionExpandedChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpandedState(isExpanded ? panel : false);
    };

  const [checked, setChecked] = React.useState<any[]>([]);
  const [leftQuestionList, setLeftQuestionList] = React.useState<any[]>([]);
  const [rightQuestionList, setRightQuestionList] = React.useState<any[]>([
    4, 5, 6, 7,
  ]);

  const [subjectId, setSubjectId] = useState(null);
  const [subjectFilters] = useState({});
  const {data: subjects, isLoading: isFetchingSubjects} =
    useFetchSubjects(subjectFilters);

  const [questionFilter, setQuestionFilter] = useState({});
  const {data: questions, isLoading: isFetchingQuestions} =
    useFetchQuestionBanks(questionFilter);

  useEffect(() => {
    setQuestionFilter({subject_id: subjectId});
  }, [subjectId]);

  useEffect(() => {
    setLeftQuestionList(questions);
  }, [questions]);

  const handleSubjectChange = (subId: any) => {
    setSubjectId(subId);
  };

  const {
    control,
    formState: {},
  } = useForm<any>();

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
        {items?.map((value: any) => {
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
              <Accordion
                expanded={accordionExpandedState === value}
                onChange={handleAccordionExpandedChange(value)}
                key={value}>
                <AccordionSummary
                  expandIcon={
                    accordionExpandedState === value ? (
                      <RemoveIcon />
                    ) : (
                      <AddIcon />
                    )
                  }
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomFilterableFormSelect
          id={'subject_id'}
          label={messages['subject.label']}
          isLoading={isFetchingSubjects}
          control={control}
          options={subjects}
          optionValueProp={'id'}
          optionTitleProp={['title']}
          onChange={handleSubjectChange}
        />
      </Grid>
      {isFetchingQuestions ? (
        <Skeleton variant='rectangular' width={'80%'} height={300} />
      ) : (
        <Grid item>
          {leftQuestionList?.length > 0 && (
            <Grid
              container
              spacing={2}
              justifyContent='center'
              /*alignItems='center'*/
            >
              <Grid item>{customList(leftQuestionList)}</Grid>
              <Grid item>
                <Grid container direction='column' alignItems='center'>
                  <Button
                    sx={{my: 0.5}}
                    variant='outlined'
                    size='small'
                    onClick={handleAllRight}
                    disabled={leftQuestionList?.length === 0}
                    aria-label='move all right'>
                    ≫
                  </Button>
                  <Button
                    sx={{my: 0.5}}
                    variant='outlined'
                    size='small'
                    onClick={handleCheckedRight}
                    disabled={leftChecked?.length === 0}
                    aria-label='move selected right'>
                    &gt;
                  </Button>
                  <Button
                    sx={{my: 0.5}}
                    variant='outlined'
                    size='small'
                    onClick={handleCheckedLeft}
                    disabled={rightChecked?.length === 0}
                    aria-label='move selected left'>
                    &lt;
                  </Button>
                  <Button
                    sx={{my: 0.5}}
                    variant='outlined'
                    size='small'
                    onClick={handleAllLeft}
                    disabled={rightQuestionList?.length === 0}
                    aria-label='move all left'>
                    ≪
                  </Button>
                </Grid>
              </Grid>
              <Grid item>{customList(rightQuestionList)}</Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
}
