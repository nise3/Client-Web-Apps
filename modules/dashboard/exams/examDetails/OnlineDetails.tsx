import {Grid} from '@mui/material';
import QuestionTypeCheckedBox from '../components/QuestionTypeCheckedBox';
import DetailsInputView from '../../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import {QuestionSelectionType} from '../ExamEnums';
import {QuestionType} from '../../questionsBank/QuestionBanksEnums';

interface IProps {
  itemData: any;
  isLoading: boolean;
}

const OnlineDetails = ({itemData, isLoading}: IProps) => {
  const {messages} = useIntl();

  console.log('item->', itemData);

  // const [openQuestionToggle, setOpenQuestionToggle] = useState<boolean>(false);

  const questionSelectionType = (data: any) => {
    switch (data) {
      case QuestionSelectionType.FIXED:
        return messages['common.fixed'];
      case QuestionSelectionType.RANDOM:
        return messages['common.random'];
      case QuestionSelectionType.RANDOM_FROM_QUESTION_BANK:
        return messages['common.random_from_elect'];
      default:
        return '';
    }
  };

  const questionType = (data: any) => {
    switch (String(data)) {
      case QuestionType.MCQ:
        return messages['question.type.mcq'];
      case QuestionType.FILL_IN_THE_BLANK:
        return messages['common.fill_in_the_blanks'];
      case QuestionType.YES_NO:
        return messages['question.type.y_n'];
      case QuestionType.PRACTICAL:
        return messages['common.practical'];
      case QuestionType.FIELD_WORK:
        return messages['common.field_work'];
      case QuestionType.PRESENTATION:
        return messages['common.presentation'];
      case QuestionType.DESCRIPTIVE:
        return messages['common.descriptive'];
      default:
        return '';
    }
  };

  // const OnClickQuestionToggle = () => {
  //   setOpenQuestionToggle((prev: boolean) => !prev);
  // };

  return (
    <>
      <Grid item xs={12} md={6}>
        <DetailsInputView
          label={messages['common.exam_date']}
          value={itemData?.exam_date}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DetailsInputView
          label={messages['common.duration_min']}
          value={itemData?.duration}
          isLoading={isLoading}
        />
      </Grid>

      {(itemData?.exam_sections || []).map((data: any, i: number) => (
        <Grid key={i} item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={3} mt={3}>
              <QuestionTypeCheckedBox
                label={data ? questionType(data.question_type) : ''}
              />
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <DetailsInputView
                    label={messages['common.number_of_questions']}
                    value={data ? data?.number_of_questions : ''}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={3}>
                  <DetailsInputView
                    label={messages['common.question_selection_type']}
                    value={
                      data
                        ? questionSelectionType(data?.question_selection_type)
                        : ''
                    }
                    isLoading={isLoading}
                  />
                </Grid>
                {/*<Grid item xs={2}> todo: individual mas is not in api
                  <DetailsInputView
                    label={messages['common.marks']}
                    value={data?.individual_marks}
                    isLoading={isLoading}
                  />
                </Grid>*/}
                <Grid item xs={2}>
                  <DetailsInputView
                    label={messages['common.total_marks']}
                    value={data?.total_marks}
                    isLoading={isLoading}
                  />
                </Grid>

                {/*todo: this will update after question has given into api*/}
                {/*<Grid item xs={2} mt={3}>
                <Tooltip title={messages['question_set.label'] as any}>
                  <Fab
                    size='small'
                    color='primary'
                    onClick={() => OnClickQuestionToggle()}
                    aria-label='question'>
                    {openQuestionToggle ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </Fab>
                </Tooltip>
              </Grid>*/}

                {/*{openQuestionToggle && (
                <Grid item xs={6}>
                  <List>
                    {(itemData?.questions && itemData?.questions).map(
                      (data: any) => (
                        <ListItem key={data.id}>
                          <ListItemText primary={data.question} />
                        </ListItem>
                      ),
                    )}
                  </List>
                </Grid>
              )}*/}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default OnlineDetails;
