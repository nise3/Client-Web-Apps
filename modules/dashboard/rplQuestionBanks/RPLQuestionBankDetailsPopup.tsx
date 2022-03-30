import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconFAQ from '../../../@softbd/icons/IconFAQ';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {AnswerType, OPTIONS, QuestionType} from './QuestionEnums';
import {LEVEL} from '../courses/CourseEnums';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {useFetchRPLQuestionBank} from '../../../services/CertificateAuthorityManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const RPLQuestionBankDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();

  const {data: itemData, isLoading} = useFetchRPLQuestionBank(itemId);

  const getQuestionTypeTitle = (typeID: any) => {
    switch (typeID) {
      case parseInt(QuestionType.MCQ):
        return messages['question.type.mcq'];
      case parseInt(QuestionType.YES_NO):
        return messages['question.type.y_n'];
    }
  };

  const getDifficultyLevelTitle = (typeID: any) => {
    switch (typeID) {
      case LEVEL.BEGINNER:
        return messages['level.easy'];
      case LEVEL.INTERMEDIATE:
        return messages['level.intermediate'];
      case LEVEL.EXPERT:
        return messages['level.hard'];
      default:
        return messages['level.easy'];
    }
  };

  const getAnswerTitleMCQ = (typeID: any) => {
    switch (typeID) {
      case OPTIONS.OPTION_1:
        return messages['option.option1'];
      case OPTIONS.OPTION_2:
        return messages['option.option2'];
      case OPTIONS.OPTION_3:
        return messages['option.option3'];
      case OPTIONS.OPTION_4:
        return messages['option.option4'];
      default:
        return messages['option.option1'];
    }
  };

  const getAnswerTitleYN = (typeID: any) => {
    switch (typeID) {
      case AnswerType.YES:
        return messages['answer.type.yes'];
      case AnswerType.NO:
        return messages['answer.type.no'];
      default:
        return messages['answer.type.yes'];
    }
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconFAQ />
            <IntlMessages id='question.label' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={false} />
            <EditButton
              variant={'contained'}
              onClick={() => openEditModal(itemData?.id)}
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['common.title']}
                  value={itemData?.title}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['common.title_en']}
                  value={itemData?.title_en}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['subject.label']}
                  value={itemData?.subject_title}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['question.difficulty_level']}
                  value={getDifficultyLevelTitle(itemData?.difficulty_level)}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['question.type']}
                  value={getQuestionTypeTitle(itemData?.type)}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          {itemData?.type == QuestionType.MCQ && (
            <>
              <Grid item xs={6}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <DetailsInputView
                      label={messages['option.option1']}
                      value={itemData?.option_1}
                      isLoading={isLoading}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <DetailsInputView
                      label={messages['option.option1_en']}
                      value={itemData?.option_1_en}
                      isLoading={isLoading}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <DetailsInputView
                      label={messages['option.option2']}
                      value={itemData?.option_2}
                      isLoading={isLoading}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <DetailsInputView
                      label={messages['option.option2_en']}
                      value={itemData?.option_2_en}
                      isLoading={isLoading}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <DetailsInputView
                      label={messages['option.option3']}
                      value={itemData?.option_3}
                      isLoading={isLoading}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <DetailsInputView
                      label={messages['option.option3_en']}
                      value={itemData?.option_3_en}
                      isLoading={isLoading}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <DetailsInputView
                      label={messages['option.option4']}
                      value={itemData?.option_4}
                      isLoading={isLoading}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <DetailsInputView
                      label={messages['option.option4_en']}
                      value={itemData?.option_4_en}
                      isLoading={isLoading}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}

          {itemData?.type == QuestionType?.MCQ ? (
            <Grid item xs={6}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <DetailsInputView
                    label={messages['question.answer']}
                    value={getAnswerTitleMCQ(itemData?.answer)}
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={6}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <DetailsInputView
                    label={messages['question.answer']}
                    value={getAnswerTitleYN(itemData?.answer)}
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default RPLQuestionBankDetailsPopup;
