import * as React from 'react';
import {FC, SyntheticEvent, useEffect, useState} from 'react';
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
import {Edit} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function not(a: any[], b: any[]) {
  return a.filter((value) => b?.indexOf(value) === -1);
}

function intersection(checked: any[], questionList: any[]) {
  return checked?.filter((value) => questionList?.indexOf(value) !== -1);
}

interface TransferListProps {
  getQuestionSet: any;
}

const TransferList: FC<TransferListProps> = ({getQuestionSet}) => {
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
  const [rightQuestionList, setRightQuestionList] = React.useState<any[]>([]);

  const [subjectId, setSubjectId] = useState(null);
  const [subjectFilters] = useState({});
  const {data: subjects, isLoading: isFetchingSubjects} =
    useFetchSubjects(subjectFilters);

  const [questionFilter, setQuestionFilter] = useState<any>(null);

  useEffect(() => {
    if (subjectId) {
      setQuestionFilter({
        subject_id: subjectId,
      });
    }
  }, [subjectId]);

  const {data: questions, isLoading: isFetchingQuestions} =
    useFetchQuestionBanks(questionFilter);

  useEffect(() => {
    if (rightQuestionList?.length > 0) {
      const filteredQuestions = questions?.filter((ques: any) =>
        rightQuestionList?.every(
          (rightSideQuestion: any) => rightSideQuestion?.id !== ques?.id,
        ),
      );

      setLeftQuestionList(filteredQuestions);
    } else {
      setLeftQuestionList(questions);
    }
  }, [questions]);

  useEffect(() => {
    getQuestionSet(rightQuestionList);
  }, [rightQuestionList]);

  const handleSubjectChange = (subId: any) => {
    setSubjectId(subId);
  };

  const {
    control,
    formState: {},
  } = useForm<any>();

  const leftChecked = intersection(checked, leftQuestionList);
  const rightChecked = intersection(checked, rightQuestionList);

  console.log('right checked: ', rightChecked);

  const handleToggle = (value: any) => () => {
    const found = checked?.some((item) => item?.id === value?.id);
    const newChecked = [...checked];

    if (!found) {
      newChecked.push(value);
    } else {
      const index = newChecked?.findIndex((item) => item?.id === value?.id);
      newChecked.splice(index, 1);
    }
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRightQuestionList(rightQuestionList.concat(leftQuestionList));
    setLeftQuestionList([]);
  };

  const moveCheckedToRight = () => {
    setRightQuestionList(rightQuestionList.concat(leftChecked));
    setLeftQuestionList(not(leftQuestionList, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const moveCheckedToLeft = () => {
    setLeftQuestionList(leftQuestionList.concat(rightChecked));
    setRightQuestionList(not(rightQuestionList, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeftQuestionList(leftQuestionList.concat(rightQuestionList));
    setRightQuestionList([]);
  };

  const customList = (questions: any[]) => (
    <Paper sx={{width: 375, overflow: 'auto', height: '100%'}}>
      <List dense component='div' role='list'>
        {questions?.map((value: any) => {
          const labelId = `transfer-list-item-${value?.id}-label`;

          return (
            <ListItem key={value?.id} role='listitem'>
              <ListItemIcon>
                <Checkbox
                  checked={checked?.some((item) => item?.id === value?.id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                  onClick={handleToggle(value)}
                />
              </ListItemIcon>
              <Accordion
                sx={{width: '100%'}}
                expanded={accordionExpandedState === value}
                onChange={handleAccordionExpandedChange(value)}
                key={value}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel2a-content'
                  id='panel2a-header'>
                  <Typography>{value?.title}</Typography>
                  <Edit
                    sx={{alignSelf: 'center'}}
                    onClick={() => {
                      console.log('aaaaa');
                    }}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{value?.answer}</Typography>
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
          label={messages['subject.select_first']}
          isLoading={isFetchingSubjects}
          control={control}
          options={subjects}
          optionValueProp={'id'}
          optionTitleProp={['title']}
          onChange={handleSubjectChange}
        />
      </Grid>
      {subjectId &&
        (isFetchingQuestions ? (
          <Grid item xs={12}>
            <Skeleton
              variant='rectangular'
              width={'100%'}
              height={300}
              sx={{margin: 'auto', marginTop: 5}}
            />
          </Grid>
        ) : (
          <Grid item>
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
                    onClick={moveCheckedToRight}
                    disabled={leftChecked?.length === 0}
                    aria-label='move selected right'>
                    &gt;
                  </Button>
                  <Button
                    sx={{my: 0.5}}
                    variant='outlined'
                    size='small'
                    onClick={moveCheckedToLeft}
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
          </Grid>
        ))}
    </Grid>
  );
};

export default TransferList;
