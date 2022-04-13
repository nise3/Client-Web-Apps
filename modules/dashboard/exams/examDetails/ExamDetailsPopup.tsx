import CustomDetailsViewMuiModal from '../../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../../@crema/utility/Utils';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../../@softbd/elements/button/EditButton/EditButton';
import {Grid} from '@mui/material';
import DetailsInputView from '../../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import React from 'react';
import {useIntl} from 'react-intl';
import IconExam from '../../../../@softbd/icons/IconExam';
import {ExamTypes} from '../ExamEnums';
import OnlineDetails from './OnlineDetails';
import OfflineDetails from './OfflineDetails';

interface ExamDetailsPopupProps {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
}

const ExamDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: ExamDetailsPopupProps) => {
  const {messages} = useIntl();

  const isLoading = false;
  const itemData = {
    id: 1,
    type: '2',
    subject_title: 'subject 1',
    title: 'Title',
    title_en: 'Title en',
    course_title: 'course',
    training_center_title: 'Training center',
    batch_title: 'Batch',
    exam_date: '2020-05-10',
    duration: '60',
    exam_type: '3',
    question_type: '1',
    number_of_questions: '20',
    total_marks: '100',
    question_selection_type: '1',
    individual_marks: '10',
    questions: [
      {
        id: 1,
        question: 'This is question 1?',
      },
      {
        id: 2,
        question: 'This is question 2?',
      },
      {
        id: 3,
        question: 'This is question 3?',
      },
      {
        id: 4,
        question: 'This is question 4?',
      },
    ],
    venue: 'SoftBD',
    question_sets: [
      {
        id: '1',
        title: 'Question Set 1',
        title_en: 'Question Set en 1',
      },
      {
        id: '2',
        title: 'Question Set 2',
        title_en: 'Question Set en 2',
      },
    ],
    offline_question_sets: [
      {
        id: '1',
        title: 'Question Set 1',
        title_en: 'Question Set en 1',
        questions: [
          {
            id: 1,
            question: 'This is question 1?',
          },
          {
            id: 2,
            question: 'This is question 2?',
          },
          {
            id: 3,
            question: 'This is question 3?',
          },
          {
            id: 4,
            question: 'This is question 4?',
          },
        ],
      },
      {
        id: '2',
        title: 'Question Set 2',
        title_en: 'Question Set en 2',
        questions: [
          {
            id: 1,
            question: 'This is question 1?',
          },
          {
            id: 2,
            question: 'This is question 2?',
          },
          {
            id: 3,
            question: 'This is question 3?',
          },
          {
            id: 4,
            question: 'This is question 4?',
          },
        ],
      },
    ],
  };

  const examType = (type: any) => {
    switch (type) {
      case ExamTypes.ONLINE:
        return messages['common.online'];
      case ExamTypes.OFFLINE:
        return messages['common.offline'];
      case ExamTypes.MIXED:
        return messages['album_type.mixed'];
    }
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconExam />
            <IntlMessages id='exam.label' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              variant={'contained'}
              onClick={() => openEditModal(itemData.id)}
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.exam_type']}
              value={examType(itemData?.type)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['subject.label']}
              value={itemData?.subject_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.title_en']}
              value={itemData?.title_en}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.courses']}
              value={itemData?.course_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['training_center.label']}
              value={itemData?.training_center_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['batches.label']}
              value={itemData?.batch_title}
              isLoading={isLoading}
            />
          </Grid>

          {itemData && itemData?.type == ExamTypes.ONLINE && (
            <OnlineDetails itemData={itemData} isLoading={isLoading} />
          )}

          {itemData && itemData?.type == ExamTypes.OFFLINE && (
            <OfflineDetails itemData={itemData} isLoading={isLoading} />
          )}

          {/*todo: ui is not good.should work on ui*/}
          {itemData && itemData?.type == ExamTypes.MIXED && (
            <>
              <Grid item xs={12}>
                <fieldset>
                  <legend style={{color: '#0a8fdc'}}>
                    {messages['common.online']}
                  </legend>
                  <Grid container spacing={3}>
                    <OnlineDetails itemData={itemData} isLoading={isLoading} />
                  </Grid>
                </fieldset>
              </Grid>

              <Grid item xs={12}>
                <fieldset>
                  <legend style={{color: '#0a8fdc'}}>
                    {messages['common.offline']}
                  </legend>
                  <Grid container spacing={3}>
                    <OfflineDetails itemData={itemData} isLoading={isLoading} />
                  </Grid>
                </fieldset>
              </Grid>
            </>
          )}
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default ExamDetailsPopup;
