import {useIntl} from 'react-intl';
import {useFetchQuestionBank} from '../../../services/instituteManagement/hooks';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IconProgramme from '../../../@softbd/icons/IconProgramme';
import React from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {Grid} from '@mui/material';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface IProps {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
}

const QuestionBankDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: IProps) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchQuestionBank(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        title={
          <>
            <IconProgramme />
            <IntlMessages id='common.question_bank' />
          </>
        }
        open={true}
        {...props}
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            {itemData && (
              <EditButton
                variant='contained'
                onClick={() => openEditModal(itemData?.id)}
                isLoading={isLoading}
              />
            )}
          </>
        }>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.question_id']}
              value={itemData?.question_id}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.question']}
              value={itemData?.question}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.subject_name']}
              value={itemData?.subject_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.topic_name']}
              value={itemData?.topic_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.difficulty']}
              value={itemData?.difficulty}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.marks']}
              value={itemData?.marks}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default QuestionBankDetailsPopup;
