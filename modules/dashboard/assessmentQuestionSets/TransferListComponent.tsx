import * as React from 'react';
import {FC, SyntheticEvent, useCallback, useEffect, useState} from 'react';
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
import {
  useFetchAssessmentQuestions,
  useFetchQuestionBanks,
  useFetchSubjects,
} from '../../../services/CertificateAuthorityManagement/hooks';
import {useIntl} from 'react-intl';
import {Edit} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionEdit from './QuestionEdit';
import CustomFilterableSelect from '../../youth/training/components/CustomFilterableSelect';

function not(a: any[], b: any[]) {
  return a.filter((value) => b?.indexOf(value) === -1);
}

function intersection(checked: any[], questionList: any[]) {
  return checked?.filter((value) => questionList?.indexOf(value) !== -1);
}

interface TransferListProps {
  assessmentQuestionSetId: number | string;
  getQuestionSet: any;
  onEditPopupOpenClose: (open: boolean) => void;
  control: any;
  errors: any;
}

const TransferList: FC<TransferListProps> = ({
  assessmentQuestionSetId,
  getQuestionSet,
  onEditPopupOpenClose,
  control,
  errors,
}) => {
  const {messages} = useIntl();
  const [accordionExpandedState, setAccordionExpandedState] = useState<
    string | false
  >(false);
  const [checked, setChecked] = React.useState<any[]>([]);
  const [leftQuestionList, setLeftQuestionList] = React.useState<any[]>([]);
  const [rightQuestionList, setRightQuestionList] = React.useState<any[]>([]);

  const [subjectId, setSubjectId] = useState<any>(null);
  const [subjectFilters] = useState({});
  const {data: subjects, isLoading: isFetchingSubjects} =
    useFetchSubjects(subjectFilters);

  const [assessmentQuestionFilter] = useState({
    assessment_question_set_id: assessmentQuestionSetId,
  });
  const {data: assessmentQuestions, isLoading} = useFetchAssessmentQuestions(
    assessmentQuestionFilter,
  );

  const [questionFilter, setQuestionFilter] = useState<any>(null);

  const {data: questions, isLoading: isFetchingQuestions} =
    useFetchQuestionBanks(questionFilter);

  useEffect(() => {
    if (questions && questions?.length > 0) {
      if (rightQuestionList?.length > 0) {
        const filteredQuestions = questions?.filter((ques: any) =>
          rightQuestionList?.every(
            (rightSideQuestion: any) =>
              rightSideQuestion?.question_id !== ques?.id,
          ),
        );

        setLeftQuestionList(filteredQuestions);
      } else {
        setLeftQuestionList(questions);
      }
    }
  }, [questions]);

  useEffect(() => {
    if (assessmentQuestions && assessmentQuestions.length > 0) {
      setRightQuestionList(
        assessmentQuestions.map((question: any) => ({
          ...question,
          id: question.question_id,
        })),
      );
    }
  }, [assessmentQuestions]);

  useEffect(() => {
    getQuestionSet(rightQuestionList);
  }, [rightQuestionList]);

  const handleAccordionExpandedChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setAccordionExpandedState(isExpanded ? panel : false);
    };

  const handleSubjectChange = (subjectId: any) => {
    setSubjectId(subjectId ? subjectId : null);
    if (subjectId) {
      setQuestionFilter({
        subject_id: subjectId,
      });
    }
  };

  const leftChecked = intersection(checked, leftQuestionList);
  const rightChecked = intersection(checked, rightQuestionList);

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

  /** question edit section */

  const [isOpenEditForm, setIsOpenEditForm] = React.useState<boolean>(false);
  const [editableQuestion, setEditableQuestion] = React.useState<object>({});

  const handleEditQuestion = (questionId: any) => {
    const question = rightQuestionList.find(
      (question: any) => question?.id === questionId,
    );
    setEditableQuestion(question);
    setIsOpenEditForm(true);
    onEditPopupOpenClose(true);
  };

  const handleCloseQuestionEdit = () => {
    setIsOpenEditForm(false);
    onEditPopupOpenClose(false);
  };

  const getEditedQuestion = useCallback(
    (updatedQuestion: any) => {
      let questionList = [...rightQuestionList];

      let foundIndex = questionList.findIndex(
        (question: any) => question.id == updatedQuestion.id,
      );
      questionList[foundIndex] = updatedQuestion;

      setRightQuestionList(questionList);
    },
    [rightQuestionList],
  );

  const customList = (questions: any[], isRightQuestions = false) => (
    <Paper sx={{width: '100%', overflow: 'auto', height: '100%'}}>
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
                  id='panel2a-header'
                  sx={{justifyContent: 'space-between'}}>
                  <Typography sx={{width: '90%'}}>{value?.title}</Typography>
                  {isRightQuestions && (
                    <Edit
                      sx={{
                        alignSelf: 'center',
                        position: 'absolute',
                        right: '45px',
                      }}
                      onClick={() => handleEditQuestion(value?.id)}
                    />
                  )}
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
    <React.Fragment>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12}>
          <CustomFilterableSelect
            id={'subject_id'}
            label={messages['subject.select_first']}
            isLoading={isFetchingSubjects}
            defaultValue={subjectId}
            options={subjects}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            onChange={handleSubjectChange}
          />
        </Grid>
        <Grid item xs={5}>
          {isFetchingQuestions ? (
            <Skeleton
              variant='rectangular'
              width={'100%'}
              height={300}
              sx={{margin: 'auto', marginTop: 5}}
            />
          ) : (
            customList(leftQuestionList)
          )}
        </Grid>
        <Grid item xs={2}>
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
        <Grid item xs={5}>
          {isLoading ? (
            <Skeleton
              variant='rectangular'
              width={'100%'}
              height={300}
              sx={{margin: 'auto', marginTop: 5}}
            />
          ) : (
            customList(rightQuestionList, true)
          )}
        </Grid>
      </Grid>
      {isOpenEditForm && (
        <QuestionEdit
          itemData={editableQuestion}
          onClose={handleCloseQuestionEdit}
          getEditedQuestion={getEditedQuestion}
        />
      )}
    </React.Fragment>
  );
};

export default TransferList;
