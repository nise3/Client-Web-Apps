import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IconCourse from '../../../@softbd/icons/IconCourse';
import {useFetchCourse} from '../../../services/instituteManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const CourseDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchCourse(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconCourse />
            <IntlMessages id='course.label' />
          </>
        }
        maxWidth={'xl'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            {itemData && (
              <EditButton
                variant='contained'
                onClick={() => openEditModal(itemData.id)}
                isLoading={isLoading}
              />
            )}
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.title_en']}
              value={itemData?.title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['institute.label']}
              value={itemData?.institute_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.code']}
              value={itemData?.code}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.fee']}
              value={itemData?.course_fee}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.duration']}
              value={itemData?.duration}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.description']}
              value={itemData?.description}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.target_group']}
              value={itemData?.target_group}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.objectives']}
              value={itemData?.objectives}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.contents']}
              value={itemData?.contents}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.training_methodology']}
              value={itemData?.training_methodology}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.evaluation_system']}
              value={itemData?.evaluation_system}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.prerequisite']}
              value={itemData?.prerequisite}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.eligibility']}
              value={itemData?.eligibility}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['course.cover_image']}
              value={itemData?.cover_image}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomChipRowStatus
              label={messages['common.active_status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default CourseDetailsPopup;
