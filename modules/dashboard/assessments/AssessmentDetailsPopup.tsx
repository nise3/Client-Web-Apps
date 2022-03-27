import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetchAssessment} from '../../../services/CertificateAuthorityManagement/hooks';
import IconCourse from '../../../@softbd/icons/IconCourse';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const AssessmentDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchAssessment(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconCourse />
            <IntlMessages id='assessment.label' />
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
          <Grid item xs={12} md={12}>
            <Grid container spacing={5}>
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
                  label={messages['occupations.label']}
                  value={itemData?.rpl_occupation_title}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['rpl_level.name']}
                  value={itemData?.rpl_level_title}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['rpl_level.passing_score']}
                  value={itemData?.passing_score}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.assessment_fee']}
                  value={itemData?.assessment_fee}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default AssessmentDetailsPopup;
