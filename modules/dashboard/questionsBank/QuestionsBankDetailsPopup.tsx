import {useIntl} from 'react-intl';
import {useFetchExamQuestionsBank} from '../../../services/instituteManagement/hooks';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IconFAQ from '../../../@softbd/icons/IconFAQ';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {Grid} from '@mui/material';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import React from 'react';
import {QuestionType} from './QuestionBanksEnums';

interface IProps {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
}

const QuestionsBankDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: IProps) => {
  const {messages} = useIntl();

  const {data: itemData, isLoading} = useFetchExamQuestionsBank(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconFAQ />
            <IntlMessages id='question-bank.label' />
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
                  label={messages['subject.label']}
                  value={itemData?.exam_subject_title}
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
                  value={itemData?.question_type}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
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

          {QuestionType.MCQ == itemData?.question_type && (
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
          {(QuestionType.MCQ == itemData.question_type ||
            QuestionType.YES_NO == itemData.question_type) && (
            <Grid item xs={6}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <DetailsInputView
                    label={messages['question.answer']}
                    value={itemData?.answer}
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

export default QuestionsBankDetailsPopup;
